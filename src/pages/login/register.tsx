import React from 'react';
import Image from 'next/image';
import BarberLogo from '../../assets/barber-logo.png';
// importando os estilos gerais do formulário de login
import * as StyledLogin from '../../styles/Login/login';
import { FaExclamationTriangle, FaEye } from 'react-icons/fa';
import LoginButton from '../../components/Form/LoginButton';
import {
  Tooltip,
  Button,
  useToast,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
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
import Router from 'next/router';
import {
  regexpCleanCelPhoneNumber,
  regexpRemoveAllNoIsNumber,
  regexpToEmail,
} from 'helpers/Form/regexp';
import { errorDefaultToast } from 'helpers/Toast/Messages/Default';
import {
  CheckBox,
  CheckBoxFlex,
} from 'components/StyledComponents/Form/AdminInputs';
import { SectionTitle } from 'components/BarberRegister/style';
import useMedia from 'hooks/useMedia';
import { ScrollModalTerms } from 'styles/Login/ModalTerms';

type Inputs = {
  name: string;
  documentNumber: string;
  email: string;
  password: string;
  confirmPassword?: string;
  cellphone?: string;
};

const createUser = async (data: Inputs) => {
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
  const toast = useToast();
  const [showModalTerm, setShowModalTerm] = React.useState(false);
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const mobile = useMedia('(max-width: 769px)');
  const [agreeTermsErrorMessage, setAgreeTermsErrorMessage] =
    React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      Router.push('/profile');
    },
    onError: (err: any) => {
      toast({ status: 'error', ...errorDefaultToast });
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
      documentNumber: data.documentNumber.replace(
        regexpRemoveAllNoIsNumber,
        ''
      ),
      phone,
    };

    if (agreeTerms) {
      mutate(user);
    } else {
      setAgreeTermsErrorMessage(true);
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

  function handleCheckTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setShowModalTerm(true);
  }

  function handleAgreeTerms() {
    setAgreeTerms(!agreeTerms);
    setShowModalTerm(false);
  }

  // effect para que sempre que o cara concordar com os termos garantir de não mostrar a mensagem de erro
  React.useEffect(() => {
    if (agreeTerms) {
      setAgreeTermsErrorMessage(false);
    }
  }, [agreeTerms]);

  return (
    <StyledLogin.LoginBg>
      <LoginHeader register={false} />
      <StyledLogin.LoginGeneralContainerAlignCenter>
        <StyledLogin.LoginGeneralContainer>
          <Image src={BarberLogo} alt="Barber logo" />
          <StyledLogin.LoginGeneralForm>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label>
                Nome
                <Input
                  data-test="cadastro:nome"
                  type="text"
                  {...register('name', { required: true })}
                />
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
                  data-test="cadastro:email"
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
                  data-test="cadastro:cpf"
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
                  data-test="cadastro:cel"
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
                    data-test="cadastro:password"
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
                    data-test="cadastro:passwordConfirm"
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
              <Flex alignItems="center" gap="8px" mt="20px">
                <CheckBox
                  data-test="cadastro:termosDeUso"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    e.preventDefault();
                    handleCheckTerm(e);
                  }}
                />
                <Text color="#ffffff">termos de uso</Text>
                {/* modal dos termos */}
                <Modal
                  size={mobile ? 'xs' : '3xl'}
                  isOpen={showModalTerm}
                  onClose={() => setShowModalTerm(false)}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      <SectionTitle>Termos de uso</SectionTitle>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <ScrollModalTerms data-test="cadastro:termosDeUsoConteudo">
                        <Text
                          fontFamily="Roboto, sans-serif"
                          fontSize="16px"
                          color="#000000"
                          lineHeight="1.4"
                        >
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quo asperiores tenetur accusamus a odio minus!
                          Consectetur assumenda incidunt, hic nostrum facere vel
                          repellendus rem quidem. Cumque, nemo. Dolorem, dolorum
                          quos? Dolores inventore sapiente, tempore, enim rerum
                          atque vel corrupti recusandae nam provident ad
                          asperiores delectus? Ea et non porro? Explicabo
                          numquam repudiandae accusamus dignissimos dolores
                          porro atque cumque odio quisquam? Omnis quisquam
                          laboriosam rem expedita iste nemo, praesentium
                          obcaecati fugiat sed sint soluta! Quidem consectetur
                          cum amet tempora asperiores, atque minus quaerat
                          veniam porro corrupti commodi? Amet culpa ut impedit.
                          Explicabo nemo aliquid eligendi eveniet voluptatum
                          error, doloremque placeat omnis magnam? Mollitia
                          architecto nihil fuga ipsam facere illum harum, sequi
                          dicta amet iste voluptas? Velit rem optio ad
                          laboriosam magnam. Temporibus inventore illum voluptas
                          culpa quo dicta unde quam voluptate, itaque numquam
                          molestiae necessitatibus ad assumenda sit quae quod
                          ipsa reiciendis laborum? Atque excepturi asperiores
                          quas! Dolorum similique dignissimos cumque. Earum
                          perferendis vel blanditiis, fugit labore quaerat atque
                          cumque molestias ducimus vero porro iusto voluptas
                          velit cupiditate! At est, aliquid doloribus cum
                          repellendus, saepe voluptatem maiores nihil eveniet
                          quos nemo. Veniam nulla repudiandae saepe et mollitia,
                          quo quos? Ducimus dolorem molestias, itaque corporis
                          officiis dolor hic placeat deleniti earum nihil porro
                          cupiditate temporibus natus exercitationem nostrum
                          vitae ipsum quam deserunt. Consequatur, odit vel quia
                          cum ducimus voluptates quidem, aut quisquam fugit
                          nulla qui beatae eos officia facilis reprehenderit
                          error sit nihil aspernatur incidunt? Quisquam nostrum
                          nihil delectus perspiciatis, nesciunt consequuntur!
                          Quo beatae enim quisquam totam voluptates alias nam.
                          Incidunt quos asperiores, error ut illum id voluptate?
                          Autem esse earum aspernatur reiciendis at, accusantium
                          repudiandae eius, odit qui, asperiores pariatur
                          veniam. Maxime velit tenetur exercitationem veniam
                          quasi perferendis molestias, mollitia, voluptate quo
                          eius aliquam omnis quas harum adipisci culpa?
                          Necessitatibus, nobis ducimus? Dolor vitae voluptas
                          numquam voluptatum voluptates vel natus quisquam!
                          Quisquam, libero. Facere quasi nobis tempora, cum
                          fugiat reprehenderit accusamus nulla porro harum saepe
                          dolor voluptatem rem animi in est tenetur atque
                          similique ut modi perferendis laborum dolores eaque
                          quisquam. Perspiciatis perferendis ipsam corporis modi
                          doloribus ratione sed, exercitationem voluptates, quia
                          necessitatibus totam aut illum. Maiores voluptatum
                          blanditiis facere molestias, soluta eligendi nam
                          doloremque, similique debitis dignissimos dolorum
                          reprehenderit tempore. Beatae quia cum quo,
                          necessitatibus laudantium est harum velit expedita
                          inventore obcaecati unde maxime dolorem enim vero
                          libero quisquam consequuntur. Aliquid in id, explicabo
                          quos saepe distinctio maxime blanditiis aperiam? Omnis
                          est fugiat sequi soluta ipsam eveniet, et fuga illum
                          iste quis at quia eligendi non ex? Nam ducimus
                          voluptatum asperiores rem, iusto doloremque temporibus
                          consequuntur, sapiente iure voluptates obcaecati?
                          Debitis earum odio officiis quaerat molestias modi
                          saepe voluptates libero numquam temporibus dolorum
                          dolor qui quos, ex, veniam excepturi? Sed illo debitis
                          vitae, tenetur ad magnam nostrum ducimus aut aliquam.
                          Rem perspiciatis delectus vel nemo unde quas incidunt
                          beatae neque doloremque iste deserunt soluta quod
                          suscipit natus nesciunt facere in, sunt libero vitae
                          dolorem optio recusandae aut laborum. Doloremque,
                          enim. Autem fugiat numquam iusto exercitationem
                          architecto? Ea id, et possimus maxime quasi
                          perspiciatis rem repellendus, sint eveniet ducimus
                          aperiam? Et, assumenda qui fuga odit impedit error?
                          Voluptatibus dolorem natus non! Illo voluptas optio
                          nobis et voluptatem. Quos incidunt, excepturi unde
                          mollitia culpa illum veniam laborum? At porro sunt
                          alias tempore voluptas, ea, dignissimos repellat amet
                          eum consectetur aliquid, deleniti accusamus?
                          Cupiditate animi eligendi laudantium sint ut? Vero ab
                          similique esse! Neque aspernatur ad accusantium
                          adipisci laudantium, assumenda nam cupiditate maiores
                          repellat tempore inventore officiis quos aliquid, sit
                          in facere ea. Dicta sed cumque nam, tempore excepturi
                          sit veniam necessitatibus provident animi earum ab
                          mollitia dignissimos! Non libero exercitationem,
                          voluptatem ratione ipsam accusamus hic a, quod maxime
                          consectetur dolore unde! Ipsum. Sapiente, repellat.
                          Repellat explicabo veritatis, delectus totam suscipit
                          nulla nisi ipsa. Totam quisquam delectus consequatur!
                          Totam possimus praesentium nam, aperiam esse nemo
                          ratione eum dolores! Beatae ad placeat soluta fugit.
                          Expedita iusto veniam autem cumque, molestiae quos
                          sint temporibus asperiores. Impedit totam facere nam
                          consequatur eaque ipsa autem, aspernatur rerum
                          voluptates provident illo natus fugiat quasi, corporis
                          aperiam quo ullam! Dicta, accusamus harum officiis
                          voluptatum, aliquid fuga vero aut, explicabo odit
                          vitae eaque quis reiciendis architecto? Corrupti
                          distinctio quas dolor explicabo atque soluta corporis
                          animi alias optio! Excepturi, officiis cupiditate.
                          Deserunt iure dolorum suscipit quam quidem mollitia
                          tenetur neque, obcaecati ratione a, veritatis atque
                          enim officia vero debitis similique soluta
                          perspiciatis illo itaque deleniti sed accusantium.
                          Veritatis quos unde maiores? Cum asperiores delectus
                          sapiente totam officia dolorum animi reprehenderit quo
                          dolor odio omnis pariatur optio ad fuga explicabo ex
                          iure, provident consequatur voluptatem distinctio
                          libero. Repellendus vero quis omnis blanditiis. Velit
                          ea explicabo officia, eligendi, dolor ipsam nulla
                          optio illum quaerat cupiditate omnis rerum ex eveniet
                          voluptas facilis a quam? Assumenda sapiente placeat
                          repellat et ducimus officia corrupti veniam
                          dignissimos. Totam autem eius asperiores molestiae
                          placeat animi ad odit, dolores vero aperiam ex
                          dolorum, rerum possimus nisi sunt similique at?
                          Quisquam dolorem error ipsam modi, commodi accusantium
                          quaerat voluptatum ab. Veniam, veritatis ad cupiditate
                          nam iste temporibus, autem accusantium id quibusdam
                          placeat possimus voluptas. Porro, quaerat ipsum optio
                          exercitationem animi adipisci soluta, deserunt, ad
                          consectetur atque placeat blanditiis aspernatur quod?
                          Quisquam aspernatur, officia sed ab aliquam ipsa
                          quibusdam esse, perspiciatis nesciunt, quasi culpa!
                          Odit doloribus quibusdam modi ipsam sunt
                          necessitatibus? Nisi neque quisquam aliquid nam aut
                          aliquam sapiente ut doloremque! Odit cupiditate eum
                          et! Nesciunt neque, vitae impedit ullam voluptatum
                          commodi aliquam ipsum optio odio! Ut placeat commodi
                          nobis quia sit. Earum laboriosam facilis repudiandae
                          sint quam magnam, beatae omnis.
                        </Text>
                      </ScrollModalTerms>
                    </ModalBody>
                    <Flex
                      alignItems="center"
                      gap="8px"
                      mt="20px"
                      ml="20px"
                      pb="20px"
                    >
                      <CheckBox
                        data-test="cadastro:termosDeUsoConteudoCheckBox"
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => {
                          e.preventDefault();
                          handleAgreeTerms();
                        }}
                      />
                      <Text color="#000000">Concordo com os termos de uso</Text>
                    </Flex>
                  </ModalContent>
                </Modal>
              </Flex>
              {agreeTermsErrorMessage && (
                <ErrorMessage>
                  <FaExclamationTriangle />É neccessário concordar com os
                  termos, para finzalizar seu cadastro.
                </ErrorMessage>
              )}
              <LoginButton
                data-test="cadastro:signUpButton"
                loading={isLoading}
                text="Cadastrar"
                type="submit"
              />
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
