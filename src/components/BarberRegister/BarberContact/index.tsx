import { Grid, Stack } from '@chakra-ui/layout';
import React, { useReducer, useRef } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { cepAPi, http } from '../../../../api/http';
import * as Styled from './style';
import { Label, Input } from './style';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  CircularProgress,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { regexpCleanCelPhoneNumber, regexpToEmail } from 'helpers/Form/regexp';
import InputMask from 'react-input-mask';
import { onlyNumber } from 'helpers/Form/onlyNumber';
import { urlCep } from 'helpers/Form/helpCep/searchCepUrl';
import axios from 'axios';
import {
  BsArrowReturnRight,
  BsArrowRight,
  BsPencil,
  BsPenFill,
} from 'react-icons/bs';
import { AiOutlineCopy } from 'react-icons/ai';
import {
  BarberShopAlreadyExists,
  BarberShopUrlAlreadyExists,
} from 'helpers/ErrorMessages/errorMessages';
import { Input as ChckraInput } from '@chakra-ui/react';
import useMedia from 'hooks/useMedia';
import {
  errorDefaultToast,
  successDefaultToast,
} from 'helpers/Toast/Messages/Default';
import {
  erroCustomizableToast,
  successCustomizableToast,
} from 'helpers/Toast/Messages/Customizable';

