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
import InputMask from 'react-input-mask';
import LoginHeader from '../../components/LoginHeader';
import { useQueryClient, useMutation } from 'react-query';
import { http } from '../../../api/http';
import ToastALert from '../../components/Alerts/ToastAlert';
import Router from 'next/router';
import { regexpCleanCelPhoneNumber, regexpToEmail } from 'helpers/Form/regexp';

type Inputs = {
  name: string;
  documentNumber: string;
  email: string;
  password: string;
  confirmPassword?: string;
  cellphone?: string;
};

interface ToastProps {
  title?: string;
  message?: string;
  status: 'success' | 'info' | 'warning' | 'error' | 'loading' | undefined;
}

const createEmployee = async (data: Inputs) => {
  const { data: response } = await http.post('/auth/register', data);
  return response;
};

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [disabledConfirmPassword, setDisabledConfirmPassword] =
    React.useState(true);
  const [samePassword, setSamePassword] = React.useState(true);
  const [checkEmail, setCheckEmail] = React.useState(true);
  const queryClient = useQueryClient();
  const [toast, setToast] = React.useState<ToastProps>({
    status: 'error',
  });
  const [showToast, setShowToast] = React.useState(false);

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
    // quebrando o número numa array item[0] é o dd o item[1] é o número
    // em seguida limpando os caracteres especiais para mandar para o back
    let cellPhoneNumberSplit = data.cellphone?.split(' ');
    let phone = {};

    // verificando se não o typeScript fica reclamando
    //  montando o objeto phone (dd + numero)
    if (cellPhoneNumberSplit) {
      let areaCode = cellPhoneNumberSplit[0].replace(
        regexpCleanCelPhoneNumber,
        ''
      );

      let number = cellPhoneNumberSplit[1].replace(
        regexpCleanCelPhoneNumber,
        ''
      );

      phone = {
        areaCode,
        number,
      };
    }

    const user = {
      email: data.email,
      password: data.password,
      name: data.name,
      documentNumber: data.documentNumber,
      phone,
    };

    mutate(user);
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
    <StyledLogin.LoginBg>
      <LoginHeader register={false} />
      <StyledLogin.LoginGeneralContainerAlignCenter>
        <StyledLogin.LoginGeneralContainer>
          <Image src={BarberLogo} alt="Barber logo" />
          <StyledLogin.LoginGeneralForm>
            <form
              onSubmit={handleSubmit(onSubmit)}
              onClick={(e) => setShowToast(false)}
            >
              <Label>
                Nome
                <Input type="text" {...register('name', { required: true })} />
                {errors.name && (
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
              <label id="CPF">
                Cpf
                <InputMask
                  mask={'999.999.999-99'}
                  alwaysShowMask={false}
                  type={'text'}
                  placeholder="000.000.000-00"
                  {...register('documentNumber', { required: true })}
                />
              </label>
              {errors.documentNumber && (
                <ErrorMessage inputMask={true}>
                  <FaExclamationTriangle />
                  This field is required
                </ErrorMessage>
              )}
              <label id="CELLPHONE">
                Celular
                <Tooltip
                  label="Celular com dd"
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
                <InputMask
                  mask={'(99) 99999-9999'}
                  alwaysShowMask={false}
                  type={'tel'}
                  placeholder="(99) 99999-9999"
                  {...register('cellphone', { required: true })}
                />
              </label>
              {errors.cellphone && (
                <ErrorMessage inputMask={true}>
                  <FaExclamationTriangle color="#ffdd00" />
                  This field is required
                </ErrorMessage>
              )}
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
              <LoginButton loading={isLoading} text="Entrar" type="submit" />
            </form>
            <StyledLogin.HaveRegisterText>
              Já possui registo? <Link href="/login">entrar</Link>
            </StyledLogin.HaveRegisterText>
          </StyledLogin.LoginGeneralForm>
        </StyledLogin.LoginGeneralContainer>
      </StyledLogin.LoginGeneralContainerAlignCenter>
      {showToast && (
        <ToastALert
          toastStatus={toast.status}
          messageText={toast.message}
          messageTitle={toast.title}
        />
      )}
    </StyledLogin.LoginBg>
  );
}

export default Register;
