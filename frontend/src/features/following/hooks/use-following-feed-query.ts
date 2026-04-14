import { useQuery } from '@tanstack/react-query';
import { socialApi } from '@/api/modules';
import { queryKeys } from '@/constants/query-keys';

export function useFollowingFeedQuery() {
  return useQuery({
    queryKey: queryKeys.social.following,
    queryFn: () => socialApi.fetchFollowingFeed(),
  });
}
