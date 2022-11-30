import React from 'react';
import Image from 'next/image';
import BarberLogo from '../../assets/barber-logo.png';
// importando os estilos gerais do formulário de login
import * as StyledLogin from '../../styles/Login/login';
import { FaExclamationTriangle, FaEye } from 'react-icons/fa';
import LoginButton from '../../components/Form/LoginButton';
import { Tooltip, Button } from '@chakra-ui/react';
import {
  Input,
  Label,
  ErrorMessage,
  InputIcon,
} from '../../styles/Login/login';
import { FaInfoCircle } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
// import InputMask from 'react-input-mask';

type Inputs = {
  barberName: string;
  // barberCnpj: string;
  email: string;
  password: string;
  confirmPassword: string;
  userEmail: string;
};

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabledConfirmPassword, setDisabledConfirmPassword] =
    React.useState(true);
  const [samePassword, setSamePassword] = React.useState(true);
  const [checkEmail, setCheckEmail] = React.useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    // lógica para fazer a requisição para o login vai ficar aqui dentro

    // verificando se as senhas digitadas são iguais, se forem já faz a request, não precisou fazer a lógica nos changes dos campos de senha
    // pq a unica validação que tem é essa a outra do email vai ser feita ao change
    // verificando se o email é válido tbm
    if (data.password === data.confirmPassword && checkEmail) {
      setTimeout(() => {
        console.log('%c⧭', 'color: #00a3cc', data);
        setLoading(false);
      }, 3000);
    } else {
      setLoading(false);
      setSamePassword(false);

      // retirando a mensagem da tela após alguns segundos até melhoras essa lógica
      setTimeout(() => {
        setSamePassword(true);
      }, 2000);
    }
  };

  function handleCheckWritePassword(e: any) {
    // verificando se a senha é maior ou igual a 8
    // habilitando ou desabilitando o input de confirmar senha caso seja maior que 8 habilita menor que 8 desabilita
    if (e.target.value.length >= 8) {
      setDisabledConfirmPassword(false);
    } else {
      setDisabledConfirmPassword(true);
    }
  }

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
              {/* <label id="CNPJ">
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
              )} */}
              <Label onChange={(e) => handleCheckWritePassword(e)}>
                Senha
                <Tooltip
                  label="Mínimo caracteres 8"
                  placement="right-end"
                  bg="#495057"
                  color="#f1f1f1"
                  fontFamily="Poppins, sans-serif"
                  fontSize="14px"
                  fontWeight="600"
                  letterSpacing="0.015rem"
                  closeOnClick={false}
                >
                  <button type="button" id="buttonTooltip">
                    <FaInfoCircle color="#ffdd00" size="16" />
                  </button>
                </Tooltip>
                <InputIcon>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: true,
                      minLength: 8,
                    })}
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
                <Tooltip
                  closeOnClick={false}
                  label="Primeiro preencha o campo acima"
                  placement="left-end"
                  bg="#495057"
                  color="#f1f1f1"
                  fontFamily="Poppins, sans-serif"
                  fontSize="14px"
                  fontWeight="600"
                  letterSpacing="0.015rem"
                  wordBreak="break-word"
                  width="160px"
                >
                  <button type="button" id="buttonTooltip">
                    <FaInfoCircle color="#ffdd00" size="16" />
                  </button>
                </Tooltip>
                <InputIcon disabled={disabledConfirmPassword}>
                  <Input
                    disabled={disabledConfirmPassword}
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword', {
                      required: true,
                      minLength: 8,
                    })}
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
                {!samePassword && (
                  <ErrorMessage>
                    <FaExclamationTriangle />
                    As senhas não coincidem
                  </ErrorMessage>
                )}
              </Label>
              <LoginButton loading={loading} text="Entrar" type="submit" />
            </form>
            <StyledLogin.HaveRegisterText>
              Já possui registo? <Link href="/login">entrar</Link>
            </StyledLogin.HaveRegisterText>
          </StyledLogin.LoginGeneralForm>
        </StyledLogin.LoginGeneralContainer>
      </StyledLogin.LoginGeneralContainerAlignCenter>
    </StyledLogin.LoginBg>
  );
}

export default Register;