type Inputs = {
  _id: string | null;
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

type BarberUrl = {
  newUrl: string;
};

const createBarber = async (data: any) => {
  const token = localStorage.getItem('token');

  const { data: response } = await http.post('/barbershop', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const editBarber = async (data: any) => {
  const token = localStorage.getItem('token');

  const { data: response } = await http.put('/barbershop', data, {
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

const editBarberUrl = async (data: any) => {
  const token = localStorage.getItem('token');

  const { data: response } = await http.patch('/barbershop/change-url', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

function BarberRegisterContact() {
  const queryClient = useQueryClient();
  const [checkEmail, setCheckEmail] = React.useState(true);
  const [disableInputNumber, setDisableInputNumber] = React.useState(false);
  const [foundCep, setFoundCep] = React.useState(true);
  const [writeCep, setWriteCep] = React.useState(false);
  const { data, status } = useQuery('barber', getBarberInfo);
  const [any, forceUpdate] = useReducer((num) => num + 1, 0);
  const [barberUrl, setBarberUrl] = React.useState('');
  const [barberHaveId, setBarberHaveId] = React.useState(null);
  const [isOpenEditUrlModal, setIsOpenEditUrlModal] = React.useState(false);
  const [currentBarberUrl, setCurrentBarberUrl] = React.useState('');
  const mobile = useMedia('(max-width: 769px)');
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const BarberUrl = useForm<BarberUrl>();

  const { mutate, isLoading } = useMutation(
    barberHaveId ? editBarber : createBarber,
    {
      onSuccess: (data) => {
        toast({ status: 'success', ...successDefaultToast });
      },
      onError: (err: any) => {
        if (err.response.data.message === BarberShopAlreadyExists) {
          toast({
            status: 'error',
            title: 'Email já registrado',
            description:
              'Este email já está em uso, por favor, registre outro email para a sua barbearia',
            ...erroCustomizableToast,
          });
        } else {
          // toast({ status: 'error', ...errorDefaultToast });
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('create');
      },
    }
  );

  const BarberEditUrlMutate = useMutation(editBarberUrl, {
    onSuccess: (data) => {
      toast({
        status: 'success',
        title: 'Url alterada com sucesso',
        description:
          'A nova url da sua barbearia foi alterada e salva com sucesso',
        ...successCustomizableToast,
      });
      setIsOpenEditUrlModal(false);
      setBarberUrl(data.barberUrl);
    },
    onError: (err: any) => {
      if (err.response.data.message === BarberShopUrlAlreadyExists) {
        toast({
          status: 'error',
          title: 'Url já cadastrada',
          description: 'Url já cadastrada',
          ...erroCustomizableToast,
        });
      } else {
        // toast({ status: 'error', ...errorDefaultToast });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  const onSubmitEditBarberUrl: SubmitHandler<BarberUrl> = (data) => {
    const baseUrl = 'barber-hub.com/barbearia';

    const newUrl = {
      newUrl: `${baseUrl}/${data.newUrl}`,
    };

    BarberEditUrlMutate.mutate(newUrl);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
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

    let user;

    // verificando se está editando ou criando

    if (barberHaveId) {
      user = {
        _id: barberHaveId,
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
    } else {
      user = {
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
    }

    mutate(user);
  };

  // get all que pega as informações de uma barbearia criada
  function barberInfo() {
    if (data._id) {
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
      setBarberHaveId(data._id);
      setCurrentBarberUrl(data.barberUrl);
      // tem que forçar uma atualização no dom para funcionar o mask dos inputs
      forceUpdate();
    }
  }

  // chamando a função para dar o get nas infos da babearia
  React.useEffect(() => {
    if (status === 'success') {
      barberInfo();
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
            // toast({ status: 'error', ...errorDefaultToast });
          });
      }
    }
  }

  function handleWriteCep() {
    setWriteCep(true);
    setFoundCep(false);
  }

  function openEditUrlModal() {
    setIsOpenEditUrlModal(true);
    BarberUrl.setValue('newUrl', getBarberName()[2]);
  }

  function copyToClipboard() {
    let copyText = document.querySelector("[data-copy='copyBarberLink']");

    if (copyText) {
      navigator.clipboard.writeText(copyText.innerHTML).then(() => {
        toast({
          status: 'success',
          title: 'Copiado com sucesso!',
          description: 'Link copiado com sucesso para o clip board',
          ...successCustomizableToast,
        });

        // importante setar o toast pra false
      });
    }
  }

  function getBarberName() {
    let barberName;
    // quando quebrar no split gera uma array

    if (data.ownerId) {
      const barberPart = barberUrl.split('/');
      barberName = barberPart;
    } else {
      barberName = '';
    }

    return barberName;
  }

  function handleDisabledInputNumber() {
    setDisableInputNumber(!disableInputNumber);
    setValue('addressNumber', null);
  }

  function handleCloseEditUrlModal() {
    setIsOpenEditUrlModal(false);
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
                {getBarberName()[2]} aqui está o link da sua barbearia!
              </Styled.SectionTitle>
              <p>Acesso o link para acessar a página da sua babearia.</p>
              <Styled.ShowBarberLinkFlex>
                <BsArrowReturnRight color="#ffdd00" size="24" />
                <a target="_blank" data-copy="copyBarberLink">
                  {barberUrl}
                </a>
                <Box ml="16px" mb="4px" cursor="pointer">
                  <BsPencil
                    size="20"
                    color="#181b23"
                    onClick={() => openEditUrlModal()}
                  />
                </Box>
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
          </form>
          {/* modal para editar a utl */}
          <Modal
            onClose={handleCloseEditUrlModal}
            isOpen={isOpenEditUrlModal}
            isCentered
            size={mobile ? 'xs' : 'lg'}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Grid placeItems="center" mt="24px" gap="12px">
                  <Styled.SectionTitle>Edite sua url</Styled.SectionTitle>
                  <Styled.ModaEditUrlSubTitle>
                    Insira a nova url, da sua barbearia no campo abaixo, caso
                    essa url esteja disponível ela será o seu novo domínio
                  </Styled.ModaEditUrlSubTitle>
                </Grid>
              </ModalHeader>
              <ModalCloseButton />
              <form onSubmit={BarberUrl.handleSubmit(onSubmitEditBarberUrl)}>
                <ModalBody>
                  <Grid
                    gridTemplateColumns="auto 1fr"
                    gap="8px"
                    alignItems="center"
                  >
                    <Text
                      fontSize="16px"
                      fontFamily="Roboto"
                      fontWeight="400"
                      color="#000000"
                    >
                      {`${getBarberName()[0]}/${getBarberName()[1]}`}/
                    </Text>
                    <ChckraInput
                      variant="flushed"
                      placeholder="entre com sua url"
                      color="#000000"
                      focusBorderColor="#ffdd00"
                      fontSize="16px"
                      fontFamily="Roboto"
                      fontWeight="400"
                      {...BarberUrl.register('newUrl', { required: true })}
                    />
                    {BarberUrl.formState.errors.newUrl && (
                      <Styled.ErrorMessage>
                        <FaExclamationTriangle color="#d00000" />
                        This field is required
                      </Styled.ErrorMessage>
                    )}
                  </Grid>
                </ModalBody>
                <Grid placeItems="center" pb="20px">
                  <Flex gap="20px">
                    <Styled.ModalEditUrlButton
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpenEditUrlModal(false);
                      }}
                    >
                      Cancelar
                    </Styled.ModalEditUrlButton>
                    <Styled.ModalEditUrlButton
                      disabled={BarberEditUrlMutate.isLoading}
                    >
                      {BarberEditUrlMutate.isLoading ? (
                        <Spinner color="#181b23" />
                      ) : (
                        'Alterar'
                      )}
                    </Styled.ModalEditUrlButton>
                  </Flex>
                </Grid>
              </form>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}

export default BarberRegisterContact;
