import styled, { keyframes } from 'styled-components';

export const Input = styled.input`
  background: #ffffff;
  border: 2px solid #181b23;
  border-radius: 6px;
  font-size: 16px;
  font-family: 'Poppins', 'sans-serif';
  font-weight: 400;
  color: #000000;
  width: 100%;
  height: 44px;
  display: block;
  padding: 8px;

  :disabled {
    opacity: 0.2;
  }

  @media (max-width: 600px) {
    height: 40px;
  }
`;

interface LabelProps {
  disabled?: boolean;
}

export const Label = styled.label`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: ${(p: LabelProps) => (p.disabled ? '#cccccc' : '#000000')};
  display: block;

  @media (max-width: 600px) {
    font-size: 16px;
  }

  input {
    margin-top: 8px;
  }
`;

export const FormInputs = styled.div`
  div {
    input[class='mask'] {
      background: #ffffff;
      border: 2px solid #181b23;
      border-radius: 6px;
      font-size: 16px;
      font-family: 'Poppins', 'sans-serif';
      font-weight: 400;
      color: #000000;
      width: 100%;
      height: 44px;
      display: block;
      padding: 8px;

      @media (max-width: 600px) {
        height: 40px;
      }
    }
  }

  input[class='mask'],
  input {
    background: #ffffff;
    border: 2px solid #181b23;
    border-radius: 6px;
    font-size: 16px;
    font-family: 'Poppins', 'sans-serif';
    font-weight: 400;
    color: #000000;
    width: 100%;
    height: 44px;
    display: block;

    @media (max-width: 600px) {
      height: 40px;
    }
  }

  label[id='class'],
  label[id='mask'] {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #000000;
    display: block;

    @media (max-width: 600px) {
      font-size: 16px;
    }

    input {
      margin-top: 8px;
    }
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
  color: #d00000;
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

export const CheckBox = styled.input`
  position: relative;
  display: inline-block;
  border: 1px solid #ccc;
  width: 16px;
  height: 16px;
  background: #eee;
  cursor: pointer;
`;

export const CheckBoxFlex = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-top: 12px;

  p {
    font-size: 12px;
    color: #000000;
    font-family: 'Poppins', 'sans-serif';
    font-weight: 400;
  }
`;
