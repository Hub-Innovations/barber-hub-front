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

  p {
    font-family: 'Poppins', 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    color: #cccccc;
    text-decoration: none;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 16px;

    li {
      a {
        font-family: 'Poppins', 'sans-serif';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 30px;
        color: #cccccc;
        text-decoration: none;
        transition: 0.3s;

        :hover {
          color: #ffffff;
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

  ul {
    display: flex;
    align-items: center;
    gap: 16px;
    list-style: none;
  }
`;
