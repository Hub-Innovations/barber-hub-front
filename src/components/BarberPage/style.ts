import styled from 'styled-components';

export const BarberImage = styled.div`
  margin-top: 32px;
  max-width: 580px;
  min-height: 390px;

  img {
    max-width: 100%;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

export const BarberPageGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 80px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const BorderRight = styled.div`
  border-right: 1px solid #6c757d;

  @media (max-width: 800px) {
    border-right: none;
  }
`;
