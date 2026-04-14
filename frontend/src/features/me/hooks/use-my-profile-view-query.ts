import { useQuery } from '@tanstack/react-query';
import { socialApi } from '@/api/modules';
import { queryKeys } from '@/constants/query-keys';

export function useMyProfileViewQuery() {
  return useQuery({
    queryKey: queryKeys.social.myProfileView,
    queryFn: () => socialApi.fetchMyProfileView(),
  });
}
