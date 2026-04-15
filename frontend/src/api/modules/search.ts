import type { NoteCardData } from "@/types/note";
import type { ShopCardData } from "@/types/shop";
import type { ApiEnvelope, ApiListParams, ApiListResponse } from "@/types/api";
import { apiRequest } from "@/api/client";

export interface SearchQuery extends ApiListParams {
  keyword: string;
}

export function searchNotes(query: SearchQuery) {
  return apiRequest<ApiEnvelope<ApiListResponse<NoteCardData>>>("/api/search/notes", {
    query,
  });
}

export function searchShops(query: SearchQuery) {
  return apiRequest<ApiEnvelope<ApiListResponse<ShopCardData>>>("/api/search/shops", {
    query,
  });
}
