import { useQuery } from '@tanstack/react-query';
import { shopApi } from '@/api/modules';
import { queryKeys } from '@/constants/query-keys';

export function useShopDetailQuery(shopId: string) {
  return useQuery({
    queryKey: queryKeys.shops.detail(shopId),
    queryFn: () => shopApi.fetchShopDetail(shopId),
    enabled: Boolean(shopId),
  });
}
