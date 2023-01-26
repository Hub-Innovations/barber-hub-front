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
  Box,
  Alert,
  AlertIcon,
  Text,
  useToast,
} from '@chakra-ui/react';
import BarberRegisterServices from 'components/BarberRegister/BarberServices';
import { useGetCheckRegisterBarber } from 'components/BarberRegister/BarberContact/api/useGetCheckRegisterBarber';
import { errorDefaultToast } from 'helpers/Toast/Messages/Default';
import BarberAllBarbers from 'components/BarberRegister/BarberAllBarbers';

function AdminProfile() {
  const checkBarberIsRegister = useGetCheckRegisterBarber();
  const [showMessageRequiredRegister, setShowMessageRequiredRegister] =
    React.useState(true);
  const toast = useToast();

  React.useEffect(() => {
    if (checkBarberIsRegister.isError) {
      // @ts-ignore
      if (checkBarberIsRegister.error.response.status === 403) {
        setShowMessageRequiredRegister(true);
      } else {
        setShowMessageRequiredRegister(false);
        toast({ status: 'error', ...errorDefaultToast });
      }
    }
  }, [checkBarberIsRegister.isError, checkBarberIsRegister.error, toast]);

  React.useEffect(() => {
    if (checkBarberIsRegister.isSuccess) {
      setShowMessageRequiredRegister(false);
    }
  }, [checkBarberIsRegister.isSuccess]);
  return (
    <>
      <AdminHeader />
      <AdminDrawer />
      <Styled.ProfileContainer>
        {showMessageRequiredRegister && (
          <Box mb="10">
            <Alert status="warning">
              <AlertIcon />
              <Text
                fontFamily="Roboto, sans-serif"
                fontSize="16px"
                lineHeight="1.4"
                color="#000000"
                fontWeight="bold"
              >
                Para prosseguir para os próximos steps, você precisa concluir o
                cadastro da sua barbearia, e registar as informações iniciais do
                primeiro step.
              </Text>
            </Alert>
          </Box>
        )}

        <Tabs isFitted colorScheme="orange" variant="soft-rounded">
          <TabList>
            <Tab>
              <Styled.TabLabel>Contato</Styled.TabLabel>
            </Tab>
            <Tab isDisabled={showMessageRequiredRegister}>
              <Styled.TabLabel>Serviços</Styled.TabLabel>
            </Tab>
            <Tab isDisabled={showMessageRequiredRegister}>
              <Styled.TabLabel>Logo</Styled.TabLabel>
            </Tab>
            <Tab isDisabled={showMessageRequiredRegister}>
              <Styled.TabLabel>Barbeiros</Styled.TabLabel>
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
            <TabPanel>
              <BarberAllBarbers />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Styled.ProfileContainer>
    </>
  );
}

export default AdminProfile;
