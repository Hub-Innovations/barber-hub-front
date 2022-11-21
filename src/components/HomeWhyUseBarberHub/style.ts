import styled from 'styled-components';

export const WhyUseBarberHubContainer = styled.div`
  margin-top: 32px;
  padding: 0 60px;
`;

export const WhyUserBarberHubContent = styled.div`
  margin-top: 32px;
`;

export const WhyUseBarberHubList = styled.ul`
  display: flex;
  align-items: center;
  gap: 40px;

  li {
    display: grid;
    justify-items: center;

    p {
      font-family: 'Roboto', 'sans-serif';
      font-weight: 400;
      font-size: 20px;
      line-height: 23px;
      color: #000000;
      margin-top: 40px;
    }
  }
`;
