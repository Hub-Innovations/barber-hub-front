import React from 'react';
import * as Styled from './style';
import { FaReact } from 'react-icons/fa';
import { Tooltip } from '@chakra-ui/react';

export default function Title(props: any) {
  return (
    <div>
      <Styled.Title>Barber Hub</Styled.Title>
      <FaReact />
      <Tooltip label="Hey, I'm here!" aria-label="A tooltip">
        Hover me
      </Tooltip>
    </div>
  );
}
