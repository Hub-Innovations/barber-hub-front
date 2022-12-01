import Link from 'next/link';
import React from 'react';
import { LoginHeaderContainer } from './style';
import BarberLogo from '../../assets/barber-logo.png';
import Image from 'next/image';

interface LoginHeaderProps {
  register: boolean;
}

function LoginHeader({ register }: LoginHeaderProps) {
  return (
    <LoginHeaderContainer registerFlex={register}>
      <Link href="/">
        <Image src={BarberLogo} alt="Barber logo" />
      </Link>
      <Link href={register ? '/login/register' : '/login'} id="login">
        {register ? 'Criar cadastro' : 'Entrar'}
      </Link>
    </LoginHeaderContainer>
  );
}

export default LoginHeader;
