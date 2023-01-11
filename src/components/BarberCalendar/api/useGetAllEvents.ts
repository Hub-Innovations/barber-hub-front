import { useMutation, useQuery, useQueryClient } from 'react-query';
import { http } from '../../../../api/http';

const getAllEvents = async () => {
  const token = localStorage.getItem('token');
  const { data } = await http.get(`/event/getBarbershopCalendars`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetALlEvents = () => {
  return useQuery(['getEvents'], getAllEvents);
};
