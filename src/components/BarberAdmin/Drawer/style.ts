import styled from 'styled-components';

export const ButtonOpenOrCloseDrawer = styled.button`
  cursor: pointer;
  background: #fff;
  position: absolute;
  top: 40px;
  left: 60px;

  padding: 10px;
  border-radius: 4px;

  @media (max-width: 760px) {
    left: 20px;
  }
`;

export const DrawerItemList = styled.ul`
  display: grid;
  gap: 20px;
`;

export const DrawerItemFlex = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  a {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  p,
  a {
    font-family: 'Poppins', 'sans-serif';
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.015rem;
    color: #000000;
  }
`;

export const DrawerTitle = styled.h2`
  font-family: 'Poppins', 'sans-serif';
  font-size: 20px;
  font-weight: bold;
  color: #000000;
`;
