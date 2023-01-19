import { useMutation, useQuery, useQueryClient } from 'react-query';
import { http } from '../../../../../api/http';

const checkBarberIsRegister = async () => {
  const token = localStorage.getItem('token');
  const { data } = await http.get(`/barbershop/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetCheckRegisterBarber = () => {
  return useQuery(['checkBarberIsRegister'], checkBarberIsRegister);
};
