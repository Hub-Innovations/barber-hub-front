import Router, { useRouter } from 'next/router';
import React from 'react';
import * as StyledLogin from '../../styles/Login/login';
import { FaExclamationTriangle, FaEye } from 'react-icons/fa';
import LoginButton from '../../components/Form/LoginButton';
import {
  Input,
  Label,
  ErrorMessage,
  InputIcon,
} from '../../styles/Login/login';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoginHeader from '../../components/LoginHeader';
import { useQueryClient, useMutation } from 'react-query';
import { http } from '../../../api/http';
import { Tooltip, Button, Box, Text, useToast } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';
import { Alert, AlertIcon } from '@chakra-ui/react';
import SuccessModal from '../../components/Modals/SuccessModal';
import { errorDefaultToast } from 'helpers/Toast/Messages/Default';

type Inputs = {
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
};

const changePassword = async (data: Inputs) => {
  const token = localStorage.getItem('changePasswordToken');

  const { data: response } = await http.post(
    '/auth/forgot-password/check',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

function UpdatePassword() {
  const router = useRouter();
  const urlToken = router.query.token;
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [disabledConfirmPassword, setDisabledConfirmPassword] =
    React.useState(true);
  const [samePassword, setSamePassword] = React.useState(true);
  const queryClient = useQueryClient();
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, isLoading } = useMutation(changePassword, {
    onSuccess: (data) => {
      setOpenSuccessDialog(!openSuccessDialog);
      localStorage.removeItem('changePasswordToken');
    },
    onError: (err: any) => {
      toast({ status: 'error', ...errorDefaultToast });
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const user = {
      newPassword: data.password,
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

  function goToLogin() {
    Router.push('/login');
  }

  React.useEffect(() => {
    let stringToken = String(urlToken);

    localStorage.setItem('changePasswordToken', stringToken);
  }, [urlToken]);

  return (
    <>
      <StyledLogin.LoginBg>
        <StyledLogin.LoginGeneralContainerAlignCenter>
          <StyledLogin.LoginGeneralContainer small={true}>
            <StyledLogin.LoginGeneralForm>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                <Box mt="32px">
                  <Alert status="info">
                    <AlertIcon />
                    <Text
                      fontSize="12px"
                      fontFamily="Poppins"
                      fontWeight="400"
                      lineHeight="1.5"
                      color="#000000"
                    >
                      Preencha os campos acimas, com a sua nova senha, para
                      redefinir a sua senha e ser direcionado para a tela de
                      login.
                    </Text>
                  </Alert>
                </Box>
                <LoginButton
                  loading={isLoading}
                  text="Redefinir"
                  type="submit"
                />
              </form>
              <SuccessModal
                open={openSuccessDialog}
                modalTitle="Senha redefinida com sucesso"
                modalMensagem="Sua senha foi redefinida com sucesso, agora você já pode fazer o seu login, utilizando a nova senha. Por favor, clique no botão abaixo, para efetuar o seu login ou navegue até a página de login
                  "
                showButtonClose={true}
                showActionButton={true}
                actionButtonText="Login"
                actionButtonMethod={goToLogin}
              />
            </StyledLogin.LoginGeneralForm>
          </StyledLogin.LoginGeneralContainer>
        </StyledLogin.LoginGeneralContainerAlignCenter>
      </StyledLogin.LoginBg>
    </>
  );
}

export default UpdatePassword;
