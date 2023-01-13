import { useMutation, useQueryClient } from 'react-query';
import { http } from '../../../../api/http';

const deleteEvent = async (id: string) => {
  const token = localStorage.getItem('token');
  const { data } = await http.delete(`/event/calendar/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => {
      return deleteEvent(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getAllEvents']);
      },
    }
  );
};
