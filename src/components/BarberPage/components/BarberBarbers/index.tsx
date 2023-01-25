import { Box } from '@chakra-ui/react';
import { BarberPageSectionTitle } from 'components/BarberPage/styles/GeneralStyles';
import Image from 'next/image';
import React from 'react';
import { FiUsers } from 'react-icons/fi';
import * as Styled from './style';
import BarbeiroImg from 'assets/img-corte-exemplo.jpg';
import ButtonMarkTime from '../ButtonMarkTime';

// alinhar as props do back
function BarberBarbers() {
  return (
    <Box>
      <BarberPageSectionTitle>
        <FiUsers size={24} color={'#ffdd00'} />
        Nossos barbeiros
      </BarberPageSectionTitle>
      <Styled.BarbersList>
        <li>
          <Image src={BarbeiroImg} alt="barbeiro" />
          <h2>JR barbeiro</h2>
          <span>Barbeiro(a)</span>
        </li>
        <li>
          <Image src={BarbeiroImg} alt="barbeiro" />
          <h2>JR barbeiro</h2>
          <span>Barbeiro(a)</span>
        </li>
        <li>
          <Image src={BarbeiroImg} alt="barbeiro" />
          <h2>JR barbeiro</h2>
          <span>Barbeiro(a)</span>
        </li>
        <li>
          <Image src={BarbeiroImg} alt="barbeiro" />
          <h2>JR barbeiro</h2>
          <span>Barbeiro(a)</span>
        </li>
        <li>
          <Image src={BarbeiroImg} alt="barbeiro" />
          <h2>JR barbeiro</h2>
          <span>Barbeiro(a)</span>
        </li>
        <li>
          <Image src={BarbeiroImg} alt="barbeiro" />
          <h2>JR barbeiro</h2>
          <span>Barbeiro(a)</span>
        </li>
        <li>
          <Image src={BarbeiroImg} alt="barbeiro" />
          <h2>JR barbeiro</h2>
          <span>Barbeiro(a)</span>
        </li>
        <li>
          <Image src={BarbeiroImg} alt="barbeiro" />
          <h2>JR barbeiro</h2>
          <span>Barbeiro(a)</span>
        </li>
        <li>
          <Image src={BarbeiroImg} alt="barbeiro" />
          <h2>JR barbeiro</h2>
          <span>Barbeiro(a)</span>
        </li>
      </Styled.BarbersList>
      <Box mt="40px">
        <ButtonMarkTime />
      </Box>
    </Box>
  );
}

export default BarberBarbers;
