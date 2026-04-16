import { createListResponse, withApiFallback } from "@/api/fallback";
import { useQuery } from "@tanstack/react-query";
import { unwrapApiEnvelope } from "@/api/client";
import { getHomeShops, type HomeFeedQuery } from "@/api/modules/home";
import { QUERY_KEYS } from "@/constants/query-keys";
import { HOME_SHOPS } from "../mocks";

const homeShopsFallback = createListResponse(HOME_SHOPS);

export function useHomeShopsQuery(query: HomeFeedQuery, enabled = true) {
  return useQuery({
    enabled,
    initialData: homeShopsFallback,
    queryKey: [...QUERY_KEYS.home.shops(query.category), query.contentType ?? "店铺"] as const,
    queryFn: async () =>
      withApiFallback(
        async () => unwrapApiEnvelope(await getHomeShops(query)),
        homeShopsFallback,
      ),
  });
}
