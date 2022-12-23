import { Stack } from '@chakra-ui/layout';
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { http } from '../../../../api/http';
import * as Styled from './style';
import { Label, Input } from './style';
import { useQueryClient, useMutation } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Spinner } from '@chakra-ui/react';
import ToastALert from 'components/Alerts/ToastAlert';
import { regexpToEmail } from 'helpers/Form/regexp';
import InputMask from 'react-input-mask';
import { onlyNumber } from 'helpers/Form/onlyNumber';

type Inputs = {
  cellphone: number;
  fixCellphone: number;
  email: string;
  address: string;
  addressNumber?: number | null;
  addressComplement: string;
  haveWhatsApp?: boolean;
  noNumber?: boolean;
  barberName: string;
};

const createEmployee = async (data: Inputs) => {
  const { data: response } = await http.post('/auth/login', data);
  return response;
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

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, isLoading } = useMutation(createEmployee, {
    onSuccess: (data) => {
      console.log('%c⧭', 'color: #917399', data);
      setShowToast(true);
      setToast({
        title: 'default',
        status: 'success',
        message: 'default',
      });
    },
    onError: (err: any) => {
      console.log('%c⧭', 'color: #0088cc', err);
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
    console.log('%c⧭', 'color: #d90000', data);
    if (!data.addressNumber) {
      data.addressNumber = null;
    }

    const user = {
      ...data,
    };
    mutate(user);
  };

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

  return (
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
              <Styled.CheckBox type="checkbox" {...register('haveWhatsApp')} />
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
        <Stack gap="20px">
          <Styled.SectionTitle>Informações de localização</Styled.SectionTitle>
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
                onClick={() => setDisableInputNumber(!disableInputNumber)}
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
  );
}

export default BarberRegisterContact;
