import React from 'react';
import AdminDrawer from '../../components/BarberAdmin/Drawer';
import AdminHeader from '../../components/BarberAdmin/Header';
import * as Styled from '../../styles/Admin/profile';
import BarberRegisterContact from '../../components/BarberRegister/BarberContact';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from '@chakra-ui/react';

function AdminProfile() {
  return (
    <>
      <AdminHeader />
      <AdminDrawer />
      <Styled.ProfileContainer>
        <Tabs isFitted colorScheme="orange" variant="soft-rounded">
          <TabList>
            <Tab onClick={(e) => console.log(e)}>
              <Styled.TabLabel>Contato</Styled.TabLabel>
            </Tab>
            <Tab>
              <Styled.TabLabel>Serviços</Styled.TabLabel>
            </Tab>
            <Tab>
              <Styled.TabLabel>Logo</Styled.TabLabel>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <BarberRegisterContact />
            </TabPanel>
            <TabPanel>2</TabPanel>
            <TabPanel>3</TabPanel>
          </TabPanels>
        </Tabs>
      </Styled.ProfileContainer>
    </>
  );
}

export default AdminProfile;
