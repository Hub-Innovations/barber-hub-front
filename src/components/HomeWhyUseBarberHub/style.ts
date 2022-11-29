import styled from 'styled-components';

export const WhyUseBarberHubContainer = styled.div`
  margin-top: 100px;
  padding: 0 60px;

  @media (max-width: 769px) {
    padding: 0 24px;
  }
`;

export const WhyUserBarberHubContent = styled.div`
  margin-top: 32px;
`;

export const WhyUseBarberHubList = styled.ul`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 769px) {
    flex-direction: column;
    gap: 16px;
  }

  li {
    display: grid;
    justify-items: center;
    margin-top: 40px;

    @media (max-width: 769px) {
      svg {
        width: 60px;
        height: 60px;
      }
    }

    p {
      font-family: 'Roboto', 'sans-serif';
      font-weight: 400;
      font-size: 20px;
      line-height: 1.4;
      color: #000000;
      margin-top: 40px;
      text-align: center;

      @media (max-width: 769px) {
        font-size: 16px;
        text-align: center;
      }
    }
  }
`;
