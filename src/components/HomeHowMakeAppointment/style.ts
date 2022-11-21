import styled from 'styled-components';

export const HowMakeAppointmentContainer = styled.div`
  margin-top: 32px;
  padding: 0 60px;
`;

export const HowMakeAppointmentContent = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  p {
    font-family: 'Roboto', 'sans-serif';
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
  }

  img {
    max-width: 560px;
    height: 460px;
  }
`;
