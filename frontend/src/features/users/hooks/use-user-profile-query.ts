import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/api/modules';
import { queryKeys } from '@/constants/query-keys';

export function useUserProfileQuery(userId: string) {
  return useQuery({
    queryKey: queryKeys.users.profile(userId),
    queryFn: () => userApi.fetchUserProfile(userId),
    enabled: Boolean(userId),
  });
}
