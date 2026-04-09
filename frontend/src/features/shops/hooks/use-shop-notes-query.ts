import { useQuery } from '@tanstack/react-query';
import { shopApi } from '@/api/modules';
import { queryKeys } from '@/constants/query-keys';

export function useShopNotesQuery(shopId: string) {
  return useQuery({
    queryKey: queryKeys.shops.notes(shopId),
    queryFn: () => shopApi.fetchShopNotes(shopId),
    enabled: Boolean(shopId),
  });
}
