import React from 'react';
import * as Styled from './style';
import BarberLogo from '../../assets/barber-logo.png';
import Image from 'next/image';
import Link from 'next/link';

function TheHeader() {
  return (
    <Styled.HeaderBg>
      <Styled.HeaderContent>
        <div>
          <Link href="/">
            <Image alt="Logo" src={BarberLogo} />
          </Link>
        </div>
        <Styled.ButtonsFlex>
          <Link href="/barbearias">
            <Styled.HeaderButton outline={true}>Barbearias</Styled.HeaderButton>
          </Link>
          <Link href="/login">
            <Styled.HeaderButton outline={false}>
              Para empresas
            </Styled.HeaderButton>
          </Link>
        </Styled.ButtonsFlex>
      </Styled.HeaderContent>
    </Styled.HeaderBg>
  );
}

export default TheHeader;
