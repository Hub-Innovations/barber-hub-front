import styled from 'styled-components';

export const Header = styled.header`
  background: #111;
  padding: 40px 60px;
  min-height: 80px;

  @media (max-width: 769px) {
    padding: 40px 20px;
  }
`;

export const HeaderLogo = styled.div`
  padding-left: 60px;
  padding-top: 2px;
`;

export const HeaderNav = styled.div`
  background: #ffdd00;
  border-radius: 8px;
  padding: 16px;

  ul {
    display: grid;
    gap: 20px;

    li,
    a {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;

      p,
      a {
        list-style: none;
        font-size: 16px;
        color: #000000;
        font-family: 'Roboto', 'sans-serif';
        font-weight: 400;
        transition: 0.3s;

        :hover {
          color: #ffffff;
        }
      }
    }
  }
`;

export const HeaderLogoProfile = styled.div`
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid #ffffff;
  width: max-content;
  padding: 4px;
`;

export const HeaderFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 769px) {
    justify-content: right;
  }
`;
