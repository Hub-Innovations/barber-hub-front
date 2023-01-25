import TheTitle from 'components/TheTitle';
import React from 'react';
import * as Styled from './style';
import barberBanner from '../../assets/barber-banner.png';
import Image from 'next/image';
import BarberServices from './components/BarberServices';
import BarberAddress from './components/BarberAddress';
import BarberContact from './components/BarberContact';
import useMedia from 'hooks/useMedia';
import { Box } from '@chakra-ui/react';
import BarberMap from './components/BarberMap';
import BarberBarbers from './components/BarberBarbers';

// fazer o get para substituir a array mocada
const services = [
  {
    name: 'Corte navalhado',
    price: 12.5,
  },
  {
    name: 'Corte navalhado',
    price: 12.5,
  },
  {
    name: 'Corte navalhado',
    price: 12.5,
  },
  {
    name: 'Corte navalhado',
    price: 12.5,
  },
];

function BarberPageComponent() {
  const mobile = useMedia('(max-width: 800px)');

  return (
    <Box mt="60px">
      <TheTitle title="Barbearia dos sonhos" />
      <Styled.BarberPageGrid>
        <Styled.BarberImage>
          <Image src={barberBanner} alt="Barber banner" />
        </Styled.BarberImage>
        <BarberServices services={services} />
        <Styled.BorderRight>
          <BarberAddress />
        </Styled.BorderRight>
        <Box mt={mobile ? '40px' : '0px'}>
          <BarberContact />
        </Box>
        <BarberMap />
        <BarberBarbers />
      </Styled.BarberPageGrid>
    </Box>
  );
}

export default BarberPageComponent;
