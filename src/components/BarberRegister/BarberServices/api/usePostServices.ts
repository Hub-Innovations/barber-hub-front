import { useMutation, useQueryClient } from 'react-query';
import { http } from '../../../../../api/http';

const addService = async (payload: object) => {
  const token = localStorage.getItem('token');
  const { data } = await http.post(`/barberservice`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddService = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: object) => {
      return addService(payload);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getBarber']);
      },
    }
  );
};
