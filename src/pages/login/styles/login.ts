import styled, { keyframes } from 'styled-components';

export const LoginBg = styled.section`
  background-color: #181b23;
  width: 100%;
  height: 100vh;
`;

export const LoginGeneralContainerAlignCenter = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const LoginGeneralContainer = styled.div`
  background-color: #1f2029;
  padding: 32px;
  width: 464px;
  min-height: 464px;
  border-radius: 8px;

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
`;

export const Label = styled.label`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #ffffff;
  display: block;
  position: relative;

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

export const ErrorMessage = styled.p`
  color: #ffdd00;
  font-size: 14px;
  font-weight: 400;
  font-family: 'Roboto', 'sans-serif';
  margin-top: 12px;
  display: block;
  animation: ${AnimeErrorMessage} 0.4s;

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InputIcon = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 30%;
    cursor: pointer;
    color: #ffffff;
    right: 12px;
  }
`;
