import React from 'react';
import * as Styled from '../../styles/Admin/calendar';
import AdminDrawer from '../../components/BarberAdmin/Drawer';
import AdminHeader from '../../components/BarberAdmin/Header';
import { BarberCalendar } from 'components/BarberCalendar';

function AdminCalendar() {
  return (
    <>
      <AdminHeader />
      <AdminDrawer />
      <BarberCalendar />
    </>
  );
}

export default AdminCalendar;
