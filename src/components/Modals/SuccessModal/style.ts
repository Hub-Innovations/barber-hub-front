import styled from 'styled-components';

export const ModalTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  font-family: 'Poppins', 'sans-serif';
  letter-spacing: 0.015rem;
  color: #000000;

  @media (max-width: 769px) {
    font-size: 16px;
  }
`;

export const ModalText = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-family: 'Roboto', 'sans-serif';
  line-height: 1.5;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 769px) {
    font-size: 16px;
  }
`;

interface ButtonProps {
  outline: boolean;
}

export const ModalButton = styled.button`
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: ${(p: ButtonProps) => (p.outline ? '#000000' : '#ffffff')};
  background-color: ${(p: ButtonProps) => (p.outline ? '#ffffff' : '#181b23')};
  border: ${(p: ButtonProps) =>
    p.outline ? '2px solid #181b23' : '2px solid transparent'};
  border-radius: 8px;
  padding: 8px;
  min-width: 120px;
  letter-spacing: 0.015rem;

  @media (max-width: 769px) {
    font-size: 14px;
    padding: 6px;
  }
`;
