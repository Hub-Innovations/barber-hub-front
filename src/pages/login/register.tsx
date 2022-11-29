import React from 'react';
import Image from 'next/image';
import BarberLogo from '../../assets/barber-logo.png';
// importando os estilos gerais do formulário de login
import * as StyledLogin from '../../styles/Login/login';
import { FaExclamationTriangle, FaEye } from 'react-icons/fa';
import LoginButton from '../../components/Form/LoginButton';
import {
  Input,
  Label,
  ErrorMessage,
  InputIcon,
} from '../../styles/Login/login';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

type Inputs = {
  barberName: string;
  barberCnpj: string;
  email: string;
  password: string;
  confirmPassword: string;
  userEmail: string;
  cpf: string;
};

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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

  return (
    <StyledLogin.LoginBg>
      <StyledLogin.LoginGeneralContainerAlignCenter>
        <StyledLogin.LoginGeneralContainer>
          <Image src={BarberLogo} alt="Barber logo" />
          <StyledLogin.LoginGeneralForm>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label>
                Nome da sua barbearia
                <Input
                  type="text"
                  {...register('barberName', { required: true })}
                />
                {errors.barberName && (
                  <ErrorMessage>
                    <FaExclamationTriangle />
                    This field is required
                  </ErrorMessage>
                )}
              </Label>
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
              <label id="CNPJ">
                CNPJ
                <InputMask
                  mask={'99.999.999/9999-99'}
                  alwaysShowMask={false}
                  type={'text'}
                  placeholder="00.000.000/0000-00"
                  {...register('barberCnpj', { required: true })}
                />
              </label>
              {errors.barberCnpj && (
                <ErrorMessage inputMask={true}>
                  <FaExclamationTriangle />
                  This field is required
                </ErrorMessage>
              )}
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
              <Label>
                Confirmar senha
                <InputIcon>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword', { required: true })}
                  />
                  <FaEye
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </InputIcon>
                {errors.confirmPassword && (
                  <ErrorMessage>
                    <FaExclamationTriangle />
                    This field is required
                  </ErrorMessage>
                )}
              </Label>
              <LoginButton loading={loading} text="Entrar" type="submit" />
            </form>
          </StyledLogin.LoginGeneralForm>
        </StyledLogin.LoginGeneralContainer>
      </StyledLogin.LoginGeneralContainerAlignCenter>
    </StyledLogin.LoginBg>
  );
}

export default Register;
