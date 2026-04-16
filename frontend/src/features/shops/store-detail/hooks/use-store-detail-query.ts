import { createListResponse, withApiFallback } from "@/api/fallback";
import { useQuery } from "@tanstack/react-query";
import { unwrapApiEnvelope } from "@/api/client";
import { getShopDetail } from "@/api/modules/shops";
import { QUERY_KEYS } from "@/constants/query-keys";
import {
  STORE_DETAIL_ALL_NOTES,
  STORE_DETAIL_COUPONS,
  STORE_DETAIL_DISHES,
  STORE_DETAIL_REVIEWS,
  STORE_DETAIL_SELECTED_NOTES,
  STORE_DETAIL_STORE,
} from "../../mocks";

const storeDetailFallback = {
  allNotes: createListResponse(STORE_DETAIL_ALL_NOTES),
  coupons: STORE_DETAIL_COUPONS,
  dishes: STORE_DETAIL_DISHES,
  reviews: STORE_DETAIL_REVIEWS,
  selectedNotes: STORE_DETAIL_SELECTED_NOTES,
  store: STORE_DETAIL_STORE,
};

export function useStoreDetailQuery(shopId: string, enabled = Boolean(shopId)) {
  return useQuery({
    enabled,
    queryKey: QUERY_KEYS.shops.detail(shopId),
    queryFn: async () =>
      withApiFallback(
        async () => unwrapApiEnvelope(await getShopDetail(shopId)),
        storeDetailFallback,
      ),
  });
}
