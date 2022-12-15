import React from 'react';
import { SlMenu } from 'react-icons/sl';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { ButtonOpenOrCloseDrawer } from './style';
import * as Styled from './style';
import Link from 'next/link';
import { GrUserSettings } from 'react-icons/gr';
import { BsCalendarDate } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import useMedia from '../../../hooks/useMedia';
import { FaSignInAlt } from 'react-icons/fa';

function AdminDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mobile = useMedia('(max-width: 769px)');

  return (
    <>
      <ButtonOpenOrCloseDrawer onClick={onOpen}>
        <SlMenu size="20" color="#111" />
      </ButtonOpenOrCloseDrawer>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="2px solid #000000" pb="20px" mb="20px">
            <Styled.DrawerTitle>Menu</Styled.DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Styled.DrawerItemList>
              <Styled.DrawerItemFlex>
                <Link href="/profile">
                  <GrUserSettings size="18" color="#00000" />
                  Perfil / Barbearia
                </Link>
              </Styled.DrawerItemFlex>
              <Styled.DrawerItemFlex>
                <Link href="/profile/calendar">
                  <BsCalendarDate size="18" color="#00000" />
                  <p>Agendamentos</p>
                </Link>
              </Styled.DrawerItemFlex>
              <Styled.DrawerItemFlex>
                <Link href="/profile/customers">
                  <FiUsers size="18" color="#00000" />
                  <p>Clientes</p>
                </Link>
              </Styled.DrawerItemFlex>
              {mobile && (
                <Styled.DrawerItemFlex>
                  <FaSignInAlt size="18" color="#00000" />
                  <p>Logout</p>
                </Styled.DrawerItemFlex>
              )}
            </Styled.DrawerItemList>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AdminDrawer;
