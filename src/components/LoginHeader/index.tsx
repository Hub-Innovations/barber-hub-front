import Link from 'next/link';
import React from 'react';
import { LoginHeaderContainer } from './style';
import BarberLogo from '../../assets/barber-logo.png';
import Image from 'next/image';
import useMedia from '../../hooks/useMedia';
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
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { SlMenu } from 'react-icons/sl';
import { FaCircle } from 'react-icons/fa';

interface LoginHeaderProps {
  register: boolean;
}

function LoginHeader({ register }: LoginHeaderProps) {
  const mobile = useMedia('(max-width: 769px)');

  return (
    <LoginHeaderContainer>
      <Link href="/">
        <Image src={BarberLogo} alt="Barber logo" />
      </Link>
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
                  {isOpen ? <AiOutlineClose size="20" /> : <SlMenu size="20" />}
                </Flex>
              </MenuButton>
              <MenuList backgroundColor="#FFDD00" border="none" minW="160px">
                <MenuItem
                  fontSize="16px"
                  fontFamily="Poppins, sans-serif"
                  color="#111111"
                  fontWeight="400"
                  backgroundColor="#FFDD00"
                  maxW="160px"
                >
                  <Flex alignItems="center" gap="8px">
                    <FaCircle size="8" />
                    <Link href={register ? '/login/register' : '/login'}>
                      {register ? 'Criar cadastro' : 'Entrar'}
                    </Link>
                  </Flex>
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      ) : (
        <Link href={register ? '/login/register' : '/login'} id="login">
          {register ? 'Criar cadastro' : 'Entrar'}
        </Link>
      )}
    </LoginHeaderContainer>
  );
}

export default LoginHeader;
