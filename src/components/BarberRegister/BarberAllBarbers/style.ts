import styled from 'styled-components';

export const TableTitleHead = styled.span`
  font-family: 'Poppins', 'sans-serif';
  font-size: 18px;
  color: #000000;
  font-weight: 600;

  @media (max-width: 769px) {
    font-size: 16px;
  }
`;

export const TableSvg = styled.div`
  svg {
    display: inline;
  }
`;

export const AddBarberButton = styled.button`
  cursor: pointer;
  font-size: 20px;
  color: #000000;
  border-radius: 8px;
  background: #ffdd00;
  font-family: 'Poppins', 'sans-serif';
  padding: 8px;
  min-width: 50px;
  min-height: 50px;
  display: grid;
  place-items: center;
  transition: 0.4s;

  :hover {
    box-shadow: 0 0 0 4px #ffdd00;
  }

  :disabled {
    opacity: 0.4;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 14px;
  color: #000000;
  font-weight: 400;
  font-family: 'Poppins', 'sans-serf';
  text-align: center;
  margin-top: 8px;
`;

export const ModalServiceSubTitle = styled.h2`
  font-family: 'Poppins', 'sans-serif';
  font-size: 14px;
  color: #000000;
  font-weight: 600;
  margin-top: 0px;
`;

export const AddFirstItemButton = styled.div`
  cursor: pointer;
  font-size: 18px;
  color: #000000;
  border-radius: 4px;
  background: #ffdd00;
  font-family: 'Poppins', 'sans-serif';
  padding: 8px;
  display: grid;
  place-items: center;
  transition: 0.4s;
  max-width: max-content;
  margin-top: 24px;

  :hover {
    box-shadow: 0 0 0 4px #ffdd00;
  }
`;

export const AddFirstItemTitleCallBack = styled.p`
  font-family: 'Poppins', 'sans-serif';
  font-size: 12px;
  color: #000000;
  font-weight: 600;
  margin-top: 8px;
`;

export const BarberPreviewProfileImage = styled.div`
  max-width: 200px;
  max-height: 200px;

  img {
    max-width: 100%;
  }
`;
