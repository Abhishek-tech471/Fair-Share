import { useQuery } from '@tanstack/react-query';
import { MOCK_GROUPS } from '../utils/helpers';

export const useGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      return MOCK_GROUPS;
    },
  });
};

export const useGroup = (groupId) => {
  return useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 200));
      return MOCK_GROUPS.find(g => g.id === groupId) || null;
    },
    enabled: !!groupId,
  });
};
