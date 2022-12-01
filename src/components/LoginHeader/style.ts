import styled from 'styled-components';

interface LoginHeaderProps {
  registerFlex: boolean;
}

export const LoginHeaderContainer = styled.header`
  background-color: #111111;
  padding: 20px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 769px) {
    padding: 20px;
  }

  a[id='login'] {
    background-color: #ffffff;
    color: #000000;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    border-radius: 6px;
    padding: 8px 10px;
    transition: 0.2s;
    min-width: 120px;
    text-align: center;

    :hover {
      box-shadow: 0 0 0 4px #ffffff;
    }
  }
`;
