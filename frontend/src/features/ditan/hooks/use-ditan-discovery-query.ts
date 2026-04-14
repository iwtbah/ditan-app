import { useQuery } from '@tanstack/react-query';
import { ditanApi } from '@/api/modules';
import { queryKeys } from '@/constants/query-keys';

export function useDitanDiscoveryQuery() {
  return useQuery({
    queryKey: queryKeys.ditan.discovery,
    queryFn: () => ditanApi.fetchDitanDiscovery(),
  });
}
