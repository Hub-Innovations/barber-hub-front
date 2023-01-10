import { useMutation, useQuery, useQueryClient } from 'react-query';
import { http } from '../../../../../api/http';

const getBarberServices = async () => {
  const token = localStorage.getItem('token');
  const { data } = await http.get(`/barberservice`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetBarberServices = () => {
  return useQuery(['getBarber'], getBarberServices);
};
