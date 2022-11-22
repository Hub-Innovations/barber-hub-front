import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 32px;
  font-family: 'Poppins', 'sans-serif';
  font-weight: 600;
  letter-spacing: 0.015rem;
  color: #111111;
  position: relative;

  @media (max-width: 769px) {
    font-size: 28px;
  }

  ::before {
    content: '';
    width: 24px;
    height: 24px;
    display: inline-block;
    background-color: #ffdd00;
    border-radius: 4px;
    position: absolute;
    bottom: 4px;
    z-index: -1;
    left: -10px;

    @media (max-width: 769px) {
      width: 20px;
      height: 20px;
    }
  }
`;
