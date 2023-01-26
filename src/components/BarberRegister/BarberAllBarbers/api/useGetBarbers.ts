import { useMutation, useQuery, useQueryClient } from 'react-query';
import { http } from '../../../../../api/http';

const getAllBarbers = async () => {
  const token = localStorage.getItem('token');
  const { data } = await http.get(`/barber`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetAllBarbers = () => {
  return useQuery(['getAllBarbers'], getAllBarbers);
};
