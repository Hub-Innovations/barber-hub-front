import { useMutation, useQuery, useQueryClient } from 'react-query';
import { http } from '../../../../api/http';

const getEvent = async (id: string | unknown) => {
  const token = localStorage.getItem('token');
  const { data } = await http.get(`/event/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetEvent = (id: string | unknown) => {
  return useQuery(['getEvent', id], () => getEvent(id), {
    enabled: false,
  });
};
