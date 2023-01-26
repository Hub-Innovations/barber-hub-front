import { useMutation, useQueryClient } from 'react-query';
import { http } from '../../../../../api/http';

const deleteBarber = async (id: string) => {
  const token = localStorage.getItem('token');
  const { data } = await http.delete(`/barber/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useDeleteBarber = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => {
      return deleteBarber(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllBarbers']);
      },
    }
  );
};
