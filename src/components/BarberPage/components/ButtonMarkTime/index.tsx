import React from 'react';
import * as Styled from './style';

function ButtonMarkTime() {
  return (
    <>
      <Styled.ButtonMarkTimeContainer>
        <span>Marcar horário</span>
        <button>Marcar</button>
      </Styled.ButtonMarkTimeContainer>
    </>
  );
}

export default ButtonMarkTime;
