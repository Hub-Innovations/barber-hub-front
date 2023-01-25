import styled from 'styled-components';

// se for usar um ícone aqui, precisa ter 24px, caso use esse titulo com a lista em baixo
// com o componente de lista BarberPageGeneralList, para manter o alinhamento
export const BarberPageSectionTitle = styled.h2`
  font-family: 'Poppins', 'sans-serif';
  font-weight: 600;
  color: #343a40;
  font-size: 24px;

  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

interface BarberPageGeneralListProps {
  alignWithTitle: boolean;
}

export const BarberPageGeneralList = styled.ul`
  padding-left: ${(p: BarberPageGeneralListProps) =>
    p.alignWithTitle ? '32px' : '0px'};

  li {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      font-size: 16px;
      font-weight: 600;
      font-family: 'Poppins', 'sans-serif';
      color: #000000;
    }

    p {
      font-size: 16px;
      font-weight: normal;
      font-family: 'Roboto', 'sans-serif';
      line-height: 1.4;
      color: #b2b2b2;
    }
  }

  li + li {
    margin-top: 20px;
  }
`;
