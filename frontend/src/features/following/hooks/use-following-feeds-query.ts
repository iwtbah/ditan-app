import { createListResponse, withApiFallback } from "@/api/fallback";
import { useQuery } from "@tanstack/react-query";
import { unwrapApiEnvelope } from "@/api/client";
import { getFollowingFeeds, type FollowingFeedQuery } from "@/api/modules/following";
import { QUERY_KEYS } from "@/constants/query-keys";
import { FOLLOWING_FEEDS } from "../mocks";

function getFollowingFallback(query: FollowingFeedQuery) {
  const items =
    query.filter && query.filter !== "全部"
      ? FOLLOWING_FEEDS.filter((feed) => feed.type === query.filter)
      : FOLLOWING_FEEDS;

  return createListResponse(items);
}

export function useFollowingFeedsQuery(query: FollowingFeedQuery, enabled = true) {
  return useQuery({
    enabled,
    initialData: getFollowingFallback(query),
    queryKey: QUERY_KEYS.following.feeds(query.filter),
    queryFn: async () =>
      withApiFallback(
        async () => unwrapApiEnvelope(await getFollowingFeeds(query)),
        getFollowingFallback(query),
      ),
  });
}
