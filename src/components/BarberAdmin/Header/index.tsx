import React from 'react';
import * as Styled from './style';
import Logo from '../../../assets/barber-logo.png';
import Image from 'next/image';
import { FaRegUser, FaRegSun, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react';
import useMedia from '../../../hooks/useMedia';

function AdminHeader() {
  const mobile = useMedia('(max-width: 769px)');

  return (
    <Styled.Header>
      <Styled.HeaderFlex>
        <Styled.HeaderLogo>
          <Image src={Logo} alt="Barber logo" />
        </Styled.HeaderLogo>
        {!mobile && (
          <Popover>
            <PopoverTrigger>
              <Styled.HeaderLogoProfile>
                <FaRegUser size="20" color="#fff" />
              </Styled.HeaderLogoProfile>
            </PopoverTrigger>
            <PopoverContent
              maxWidth="max-content"
              border="none"
              marginRight="40px"
              bg="#ffdd00"
            >
              <Styled.HeaderNav>
                <ul>
                  <li>
                    <Link href="/profile">
                      <FaRegSun size="16" color="#000000" />
                      Configurações
                    </Link>
                  </li>
                  <li>
                    <FaSignInAlt size="16" color="#000000" />
                    <p>Logout</p>
                  </li>
                </ul>
              </Styled.HeaderNav>
            </PopoverContent>
          </Popover>
        )}
      </Styled.HeaderFlex>
    </Styled.Header>
  );
}

export default AdminHeader;
