import { useMutation, useQueryClient } from 'react-query';
import { http } from '../../../../../api/http';

const updateBarber = async (payload: object) => {
  const token = localStorage.getItem('token');
  const { data } = await http.put(`/barber`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdateBarber = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: object) => {
      return updateBarber(payload);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllBarbers']);
      },
    }
  );
};
