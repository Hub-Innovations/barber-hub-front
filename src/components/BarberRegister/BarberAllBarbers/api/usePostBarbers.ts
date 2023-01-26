import { useMutation, useQueryClient } from 'react-query';
import { http } from '../../../../../api/http';

const addBarber = async (payload: object) => {
  const token = localStorage.getItem('token');
  const { data } = await http.post(`/barber`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddBarber = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: object) => {
      return addBarber(payload);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllBarbers']);
      },
    }
  );
};
