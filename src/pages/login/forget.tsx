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
import { useToast } from '@chakra-ui/react';
import { errorDefaultToast } from 'helpers/Toast/Messages/Default';

type Inputs = {
  email: string;
};

const forgotPassword = async (data: Inputs) => {
  const { data: response } = await http.post('/auth/forgot-password', data);
  return response;
};

function Forget() {
  const queryClient = useQueryClient();
  const [checkEmail, setCheckEmail] = React.useState(true);
  const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
  const toast = useToast();

  const { mutate, isLoading } = useMutation(forgotPassword, {
    onSuccess: (data) => {
      setOpenSuccessDialog(!openSuccessDialog);
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
              <form onSubmit={handleSubmit(onSubmit)}>
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
