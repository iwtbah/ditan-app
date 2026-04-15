import type { MasonryNoteData } from "@/types/note";
import type { StoreCoupon, StoreDetailData, StoreDish, StoreReview } from "@/types/shop";
import type { ApiEnvelope, ApiListResponse } from "@/types/api";
import { apiRequest } from "@/api/client";

export interface ShopDetailResponse {
  allNotes: ApiListResponse<MasonryNoteData>;
  coupons: StoreCoupon[];
  dishes: StoreDish[];
  reviews: StoreReview[];
  selectedNotes: MasonryNoteData[];
  store: StoreDetailData;
}

export function getShopDetail(shopId: string) {
  return apiRequest<ApiEnvelope<ShopDetailResponse>>(`/api/shops/${shopId}`);
}
