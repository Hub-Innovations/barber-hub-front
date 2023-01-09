import styled from 'styled-components';

export const ModaEventButton = styled.button`
  cursor: pointer;
  color: #000000;
  font-family: 'Roboto', 'sans-serif';
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  background-color: #ffdd00;

  border-radius: 8px;
  min-width: 120px;
  height: 44px;
  display: grid;
  place-items: center;
  transition: 0.4s;

  :hover {
    box-shadow: 0 0 0 2px #ffdd00;
  }
`;

export const ModalEventButtonFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-bottom: 20px;
`;

export const CalendarButtonAddEvent = styled.button`
  margin-top: 24px;
  cursor: pointer;
  display: block;
  font-size: 16px;
  color: #000000;
  font-weight: 600;
  font-family: 'Poppins', 'sans-serif';
  border-radius: 8px;
  background: #ffdd00;
  padding: 8px;
  transition: 0.4s;
  min-width: 220px;
  min-height: 44px;

  :hover {
    box-shadow: 0 0 0 2px #ffdd00;
  }
`;
