import React from 'react';
import * as Styled from '../../styles/Admin/calendar';
import AdminDrawer from '../../components/BarberAdmin/Drawer';
import AdminHeader from '../../components/BarberAdmin/Header';
import { BarberCalendar } from 'components/BarberCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function AdminCalendar() {
  return (
    <>
      <AdminHeader />
      <AdminDrawer />
      <Styled.CalendarTitle>
        Here is the Component the calendar
      </Styled.CalendarTitle>
      <BarberCalendar />
    </>
  );
}

export default AdminCalendar;
