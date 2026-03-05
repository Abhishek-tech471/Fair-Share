import { useQuery } from '@tanstack/react-query';
import { MOCK_EXPENSES } from '../utils/helpers';

export const useExpenses = (groupId) => {
  return useQuery({
    queryKey: ['expenses', groupId],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      if (groupId) return MOCK_EXPENSES.filter(e => e.groupId === groupId);
      return MOCK_EXPENSES;
    },
  });
};
