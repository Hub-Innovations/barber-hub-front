import React from 'react';
import * as Styled from './style';
import Link from 'next/link';
import BarberLogo from '../../assets/barber-logo.png';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import Image from 'next/image';

function TheFooter() {
  return (
    <>
      <Styled.TheFooterBg>
        <Styled.TheFooterContent>
          <Styled.TheFooterInformationLinks>
            <ul>
              <li>
                <Link href="/">Politica de privacidade</Link>
              </li>
              <li>
                <Link href="/">FAQ</Link>
              </li>
              <li>
                <Link href="/">Contato</Link>
              </li>
              <li>
                <Link href="/">Sobre nós</Link>
              </li>
            </ul>
            <p>@barber-hub todos os direitos reservados</p>
          </Styled.TheFooterInformationLinks>
          <Styled.TheFooterSocialsLinks>
            <Link href="/">
              <Image src={BarberLogo} alt="Barber Logo" />
            </Link>
            <ul>
              <li>
                <Link href="/">
                  <FaInstagram size="32px" color="#fff" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <FaFacebook size="32px" color="#fff" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <FaYoutube size="32px" color="#fff" />
                </Link>
              </li>
            </ul>
          </Styled.TheFooterSocialsLinks>
        </Styled.TheFooterContent>
      </Styled.TheFooterBg>
    </>
  );
}

export default TheFooter;
