import React from 'react';
import * as StyledLogin from '../../styles/Login/login';
import LoginHeader from '../../components/LoginHeader';
import Image from 'next/image';
import BarberLogo from '../../assets/barber-logo.png';
import {
  Input,
  Label,
  ErrorMessage,
  InputIcon,
} from '../../styles/Login/login';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useQueryClient, useMutation } from 'react-query';
import { http } from '../../../api/http';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoginButton from '../../components/Form/LoginButton';
import SuccessModal from '../../components/Modals/SuccessModal';
import ToastALert from '../../components/Alerts/ToastAlert';

type Inputs = {
  email: string;
};

interface ToastProps {
  title?: string;
  message?: string;
  status: 'success' | 'info' | 'warning' | 'error' | 'loading' | undefined;
}

const createEmployee = async (data: Inputs) => {
  const { data: response } = await http.post('/auth/forget-password', data);
  return response;
};

function Forget() {
  const queryClient = useQueryClient();
  const [checkEmail, setCheckEmail] = React.useState(true);
  const [toast, setToast] = React.useState<ToastProps>({
    status: 'error',
  });
  const [openSuccessDialog, setOpenDialog] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const { mutate, isLoading } = useMutation(createEmployee, {
    onSuccess: (data) => {
      console.log('%c⧭', 'color: #ff0000', data);
      setOpenDialog(true);
      setShowToast(false);
    },
    onError: (err: any) => {
      setShowToast(true);
      setToast({
        title: 'default',
        message: 'default',
        status: 'error',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const user = {
      email: data.email,
    };
    mutate(user);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  function handleCheckEmail(e: any) {
    let regexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
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

  function handleActiveButton() {}

  return (
    <>
      <StyledLogin.LoginBg>
        <LoginHeader register={false} />
        <StyledLogin.LoginGeneralContainerAlignCenter>
          <StyledLogin.LoginGeneralContainer small={true}>
            <Image src={BarberLogo} alt="Barber logo" />
            <StyledLogin.LoginGeneralForm>
              <form
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) => setShowToast(false)}
              >
                <Label
                  onBlur={(e) => handleCheckEmail(e)}
                  onChange={handleChangeCheckEmail}
                >
                  Email
                  <Input
                    type="email"
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <ErrorMessage>
                      <FaExclamationTriangle />
                      This field is required
                    </ErrorMessage>
                  )}
                  {!checkEmail && (
                    <ErrorMessage>
                      <FaExclamationTriangle />
                      Este formato de email não é válido
                    </ErrorMessage>
                  )}
                </Label>
                <LoginButton loading={isLoading} text="Enviar" type="submit" />
              </form>
            </StyledLogin.LoginGeneralForm>
          </StyledLogin.LoginGeneralContainer>
        </StyledLogin.LoginGeneralContainerAlignCenter>
      </StyledLogin.LoginBg>
      {showToast && (
        <ToastALert
          toastStatus={toast.status}
          messageText={toast.message}
          messageTitle={toast.title}
        />
      )}
      <SuccessModal
        open={openSuccessDialog}
        modalTitle="E-mail enviado com sucesso"
        modalMensagem="Enviaremos para o seu e-mail um link, para você redefinir a sua senha, por favor cheque a sua caixa de mensagens do e-mail"
        showButtonClose={true}
        showActionButton={false}
        actionButtonMethod={handleActiveButton}
      />
    </>
  );
}

export default Forget;
