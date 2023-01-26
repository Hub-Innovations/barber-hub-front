import styled from 'styled-components';

export const ProfileContainer = styled.div`
  padding: 60px 60px 0 60px;

  @media (max-width: 769px) {
    font-size: 16px;
    padding: 60px 20px 0 20px;
  }

  button[aria-selected='true'] {
    background: #ffdd00;
  }
`;

export const TabLabel = styled.p`
  font-size: 18px;
  font-family: Poppins;
  font-weight: 600;
  color: #000000;
  letter-spacing: 0.015rem;
  margin-right: 32px;
  text-align: center;

  @media (max-width: 769px) {
    font-size: 14px;
    margin-right: 0px;
  }

  @media (max-width: 400px) {
    font-size: 12px;
    margin-right: 0px;
  }
`;
