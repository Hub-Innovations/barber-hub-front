import React from 'react';
import * as Styled from '../../styles/Admin/customers';
import AdminDrawer from '../../components/BarberAdmin/Drawer';
import AdminHeader from '../../components/BarberAdmin/Header';

function AdminCustomers() {
  return (
    <>
      <AdminHeader />
      <AdminDrawer />
      <Styled.CustomersTitle>
        Here is the Component the all customers
      </Styled.CustomersTitle>
    </>
  );
}

export default AdminCustomers;
