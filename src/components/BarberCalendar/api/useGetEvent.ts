import { useMutation, useQuery, useQueryClient } from 'react-query';
import { http } from '../../../../api/http';

const getEvent = async (id: string) => {
  const token = localStorage.getItem('token');
  const { data } = await http.get(`/event/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetEvent = (id: string) => {
  return useQuery(['getEvent', id], () => getEvent(id), { enabled: false });
};
