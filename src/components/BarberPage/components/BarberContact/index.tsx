import { Box } from '@chakra-ui/react';
import {
  BarberPageGeneralList,
  BarberPageSectionTitle,
} from 'components/BarberPage/styles/GeneralStyles';
import { formatCellPhoneNumber } from 'helpers/formatCellphoneNumber';
import React from 'react';
import { FiPhoneCall } from 'react-icons/fi';

// lembrar de criar o interface para receber as props que vier do back
// alinhar se vai um objeto ou label a label...
// outra coisa, fazer um if, se tiver telefone mostra o campo, se não, deixa ele de fora
function BarberContact() {
  return (
    <Box>
      <BarberPageSectionTitle>
        <FiPhoneCall size={20} color={'#ffdd00'} />
        Contato
      </BarberPageSectionTitle>
      <BarberPageGeneralList alignWithTitle={true}>
        <li>
          <span>Celular:</span>
          <p>{formatCellPhoneNumber('21971956764')}</p>
        </li>
        <li>
          <span>Telefone:</span>
          <p>21091956764</p>
        </li>
        <li>
          <span>Email:</span>
          <p>eduardobaptista66@gmail.com</p>
        </li>
      </BarberPageGeneralList>
    </Box>
  );
}

export default BarberContact;
