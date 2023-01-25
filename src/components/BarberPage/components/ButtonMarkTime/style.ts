import styled from 'styled-components';

export const ButtonMarkTimeContainer = styled.div`
  span {
    font-size: 18px;
    font-family: 'Poppins', 'sans-serif';
    font-weight: 600;
    color: #343a40;
    margin-bottom: 8px;
    display: block;
  }

  button {
    cursor: pointer;
    font-family: 'Poppins', 'sans-serif';
    font-weight: normal;
    font-size: 16px;
    padding: 12px;
    border-radius: 4px;
    color: #76520e;
    border: 2px solid #76520e;
    background-color: #ffdd00;
    text-align: center;
    min-width: 200px;
    height: 50px;
    transition: 0.2s;
    text-transform: uppercase;

    :hover {
      box-shadow: 0 0 0 1px #76520e;
    }
  }
`;
