import styled from 'styled-components';

export const MapImage = styled.div`
  max-width: 580px;
  min-height: 390px;

  @media (max-width: 800px) {
    min-height: auto;
  }

  img {
    max-width: 100%;
  }
`;
