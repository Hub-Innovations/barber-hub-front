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

  li {
    img {
      max-width: 100%;
      height: auto;
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
`;
