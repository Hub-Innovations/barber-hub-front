import styled from 'styled-components';

export const BarbersList = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 400px;
  overflow-x: scroll;
  padding-bottom: 20px;
  min-width: 100%;

  @media (max-width: 800px) {
    max-width: 320px;
  }

  li {
    display: grid;
    place-items: center;
    box-shadow: 1px 2px 6px 0 rgb(0 0 0 / 16%);
    padding: 20px 12px;
    max-width: max-content;
    border-radius: 6px;
    min-width: 140px;

    img {
      border-radius: 8px;
      width: 140px;
      height: 120px;
    }

    h2 {
      font-size: 18px;
      font-weight: 600;
      font-family: 'Poppins', 'sans-serif';
      color: #000000;
      margin-bottom: 8px;
      margin-top: 4px;
    }

    span {
      font-size: 16px;
      font-weight: 400;
      font-family: 'Roboto', 'sans-serif';
      color: #000000;
    }
  }
`;
