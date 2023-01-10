import { useMutation, useQueryClient } from 'react-query';
import { http } from '../../../../../api/http';

const deleteService = async (id: string) => {
  const token = localStorage.getItem('token');
  const { data } = await http.delete(`/barberservice/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => {
      return deleteService(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getBarber']);
      },
    }
  );
};
