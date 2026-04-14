import { useQuery } from '@tanstack/react-query';
import { homeApi } from '@/api/modules';
import { queryKeys } from '@/constants/query-keys';

export function useHomeDiscoveryQuery() {
  return useQuery({
    queryKey: queryKeys.home.discovery,
    queryFn: () => homeApi.fetchHomeDiscovery(),
  });
}
