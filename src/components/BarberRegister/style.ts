import styled from 'styled-components';

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

export const ModalTitle = styled.h2`
  font-size: 14px;
  color: #000000;
  font-weight: 400;
  font-family: 'Poppins', 'sans-serf';
  text-align: center;
  margin-top: 8px;
`;

export const ModalButton = styled.button`
  cursor: pointer;
  font-family: 'Poppins', 'sans-serif';
  font-size: 18px;
  color: #000000;
  font-weight: 600;
  background-color: #ffdd00;
  border-radius: 8px;
  height: 44px;
  transition: box-shadow 0.4s;
  padding: 0 16px;
  margin-top: 32px;
  min-width: 120px;

  :hover {
    box-shadow: 0 0 0 4px #ffdd00;
  }

  :disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;
