import React from 'react';
import * as Styled from './styles/login';
import BarberLogo from '../../assets/barber-logo.png';
import Image from 'next/image';
import LoginButton from '../../components/Form/LoginButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputNormal from '../../components/Form/InputNormal';
import { Input, Label, ErrorMessage, InputIcon } from './styles/login';
import { FaExclamationTriangle, FaEye } from 'react-icons/fa';

type Inputs = {
  userEmail: string;
  userPassword: string;
};

function Login() {
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // lógica para fazer a requisição para o login vai ficar aqui dentro
    setLoading(true);
    setTimeout(() => {
      console.log('%c⧭', 'color: #00a3cc', data);
      setLoading(false);
    }, 3000);
  };

  // falta fazer a lógica para trocar esse componente para a criação /  perdeu senha
  return (
    <Styled.LoginBg>
      <Styled.LoginGeneralContainerAlignCenter>
        <Styled.LoginGeneralContainer>
          <Image src={BarberLogo} alt="Barber logo" />
          <Styled.LoginGeneralForm>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label>
                Email
                <Input
                  type="email"
                  {...register('userEmail', { required: true })}
                />
                {errors.userEmail && (
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
                    {...register('userPassword', { required: true })}
                  />
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                </InputIcon>
                {errors.userPassword && (
                  <ErrorMessage>
                    <FaExclamationTriangle />
                    This field is required
                  </ErrorMessage>
                )}
              </Label>
              <LoginButton loading={loading} text="Entrar" type="submit" />
            </form>
          </Styled.LoginGeneralForm>
        </Styled.LoginGeneralContainer>
      </Styled.LoginGeneralContainerAlignCenter>
    </Styled.LoginBg>
  );
}

export default Login;
