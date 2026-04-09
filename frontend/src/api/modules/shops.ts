import { request } from '@/api/client';
import type { NoteCard, PageResponse, PaginationParams, ShopDetail } from '@/types';

export function fetchShopDetail(shopId: string) {
  return request<ShopDetail>(`/shops/${shopId}`);
}

export function fetchShopNotes(shopId: string, params: PaginationParams = { page: 1, pageSize: 10 }) {
  return request<PageResponse<NoteCard>>(`/shops/${shopId}/notes`, {
    params,
  });
}
