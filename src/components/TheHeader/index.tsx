import React from 'react';
import * as Styled from './style';
import BarberLogo from '../../assets/barber-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { SlMenu } from 'react-icons/sl';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Flex,
  Grid,
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import useMedia from '../../hooks/useMedia';
import { FaCircle } from 'react-icons/fa';

function TheHeader() {
  const mobile = useMedia('(max-width: 769px)');

  return (
    <Styled.HeaderBg>
      <Styled.HeaderContent>
        <div>
          <Link href="/">
            <Image alt="Logo" src={BarberLogo} />
          </Link>
        </div>
        {mobile ? (
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  _expanded={{ bg: '#FFDD00' }}
                  _hover={{ bg: '#FFDD00' }}
                  transition="all 0.2s"
                  isActive={isOpen}
                >
                  <Flex justifyContent="center">
                    {isOpen ? (
                      <AiOutlineClose size="20" />
                    ) : (
                      <SlMenu size="20" />
                    )}
                  </Flex>
                </MenuButton>
                <MenuList backgroundColor="#FFDD00" border="none" minW="180px">
                  <Grid gap="8px">
                    <MenuItem
                      fontSize="16px"
                      fontFamily="Poppins, sans-serif"
                      color="#111111"
                      fontWeight="400"
                      backgroundColor="#FFDD00"
                      maxW="180px"
                    >
                      <Flex alignItems="center" gap="8px">
                        <FaCircle size="8" />
                        <Link href="/">Barbearias</Link>
                      </Flex>
                    </MenuItem>
                    <MenuItem
                      fontSize="16px"
                      fontFamily="Poppins, sans-serif"
                      color="#111111"
                      fontWeight="400"
                      backgroundColor="#FFDD00"
                      maxW="180px"
                    >
                      <Flex alignItems="center" gap="8px">
                        <FaCircle size="8" />
                        <Link href="/login">Para empresas</Link>
                      </Flex>
                    </MenuItem>
                  </Grid>
                </MenuList>
              </>
            )}
          </Menu>
        ) : (
          <Styled.ButtonsFlex>
            <Link href="/barbearias">
              <Styled.HeaderButton outline={true}>
                Barbearias
              </Styled.HeaderButton>
            </Link>
            <Link href="/login">
              <Styled.HeaderButton outline={false}>
                Para empresas
              </Styled.HeaderButton>
            </Link>
          </Styled.ButtonsFlex>
        )}
      </Styled.HeaderContent>
    </Styled.HeaderBg>
  );
}

export default TheHeader;
