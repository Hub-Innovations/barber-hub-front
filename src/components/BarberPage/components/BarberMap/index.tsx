import { Box } from '@chakra-ui/react';
import { BarberPageSectionTitle } from 'components/BarberPage/styles/GeneralStyles';
import React from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import Image from 'next/image';
import Mapa from 'assets/mapa.png';
import * as Styled from './style';

const BarberMap = () => {
  return (
    <Box>
      <BarberPageSectionTitle>
        <MdOutlineMyLocation size={24} color={'#ffdd00'} />
        Localize sua barbearia
      </BarberPageSectionTitle>
      <Styled.MapImage>
        <Image src={Mapa} alt="mapa" />
      </Styled.MapImage>
    </Box>
  );
};

export default BarberMap;
