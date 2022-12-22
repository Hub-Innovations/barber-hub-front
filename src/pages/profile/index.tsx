import React from 'react';
import AdminDrawer from '../../components/BarberAdmin/Drawer';
import AdminHeader from '../../components/BarberAdmin/Header';
import * as Styled from '../../styles/Admin/profile';
import BarberRegisterContact from '../../components/BarberRegister/BarberContact';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

function AdminProfile() {
  return (
    <>
      <AdminHeader />
      <AdminDrawer />
      <Styled.ProfileContainer>
        <Tabs colorScheme="pink">
          <TabList>
            <Tab>Contato / Endereço</Tab>
            <Tab>Serviços / Preços</Tab>
            <Tab isDisabled>Logo / Banner</Tab>
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
