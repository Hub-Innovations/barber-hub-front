import { Box } from '@chakra-ui/react';
import {
  BarberPageGeneralList,
  BarberPageSectionTitle,
} from 'components/BarberPage/styles/GeneralStyles';
import React from 'react';
import { GrLocation } from 'react-icons/gr';
import * as Styled from './style';
import { GoLocation } from 'react-icons/go';

// lembrar de criar um interface para receber as props de endereço que vem do back
// mas alinhas se vai vir tudo em um objeto ou label a label...

function BarberContact() {
  return (
    <Box>
      <BarberPageSectionTitle>
        <GoLocation size={24} color="#ffdd00" />
        Localização
      </BarberPageSectionTitle>
      <BarberPageGeneralList alignWithTitle={true}>
        <li>
          <span>Cidade:</span>
          <p>Rio bonito</p>
        </li>
        <li>
          <span>Endereço:</span>
          <p>na rua logo ali perto</p>
        </li>
        <li>
          <span>Bairro:</span>
          <p>Praça cruzeiro</p>
        </li>
        <li>
          <span>Complemento:</span>
          <p>No lugarzin gostoso</p>
        </li>
        <li>
          {/* lembrar de verificar quando não tiver número */}
          <span>Número</span>
          <p>22</p>
        </li>
      </BarberPageGeneralList>
    </Box>
  );
}

export default BarberContact;
