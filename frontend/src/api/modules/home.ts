import type { NoteCardData } from "@/types/note";
import type { ShopCardData } from "@/types/shop";
import type { ApiEnvelope, ApiListParams, ApiListResponse } from "@/types/api";
import { apiRequest } from "@/api/client";

export interface HomeFeedQuery extends ApiListParams {
  category?: string;
  contentType?: "探店日记" | "店铺";
}

export function getHomeNotes(query: HomeFeedQuery) {
  return apiRequest<ApiEnvelope<ApiListResponse<NoteCardData>>>("/api/home/notes", {
    query,
  });
}

export function getHomeShops(query: HomeFeedQuery) {
  return apiRequest<ApiEnvelope<ApiListResponse<ShopCardData>>>("/api/home/shops", {
    query,
  });
}
