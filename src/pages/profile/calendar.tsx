import React from 'react';
import * as Styled from '../../styles/Admin/calendar';
import AdminDrawer from '../../components/BarberAdmin/Drawer';
import AdminHeader from '../../components/BarberAdmin/Header';

function AdminCalendar() {
  return (
    <>
      <AdminHeader />
      <AdminDrawer />
      <Styled.CalendarTitle>
        Here is the Component the calendar
      </Styled.CalendarTitle>
    </>
  );
}

export default AdminCalendar;
