import styled from 'styled-components';

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
      display: none;

      @media (max-width: 600px) {
        height: 40px;
      }
    }
  }
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
    display: none;

    @media (max-width: 600px) {
      height: 40px;
    }
  }

  label[id='class'] {
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
