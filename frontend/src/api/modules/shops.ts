import { request } from '@/api/client';
import { getMockShopNotes } from '@/mocks/notes';
import { getMockShopDetail } from '@/mocks/shops';
import type { NoteCard, PageResponse, PaginationParams, ShopDetail } from '@/types';

const shouldUseDetailMock = import.meta.env.DEV && import.meta.env.VITE_DISABLE_DETAIL_MOCK !== 'true';

export async function fetchShopDetail(shopId: string) {
  try {
    return await request<ShopDetail>(`/shops/${shopId}`);
  } catch (error) {
    if (shouldUseDetailMock) {
      return getMockShopDetail(shopId);
    }

    throw error;
  }
}

export async function fetchShopNotes(
  shopId: string,
  params: PaginationParams = { page: 1, pageSize: 10 },
) {
  try {
    return await request<PageResponse<NoteCard>>(`/shops/${shopId}/notes`, {
      params,
    });
  } catch (error) {
    if (shouldUseDetailMock) {
      return getMockShopNotes(shopId);
    }

    throw error;
  }
}
