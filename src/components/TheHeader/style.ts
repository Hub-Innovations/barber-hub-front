import styled from 'styled-components';

export const HeaderBg = styled.header`
  background-color: #111111;
  height: 100px;
  display: grid;
  align-items: center;

  @media (max-width: 769px) {
    height: auto;
    padding-bottom: 32px;
    padding-top: 20px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;

  @media (max-width: 769px) {
    padding: 0 20px;
  }
`;

interface ButtonProps {
  outline: boolean;
}

export const HeaderButton = styled.button`
  font-family: 'Poppins', 'sans-serif';
  font-size: 14px;
  color: ${(p: ButtonProps) => (p.outline ? '#ffffff' : '#000000')};
  background-color: ${(p: ButtonProps) =>
    p.outline ? 'transparent' : '#ffffff'};
  border: ${(p: ButtonProps) => (p.outline ? '2px solid #ffffff' : '')};
  width: 144px;
  height: 52px;
  transition: 0.4s;
  border-radius: 8px;
  letter-spacing: 0.015rem;

  :hover {
    border-color: ${(p: ButtonProps) => (p.outline ? '#FFDD00' : '#f22')};
    box-shadow: ${(p: ButtonProps) => (p.outline ? '' : '0 0 0 4px #ffffff')};
  }

  :active {
    box-shadow: ${(p: ButtonProps) =>
      p.outline ? '0 0 0 6px #FFDD00' : '0 0 0 6px #ffffff'};
  }

  @media (max-width: 320px) {
    width: 120px;
    height: 52px;
  }
`;

export const ButtonsFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 769px) {
    margin-top: 32px;
  }
`;
