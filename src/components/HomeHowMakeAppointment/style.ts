import styled from 'styled-components';

export const HowMakeAppointmentContainer = styled.div`
  margin-top: 100px;
  padding: 0 60px;
`;

export const HowMakeAppointmentContent = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 769px) {
    grid-template-columns: 1fr;
  }

  p {
    font-family: 'Roboto', 'sans-serif';
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    color: #000000;

    @media (max-width: 769px) {
      font-size: 16px;
    }
  }

  img {
    max-width: 560px;
    height: 460px;

    @media (max-width: 769px) {
      max-width: 100%;
      height: auto;
    }
  }
`;
