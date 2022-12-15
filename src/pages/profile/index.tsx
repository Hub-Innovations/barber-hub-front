import React from 'react';
import AdminDrawer from '../../components/BarberAdmin/Drawer';
import AdminHeader from '../../components/BarberAdmin/Header';
import * as Styled from '../../styles/Admin/profile';

function AdminProfile() {
  return (
    <>
      <AdminHeader />
      <AdminDrawer />
      <Styled.ProfileTitle>
        Here is the Component the profile / barber
      </Styled.ProfileTitle>
    </>
  );
}

export default AdminProfile;
