import { useQuery } from '@tanstack/react-query';
import { homeApi } from '@/api/modules';
import { queryKeys } from '@/constants/query-keys';

export function useHomeFeedQuery() {
  return useQuery({
    queryKey: queryKeys.home.feed,
    queryFn: () => homeApi.fetchHomeFeed(),
  });
}
