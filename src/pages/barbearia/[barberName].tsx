import TheFooter from 'components/TheFooter';
import TheHeader from 'components/TheHeader';
import React from 'react';
import BarberPageComponent from 'components/BarberPage';
import { Box } from '@chakra-ui/react';
import useMedia from 'hooks/useMedia';

function BarberPage() {
  const mobile = useMedia('(max-width: 800px)');

  return (
    <>
      <TheHeader />
      <Box pl={mobile ? '20px' : '70px'} pr={mobile ? '20px' : '70px'}>
        <BarberPageComponent />
      </Box>
      <TheFooter />
    </>
  );
}

export default BarberPage;
