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
import Router from 'next/router';
import { useToast } from '@chakra-ui/react';
import { erroCustomizableToast } from 'helpers/Toast/Messages/Customizable';
import { errorDefaultToast } from 'helpers/Toast/Messages/Default';

const createEmployee = async (data: Inputs) => {
  const { data: response } = await http.post('/auth/login', data);
  return response;
};

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showLoginRegister, setShowLoginRegister] = React.useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();

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
        toast({
          status: 'error',
          description: 'Credencias inválidas, por favor tente novamente.',
          title: 'Um erro aconteceu',
          ...erroCustomizableToast,
        });
      } else {
        toast({ status: 'error', ...errorDefaultToast });
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
    </Styled.LoginBg>
  );
}

export default Login;
