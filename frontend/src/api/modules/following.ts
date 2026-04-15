import type { FollowingFeedData, FollowingFeedType } from "@/types/note";
import type { ApiEnvelope, ApiListParams, ApiListResponse } from "@/types/api";
import { apiRequest } from "@/api/client";

export interface FollowingFeedQuery extends ApiListParams {
  filter?: FollowingFeedType;
}

export function getFollowingFeeds(query: FollowingFeedQuery) {
  return apiRequest<ApiEnvelope<ApiListResponse<FollowingFeedData>>>("/api/following/feeds", {
    query,
  });
}
