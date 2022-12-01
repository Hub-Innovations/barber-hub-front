import styled, { keyframes } from 'styled-components';

export const LoginBg = styled.section`
  background-color: #181b23;
  width: 100%;
  height: 100vh;
`;

export const AnimeLogin = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-30px,0,0);
  }
  to {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`;

export const LoginGeneralContainerAlignCenter = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #181b23;

  /* tem que usar min height para ele poder 100% da tela e completar o background de cima que pega 100vh se não fica a parte não visível da tela em branco */
  min-height: 100%;
  padding-bottom: 20px;
  padding-top: 20px;
`;

export const LoginGeneralContainer = styled.div`
  background-color: #1f2029;
  padding: 32px;
  width: 464px;
  min-height: 464px;
  border-radius: 8px;
  animation: ${AnimeLogin} 1s forwards;

  @media (max-width: 600px) {
    width: 320px;
    min-height: 400px;
    padding: 20px;
  }

  @media (max-width: 320px) {
    width: 260px;
  }

  img {
    margin: 0 auto;
  }
`;

export const LoginGeneralForm = styled.div`
  margin-top: 48px;

  Button {
    margin-top: 48px;
  }

  form {
    label + label {
      margin-top: 32px;

      @media (max-width: 600px) {
        margin-top: 24px;
      }
    }
  }

  // falando diretamente com o input que tem o mask, para ter controle sobre os estilos do componente
  input[name='barberCnpj'] {
    background: #181b23;
    border: 1px solid #ffdd00;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Poppins', 'sans-serif';
    font-weight: 400;
    color: #ffffff;
    width: 100%;
    height: 44px;
    display: block;
    padding: 8px;
    margin-top: 8px;

    @media (max-width: 600px) {
      margin-top: 24px;
      height: 40px;
      font-size: 12px;
    }
  }

  label[id='CNPJ'] {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #ffffff;
    display: block;
    position: relative;

    @media (max-width: 600px) {
      font-size: 16px;
    }
  }
`;

export const Input = styled.input`
  background: #181b23;
  border: 1px solid #ffdd00;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Poppins', 'sans-serif';
  font-weight: 400;
  color: #ffffff;
  width: 100%;
  height: 44px;
  display: block;
  padding: 8px;

  :disabled {
    opacity: 0.1;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    height: 40px;
    font-size: 12px;
  }
`;

export const Label = styled.label`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #ffffff;
  display: block;
  position: relative;

  @media (max-width: 600px) {
    font-size: 16px;
  }

  // estilos para qualquer tooltip que ficar de acordo com o bale
  button[id='buttonTooltip'] {
    margin-top: 0px;
    background-color: transparent;
    padding: 2px 4px;
  }

  input {
    margin-top: 8px;
  }
`;

export const AnimeErrorMessage = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-30px,0,0);
  }
  to {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`;

interface ErroMessageProps {
  inputMask?: boolean;
}

export const ErrorMessage = styled.p`
  color: #ffdd00;
  font-size: 14px;
  font-weight: 400;
  font-family: 'Roboto', 'sans-serif';
  margin-top: 12px;
  display: block;
  animation: ${AnimeErrorMessage} 0.4s;
  margin-bottom: ${(p: ErroMessageProps) => (p.inputMask ? '24px' : '0')};

  display: flex;
  align-items: center;
  gap: 8px;
`;

interface InputIcon {
  disabled?: boolean;
}

export const InputIcon = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 30%;
    cursor: pointer;
    color: ${(p: InputIcon) => (p.disabled ? '#cccccc' : '#ffffff')};
    right: 12px;
  }
`;

export const LinkToOtherRoutesLoginFlex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 24px;

  a {
    font-family: 'Poppins', 'sans-serif';
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    color: #ffdd00;
    letter-spacing: 0.015rem;
    max-width: inherit;
    position: relative;
    padding-bottom: 2px;
    transition: 0.2s;
    text-decoration: 2px underline #ffdd00;
    cursor: pointer;
  }
`;

export const HaveRegisterText = styled.p`
  font-size: 14px;
  color: #ffffff;
  font-weight: 400;
  font-family: 'Poppins', 'sans-serif';
  text-align: center;
  margin-top: 40px;

  a {
    color: #ffdd00;
    text-decoration: underline;
  }
`;
