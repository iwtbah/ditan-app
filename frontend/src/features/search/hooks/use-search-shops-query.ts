import { createListResponse, withApiFallback } from "@/api/fallback";
import { useQuery } from "@tanstack/react-query";
import { unwrapApiEnvelope } from "@/api/client";
import { searchShops, type SearchQuery } from "@/api/modules/search";
import { QUERY_KEYS } from "@/constants/query-keys";
import { SEARCH_SHOPS } from "../mocks";

const searchShopsFallback = createListResponse(SEARCH_SHOPS);

export function useSearchShopsQuery(query: SearchQuery, enabled = Boolean(query.keyword)) {
  return useQuery({
    enabled,
    queryKey: QUERY_KEYS.search.shops(query.keyword),
    queryFn: async () =>
      withApiFallback(
        async () => unwrapApiEnvelope(await searchShops(query)),
        searchShopsFallback,
      ),
  });
}
