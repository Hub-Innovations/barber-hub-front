import styled from 'styled-components';

export const PopularServicesContainer = styled.div`
  padding: 0 60px;
  margin-top: 32px;
`;

export const PopularServicesList = styled.ul`
  display: flex;
  gap: 32px;
  list-style: none;
  margin-top: 2rem;

  @media (max-width: 769px) {
    padding-bottom: 40px;
    overflow-x: scroll;

    ::-webkit-scrollbar {
      width: 12px;
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      background-color: #cccccc;
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #ffdd00;
      border-radius: 5px;
      border: 1px solid #ffdd00;
    }
  }

  li {
    img {
      max-width: 100%;
      height: auto;

      @media (max-width: 769px) {
        max-width: 260px;
      }
    }
  }
`;

export const PopularServicesSubTitle = styled.h2`
  font-family: 'Poppins', 'sans-serif';
  font-weight: 500;
  font-size: 24px;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  ::before {
    width: 10px;
    height: 3px;
    content: '';
    display: inline-block;
    background-color: #ffdd00;
  }
`;

export const PopularServicesText = styled.p`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 18px;
  color: #111111;
  line-height: 1.4;

  @media (max-width: 769px) {
    font-size: 16px;
  }
`;
