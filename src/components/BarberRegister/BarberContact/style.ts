import styled, { keyframes } from 'styled-components';

export const Title = styled.h1`
  font-size: 36px;
  color: #000;
`;

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

interface ErroMessageProps {
  inputMask?: boolean;
}

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

export const SectionTitle = styled.h1`
  font-size: 24px;
  font-family: 'Poppins', 'sans-serif';
  font-weight: 600;
  letter-spacing: 0.015rem;
  color: #111111;
  position: relative;

  @media (max-width: 769px) {
    font-size: 20px;
  }

  ::before {
    content: '';
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: #ffdd00;
    border-radius: 4px;
    position: absolute;
    bottom: 4px;
    z-index: -1;
    left: -10px;

    @media (max-width: 769px) {
      width: 16px;
      height: 16px;
    }
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 40px;

  button {
    grid-column: 2;
    justify-self: end;
  }

  div[id='CEP'] {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  input[name='cellphone'],
  input[name='fixCellphone'],
  input[name='cep'] {
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

  label[id='CELLPHONE'],
  label[id='FIX-CELLPHONE'],
  label[id='CEP-MASK'] {
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

  @media (max-width: 769px) {
    grid-template-columns: 1fr;

    button {
      grid-column: 1;
      justify-self: start;
    }
  }
`;

export const FormButton = styled.button`
  cursor: pointer;
  font-family: 'Poppins', 'sans-serif';
  font-size: 18px;
  color: #000000;
  font-weight: 600;
  background-color: #ffdd00;
  border-radius: 8px;
  width: 320px;
  height: 44px;
  transition: box-shadow 0.4s;

  :disabled {
    opacity: 0.6;
    cursor: wait;
  }

  :hover {
    box-shadow: 0 0 0 4px #ffdd00;
  }

  @media (max-width: 769px) {
    width: 280px;
  }
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

export const checkBoxFlex = styled.div`
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

export const helpLink = styled.a`
  color: #000000;
  text-decoration: 2px underline #ffdd00;
  font-size: 12px;
  font-weight: normal;
  font-family: 'Roboto', 'sans-serif';
  margin-top: 4px;
  cursor: pointer;
`;

export const ShowBarberLinkContainer = styled.div`
  padding-bottom: 40px;
  margin-top: 32px;

  p {
    font-family: 'Poppins', 'sans-serif';
    font-size: 14px;
    font-weight: normal;
    color: #000000;
    margin-bottom: 12px;
  }

  a {
    color: #181b23;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Roboto', 'sans-serif';
    padding-top: 12px;
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ShowBarberLinkFlex = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;
