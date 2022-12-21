import React from 'react';
import * as Styled from '../../styles/Login/login';
import BarberLogo from '../../assets/barber-logo.png';
import Image from 'next/image';
import LoginButton from '../../components/Form/LoginButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Input,
  Label,
  ErrorMessage,
  InputIcon,
} from '../../styles/Login/login';
import { FaExclamationTriangle, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import LoginHeader from '../../components/LoginHeader';
import { useQueryClient, useMutation } from 'react-query';
import { http } from '../../../api/http';
import ToastAlertError from '../../components/Alerts/ToastAlertError';
import Router from 'next/router';

const createEmployee = async (data: Inputs) => {
  const { data: response } = await http.post('/auth/login', data);
  return response;
};

type Inputs = {
  email: string;
  password: string;
};

interface ToastProps {
  visible: boolean;
  title?: string;
  message?: string;
  status: 'success' | 'info' | 'warning' | 'error' | 'loading' | undefined;
}

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showLoginRegister, setShowLoginRegister] = React.useState(false);
  const queryClient = useQueryClient();
  const [toast, setToast] = React.useState<ToastProps>({
    visible: false,
    status: 'error',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, isLoading } = useMutation(createEmployee, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      Router.push('/profile');
    },
    onError: (err: any) => {
      if (err.response.status === 400) {
        setToast({
          visible: true,
          title: 'Um erro aconteceu',
          message: 'Credencias inválidas, por favor tente novamente.',
          status: 'error',
        });
      } else {
        setToast({
          visible: true,
          title: 'Um erro aconteceu',
          status: 'error',
          message:
            'Um erro aconteceu, tente novamente ou entre em contato com nossa equipe de suporte',
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const user = {
      ...data,
    };
    mutate(user);
  };

  return (
    <Styled.LoginBg>
      <LoginHeader register={true} />
      <Styled.LoginGeneralContainerAlignCenter>
        <Styled.LoginGeneralContainer>
          <Image src={BarberLogo} alt="Barber logo" />
          <Styled.LoginGeneralForm>
            {!showLoginRegister && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Label>
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
                </Label>

                <Label>
                  Senha
                  <InputIcon>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { required: true })}
                    />
                    <FaEye onClick={() => setShowPassword(!showPassword)} />
                  </InputIcon>
                  {errors.password && (
                    <ErrorMessage>
                      <FaExclamationTriangle />
                      This field is required
                    </ErrorMessage>
                  )}
                </Label>
                <LoginButton loading={isLoading} text="Entrar" type="submit" />
              </form>
            )}
          </Styled.LoginGeneralForm>
          <Styled.LinkToOtherRoutesLoginFlex>
            <Link href="login/register">Criar cadastro</Link>
            <Link href="login/forget">Perdeu a senha?</Link>
          </Styled.LinkToOtherRoutesLoginFlex>
        </Styled.LoginGeneralContainer>
      </Styled.LoginGeneralContainerAlignCenter>
      {toast.visible && (
        <ToastAlertError
          toastStatus={toast.status}
          messageText={toast.message}
          messageTitle={toast.title}
        />
      )}
    </Styled.LoginBg>
  );
}

export default Login;
