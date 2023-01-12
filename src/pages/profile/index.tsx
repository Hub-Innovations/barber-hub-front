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
import BarberRegisterServices from 'components/BarberRegister/BarberServices';

function AdminProfile() {
  return (
    <>
      <AdminHeader />
      <AdminDrawer />
      <Styled.ProfileContainer>
        <Tabs isFitted colorScheme="orange" variant="soft-rounded">
          <TabList>
            <Tab>
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
            <TabPanel>
              <BarberRegisterServices />
            </TabPanel>
            <TabPanel>3</TabPanel>
          </TabPanels>
        </Tabs>
      </Styled.ProfileContainer>
    </>
  );
}

export default AdminProfile;
