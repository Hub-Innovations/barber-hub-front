import styled from 'styled-components';

export const BarberServicesTitle = styled.h2`
  font-size: 24px;
  font-family: 'Poppins', 'sans-serif';
  font-weight: 600;
  color: #343a40;
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  gap: 8px;
`;

interface BarberServicesListProps {
  scroll: boolean;
}

export const BarberServicesList = styled.ul`
  max-height: 200px;
  overflow-y: ${(p: BarberServicesListProps) =>
    p.scroll ? 'scroll' : 'hidden'};

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding-right: 20px;

    font-size: 18px;
    color: #000000;
    font-weight: normal;
    font-family: 'Roboto', 'sans-serif';

    border-bottom: 1px solid #6c757d;
    padding-bottom: 20px;
  }

  li + li {
    padding-top: 20px;
  }
`;

export const BarberServicesContent = styled.div``;

export const BarberServicesContainer = styled.div`
  position: relative;

  div[id='button-mark'] {
    position: absolute;
    bottom: 0;
  }

  @media (max-width: 800px) {
    margin-bottom: 40px;
    div[id='button-mark'] {
      position: initial;
      margin-top: 20px;
    }
  }
`;
