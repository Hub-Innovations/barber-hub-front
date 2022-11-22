import styled from 'styled-components';

export const TheFooterBg = styled.footer`
  background-color: #111111;
  margin-top: 100px;
`;

export const TheFooterContent = styled.div`
  padding: 40px 60px;
`;

export const TheFooterInformationLinks = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 30px;

  @media (max-width: 769px) {
    flex-direction: column-reverse;
    border-bottom: 0px solid #cccccc;
    padding-bottom: 0px;
  }

  p {
    font-family: 'Poppins', 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.4;
    color: #cccccc;
    text-decoration: none;

    @media (max-width: 769px) {
      border-bottom: 1px solid #cccccc;
      padding-bottom: 20px;
      font-size: 14px;
    }
  }

  ul {
    display: flex;
    align-items: center;
    gap: 16px;
    list-style: none;

    @media (max-width: 769px) {
      flex-direction: column;
      align-items: flex-start;
      border-bottom: 1px solid #cccccc;
      padding-bottom: 20px;
    }

    li {
      a {
        font-family: 'Poppins', 'sans-serif';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.4;
        color: #cccccc;
        text-decoration: none;
        transition: 0.3s;

        :hover {
          color: #ffffff;
        }

        @media (max-width: 769px) {
          font-size: 14px;
        }
      }
    }
  }
`;

export const TheFooterSocialsLinks = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 769px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 16px;
    list-style: none;

    @media (max-width: 769px) {
      grid-column: 1 / -1;
      grid-row: 1;
      margin-bottom: 20px;
      border-bottom: 1px solid #cccccc;
      padding-bottom: 24px;
    }
  }
`;
