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
import ToastALert from '../../components/Alerts/ToastAlert';
import Router from 'next/router';
import ReCAPTCHA from 'react-google-recaptcha';

const createEmployee = async (data: Inputs) => {
  const { data: response } = await http.post('/auth/login', data);
  return response;
};

type Inputs = {
  email: string;
  password: string;
};

interface ToastProps {
  title?: string;
  message?: string;
  status: 'success' | 'info' | 'warning' | 'error' | 'loading' | undefined;
}

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showLoginRegister, setShowLoginRegister] = React.useState(false);
  const queryClient = useQueryClient();
  const [captchaCode, setCaptchaCode] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<ToastProps>({
    status: 'error',
  });
  const [showToast, setShowToast] = React.useState(false);
  const recaptchaRef = React.createRef<any>();
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
      setShowToast(false);
    },
    onError: (err: any) => {
      if (err.response.status === 400) {
        setShowToast(true);
        setToast({
          title: 'Um erro aconteceu',
          message: 'Credencias inválidas, por favor tente novamente.',
          status: 'error',
        });
      } else {
        setShowToast(true);
        setToast({
          title: 'default',
          status: 'error',
          message: 'default',
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
    if (!captchaCode) {
      setShowToast(true);
      setToast({
        title: 'Um erro aconteceu',
        message: 'Por favor, verifique o Captcha',
        status: 'error',
      });
    } else {
      mutate(user);
    }
  };

  const onReCAPTCHAChange = (captchaCode: any) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    setCaptchaCode(captchaCode);
  };

  function checkUserTokenIsValid() {
    let token = localStorage.getItem('token');

    if (token) {
      Router.push('/profile');
    }
  }

  React.useEffect(() => {
    checkUserTokenIsValid();
  }, []);

  return (
    <Styled.LoginBg>
      <LoginHeader register={true} />
      <Styled.LoginGeneralContainerAlignCenter>
        <Styled.LoginGeneralContainer>
          <Image src={BarberLogo} alt='Barber logo' />
          <Styled.LoginGeneralForm>
            {!showLoginRegister && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) => setShowToast(false)}
              >
                <Label>
                  Email
                  <Input
                    type='email'
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
                <Styled.RecaptchaContainer>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size='normal'
                    sitekey={
                      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                        ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                        : ''
                    }
                    onChange={onReCAPTCHAChange}
                  />
                </Styled.RecaptchaContainer>
                <Styled.SubmitButtonContainer>
                  <LoginButton
                    loading={isLoading}
                    text='Entrar'
                    type='submit'
                    disabled={!captchaCode}
                  />
                </Styled.SubmitButtonContainer>
              </form>
            )}
          </Styled.LoginGeneralForm>

          <Styled.LinkToOtherRoutesLoginFlex>
            <Link href='login/register'>Criar cadastro</Link>
            <Link href='login/forget'>Perdeu a senha?</Link>
          </Styled.LinkToOtherRoutesLoginFlex>
        </Styled.LoginGeneralContainer>
      </Styled.LoginGeneralContainerAlignCenter>
      {showToast && (
        <ToastALert
          toastStatus={toast.status}
          messageText={toast.message}
          messageTitle={toast.title}
        />
      )}
    </Styled.LoginBg>
  );
}

export default Login;
