import { useMutation, useQueryClient } from 'react-query';
import { http } from '../../../../../api/http';

const updateService = async (payload: object) => {
  const token = localStorage.getItem('token');
  const { data } = await http.put(`/barberservice`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: object) => {
      return updateService(payload);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getBarber']);
      },
    }
  );
};
