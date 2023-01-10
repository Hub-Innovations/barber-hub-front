import { useMutation, useQueryClient } from 'react-query';
import { http } from '../../../../api/http';

const addEvent = async (payload: object) => {
  const token = localStorage.getItem('token');
  console.log('%c⧭', 'color: #86bf60', 'qualquer coisa');
  const { data } = await http.post(`/event`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddEvent = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: object) => {
      return addEvent(payload);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getBarber']);
      },
    }
  );
};
