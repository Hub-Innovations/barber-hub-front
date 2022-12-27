import { Grid, Stack } from '@chakra-ui/layout';
import React, { useReducer, useRef } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { cepAPi, http } from '../../../../api/http';
import * as Styled from './style';
import { Label, Input } from './style';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, CircularProgress, Spinner } from '@chakra-ui/react';
import ToastALert from 'components/Alerts/ToastAlert';
import { regexpCleanCelPhoneNumber, regexpToEmail } from 'helpers/Form/regexp';
import InputMask from 'react-input-mask';
import { onlyNumber } from 'helpers/Form/onlyNumber';
import { urlCep } from 'helpers/Form/helpCep/searchCepUrl';
import axios from 'axios';
import { BsArrowReturnRight, BsArrowRight } from 'react-icons/bs';
import { AiOutlineCopy } from 'react-icons/ai';

type Inputs = {
  cellphone: string;
  fixCellphone: string;
  email: string;
  address: string;
  addressNumber?: number | null;
  addressComplement: string;
  haveWhatsApp?: boolean;
  noNumber?: boolean;
  barberName: string;
  cep: string;
  neighborhood: string;
  city: string;
};

const createEmployee = async (data: any) => {
  const token = localStorage.getItem('token');

  const { data: response } = await http.post('/barbershop', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const getBarberInfo = async () => {
  const token = localStorage.getItem('token');

  const { data } = await http.get('/barbershop', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

interface ToastProps {
  title?: string;
  message?: string;
  status: 'success' | 'info' | 'warning' | 'error' | 'loading' | undefined;
}

function BarberRegisterContact() {
  const queryClient = useQueryClient();
  const [showToast, setShowToast] = React.useState(false);
  const [checkEmail, setCheckEmail] = React.useState(true);
  const [toast, setToast] = React.useState<ToastProps>({
    status: 'error',
  });
  const [disableInputNumber, setDisableInputNumber] = React.useState(false);
  const [foundCep, setFoundCep] = React.useState(true);
  const [writeCep, setWriteCep] = React.useState(false);
  const { data, status } = useQuery('barber', getBarberInfo);
  const [any, forceUpdate] = useReducer((num) => num + 1, 0);
  const [barberUrl, setBarberUrl] = React.useState('');

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, isLoading } = useMutation(createEmployee, {
    onSuccess: (data) => {
      setShowToast(true);
      setToast({
        title: 'default',
        status: 'success',
        message: 'default',
      });
    },
    onError: (err: any) => {
      setShowToast(true);
      setToast({
        title: 'default',
        status: 'error',
        message: 'default',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setShowToast(false);
    if (!data.addressNumber) {
      data.addressNumber = null;
    }

    // fazendo o format somente quando ocorrer a edição nos campos
    // para não formatar um valor que já vem limpo do back
    if (isNaN(Number(data.cellphone))) {
      data.cellphone = data.cellphone.replace(regexpCleanCelPhoneNumber, '');
    }

    if (isNaN(Number(data.fixCellphone))) {
      data.fixCellphone = data.fixCellphone.replace(
        regexpCleanCelPhoneNumber,
        ''
      );
    }

    if (isNaN(Number(data.cep))) {
      data.cep = data.cep.replace('-', '');
    }

    const user = {
      celPhone: data.cellphone,
      name: data.barberName,
      telPhone: data.fixCellphone,
      email: data.email,
      address: {
        address: data.address,
        number: data.addressNumber,
        complement: data.addressComplement,
        postalCode: data.cep,
        city: data.city,
        neighborhood: data.neighborhood,
      },
    };

    mutate(user);
  };

  // get all que pega as informações de uma barbearia criada
  function barberInfo() {
    if (data.ownerId) {
      //   setando os valores do form para edição
      setValue('barberName', data.name);
      setValue('cellphone', data.celPhone);
      setValue('fixCellphone', data.telPhone);
      setValue('email', data.email);
      setBarberUrl(data.barberUrl);
      setValue('cep', data.address.postalCode);
      setValue('address', data.address.address);
      setValue('neighborhood', data.address.neighborhood);
      setValue('addressComplement', data.address.complement);
      setValue('addressNumber', data.address.number);
      setValue('city', data.address.city);

      // tem que forçar uma atualização no dom para funcionar o mask dos inputs
      forceUpdate();
    }
  }

  // chamando a função para dar o get nas infos da babearia
  React.useEffect(() => {
    if (status === 'success') {
      barberInfo();
      setShowToast(false);
    }
  }, [data]);

  function handleCheckEmail(e: any) {
    let regexp = regexpToEmail;
    let emailIsValid = regexp.test(e.target.value);

    if (emailIsValid) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  }

  function handleChangeCheckEmail() {
    if (!checkEmail) {
      setCheckEmail(true);
    }
  }

  function handleSearchCep(e: any) {
    let value = getValues('cep');

    if (!writeCep) {
      setFoundCep(true);
      setShowToast(false);

      if (value.includes('-')) {
        value = value.replace('-', '');
      }

      if (value.length === 8) {
        axios
          .get(cepAPi(value))
          .then((result) => {
            setValue('city', result.data.localidade);
            setValue('neighborhood', result.data.bairro);
            setValue('address', result.data.logradouro);

            setFoundCep(true);

            // dessa form permite digitar o cep manualmente se não ele limpa o campo
            // quando não acha o cep
            if (!result.data.erro) {
              setValue('cep', result.data.cep);
            }

            if (result.data.erro) {
              setFoundCep(false);
            }
          })
          .catch((err) => {
            setFoundCep(false);
            setShowToast(true);
            setToast({
              title: 'Ocorreu um erro na busca do seu cep',
              status: 'error',
              message: 'Tente novamente ou entre em contato com o suporte',
            });
          });
      }
    }
  }

  function handleWriteCep() {
    setWriteCep(true);
    setFoundCep(false);
  }

  function copyToClipboard() {
    let copyText = document.querySelector("[data-copy='copyBarberLink']");

    if (copyText) {
      navigator.clipboard.writeText(copyText.innerHTML).then(() => {
        setShowToast(true);
        setToast({
          title: 'Copiado com sucesso!',
          status: 'success',
          message: 'Link copiado com sucesso para o clip board',
        });

        // importante setar o toast pra false
        setTimeout(() => {
          setShowToast(false);
        }, 500);
      });
    }
  }

  function getBarberName() {
    let barberName;

    if (data.ownerId) {
      const barberPart = barberUrl.split('/');
      barberName = barberPart[1];
    } else {
      barberName = '';
    }

    return barberName;
  }

  function handleDisabledInputNumber() {
    setDisableInputNumber(!disableInputNumber);
    setValue('addressNumber', null);
  }

  return (
    <>
      {status === 'loading' && (
        <Grid placeItems="center" mt="60px">
          <CircularProgress
            isIndeterminate
            color="#ffdd00"
            size="24"
            thickness="3px"
          />
        </Grid>
      )}
      {status !== 'loading' && (
        <>
          {barberUrl.length > 0 && (
            <Styled.ShowBarberLinkContainer>
              <Styled.SectionTitle>
                {getBarberName()} aqui está o link da sua barbearia!
              </Styled.SectionTitle>
              <p>Acesso o link para acessar a página da sua babearia.</p>
              <Styled.ShowBarberLinkFlex>
                <BsArrowReturnRight color="#ffdd00" size="24" />
                <a target="_blank" data-copy="copyBarberLink">
                  {barberUrl}
                </a>
                <Box ml="16px" mb="4px" cursor="pointer">
                  <AiOutlineCopy
                    size="20"
                    color="#181b23"
                    onClick={() => copyToClipboard()}
                  />
                </Box>
              </Styled.ShowBarberLinkFlex>
            </Styled.ShowBarberLinkContainer>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            onClick={(e) => setShowToast(false)}
          >
            <Styled.FormGrid>
              <Stack gap="20px">
                <Styled.SectionTitle>Dados para contato</Styled.SectionTitle>
                <Label>
                  Nome da barbearia:
                  <Input
                    type="text"
                    placeholder="Babearia dos sonhos"
                    {...register('barberName', { required: true })}
                  />
                  {errors.barberName && (
                    <Styled.ErrorMessage>
                      <FaExclamationTriangle color="#d00000" />
                      This field is required
                    </Styled.ErrorMessage>
                  )}
                </Label>
                <div>
                  <label id="CELLPHONE">
                    Celular
                    <InputMask
                      mask={'(99) 99999-9999'}
                      alwaysShowMask={false}
                      type={'tel'}
                      placeholder="(99) 99999-9999"
                      {...register('cellphone', { required: true })}
                    />
                  </label>
                  <Styled.checkBoxFlex>
                    <Styled.CheckBox
                      type="checkbox"
                      {...register('haveWhatsApp')}
                    />
                    <p>Esse número possui WhatsAap?</p>
                  </Styled.checkBoxFlex>
                  {errors.cellphone && (
                    <Styled.ErrorMessage inputMask={true}>
                      <FaExclamationTriangle color="#d00000" />
                      This field is required
                    </Styled.ErrorMessage>
                  )}
                </div>
                {/* fix-phone */}
                <label id="FIX-CELLPHONE">
                  Telefone
                  <InputMask
                    mask={'(99) 9999-9999'}
                    alwaysShowMask={false}
                    type={'tel'}
                    placeholder="(99) 9999-9999"
                    {...register('fixCellphone')}
                  />
                </label>
                <Label
                  onBlur={(e) => handleCheckEmail(e)}
                  onChange={handleChangeCheckEmail}
                >
                  Email:
                  <Input
                    type="email"
                    placeholder="exemplo@gmail.com"
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <Styled.ErrorMessage>
                      <FaExclamationTriangle color="#d00000" />
                      This field is required
                    </Styled.ErrorMessage>
                  )}
                  {!checkEmail && (
                    <Styled.ErrorMessage>
                      <FaExclamationTriangle color="#d00000" />
                      Este formato de email não é válido
                    </Styled.ErrorMessage>
                  )}
                </Label>
              </Stack>
              {/* informações de localização */}
              <Stack gap="20px">
                <Styled.SectionTitle>
                  Informações de localização
                </Styled.SectionTitle>
                <div id="CEP">
                  <Label onChange={(e) => handleSearchCep(e)}>
                    Cep:
                    <Input
                      type="text"
                      placeholder="00000-000"
                      {...register('cep', {
                        required: true,
                      })}
                      onKeyDown={(e) => onlyNumber(e)}
                    />
                    <Styled.helpLink href={urlCep} target="_blank">
                      Não sei meu cep?
                    </Styled.helpLink>
                    {!foundCep && !writeCep && (
                      <Styled.ErrorMessage>
                        <FaExclamationTriangle color="#d00000" />
                        Cep inválido ou não encontrado
                      </Styled.ErrorMessage>
                    )}
                    {errors.cep && (
                      <Styled.ErrorMessage>
                        <FaExclamationTriangle color="#d00000" />
                        This field is required
                      </Styled.ErrorMessage>
                    )}
                  </Label>
                  <div id="CITY">
                    <Label disabled={foundCep}>
                      Cidade:
                      <Input
                        type="text"
                        placeholder="Cidade exemplo"
                        {...register('city', { required: true })}
                        disabled={foundCep}
                      />
                      <Styled.helpLink onClick={() => handleWriteCep()}>
                        Digite manualmente
                      </Styled.helpLink>
                      {errors.city && (
                        <Styled.ErrorMessage>
                          <FaExclamationTriangle color="#d00000" />
                          This field is required
                        </Styled.ErrorMessage>
                      )}
                    </Label>
                  </div>
                </div>
                <Label>
                  Bairro:
                  <Input
                    type="text"
                    placeholder="Bairro exemplo"
                    {...register('neighborhood', { required: true })}
                  />
                  {errors.neighborhood && (
                    <Styled.ErrorMessage>
                      <FaExclamationTriangle color="#d00000" />
                      This field is required
                    </Styled.ErrorMessage>
                  )}
                </Label>
                <Label>
                  Endereço:
                  <Input
                    type="text"
                    placeholder="Rua logo ali perto"
                    {...register('address', { required: true })}
                  />
                  {errors.address && (
                    <Styled.ErrorMessage>
                      <FaExclamationTriangle color="#d00000" />
                      This field is required
                    </Styled.ErrorMessage>
                  )}
                </Label>
                <Label>
                  Complemento:
                  <Input
                    type="text"
                    placeholder="Depois daquela rua"
                    {...register('addressComplement', { required: true })}
                  />
                  {errors.addressComplement && (
                    <Styled.ErrorMessage>
                      <FaExclamationTriangle color="#d00000" />
                      This field is required
                    </Styled.ErrorMessage>
                  )}
                </Label>
                <Label disabled={disableInputNumber}>
                  Número:
                  <Input
                    placeholder="23"
                    type="text"
                    {...register('addressNumber')}
                    onKeyDown={(e) => onlyNumber(e)}
                    disabled={disableInputNumber}
                  />
                  <Styled.checkBoxFlex>
                    <Styled.CheckBox
                      type="checkbox"
                      {...register('noNumber')}
                      onClick={() => handleDisabledInputNumber()}
                    />
                    <p>Sem número</p>
                  </Styled.checkBoxFlex>
                </Label>
              </Stack>
              {/* dasabilitar botao no loadin */}
              <Styled.FormButton disabled={isLoading}>
                {isLoading ? <Spinner color="#181b23" /> : 'Salvar'}
              </Styled.FormButton>
            </Styled.FormGrid>
            {showToast && (
              <ToastALert
                toastStatus={toast.status}
                messageText={toast.message}
                messageTitle={toast.title}
              />
            )}
          </form>
        </>
      )}
    </>
  );
}

export default BarberRegisterContact;
