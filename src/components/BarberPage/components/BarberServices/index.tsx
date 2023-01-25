import React from 'react';
import * as Styled from './style';
import { HiOutlineScissors } from 'react-icons/hi';
import { formatToCurrency } from 'helpers/Currency/formatCurrency';
import ButtonMarkTime from '../ButtonMarkTime';
import { Box, Tooltip } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';

interface BarberServicesProps {
  services: Array<{
    price: number;
    name: string;
  }>;
}

function BarberServices({ services }: BarberServicesProps) {
  const [showBarberServicesScroll, setShowBarberServicesScroll] =
    React.useState<boolean>(false);

  // efeito para geral um scroll somente quando tiver mais de 3 serviços na array
  React.useEffect(() => {
    if (services.length > 3) {
      setShowBarberServicesScroll(true);
    }
  }, [services.length]);

  return (
    <Styled.BarberServicesContainer>
      <Styled.BarberServicesTitle>
        <HiOutlineScissors size={24} color={'#ffdd00'} />
        Serviços
        <Tooltip
          label="Scrollar para baixo, para mostrar todos os serviços"
          placement="bottom-end"
          bg="#495057"
          color="#f1f1f1"
          fontFamily="Poppins, sans-serif"
          fontSize="14px"
          fontWeight="600"
          letterSpacing="0.015rem"
          closeOnClick={false}
        >
          <button type="button" id="buttonTooltip">
            <FaInfoCircle color="#ffdd00" size="16" />
          </button>
        </Tooltip>
      </Styled.BarberServicesTitle>
      <Styled.BarberServicesContent>
        <Styled.BarberServicesList scroll={showBarberServicesScroll}>
          {services.map((service, index) => {
            return (
              <li key={index}>
                <span>{service.name}</span>
                <span>{formatToCurrency(service.price)}</span>
              </li>
            );
          })}
        </Styled.BarberServicesList>
      </Styled.BarberServicesContent>
      <div id="button-mark">
        <ButtonMarkTime />
      </div>
    </Styled.BarberServicesContainer>
  );
}

export default BarberServices;
