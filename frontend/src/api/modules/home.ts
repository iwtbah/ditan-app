import { request } from '@/api/client';
import { homeDiscoveryMock } from '@/mocks/home';
import type { HomeDiscoveryPayload, NoteCard, PageResponse, PaginationParams } from '@/types';

const shouldUseHomeMock = import.meta.env.DEV && import.meta.env.VITE_DISABLE_HOME_MOCK !== 'true';

export async function fetchHomeDiscovery() {
  try {
    return await request<HomeDiscoveryPayload>('/home/discovery');
  } catch (error) {
    if (shouldUseHomeMock) {
      return homeDiscoveryMock;
    }

    throw error;
  }
}

export async function fetchHomeFeed(
  params: PaginationParams = { page: 1, pageSize: 10 },
): Promise<PageResponse<NoteCard>> {
  try {
    return await request<PageResponse<NoteCard>>('/feed/recommendations', {
      params,
    });
  } catch (error) {
    if (shouldUseHomeMock) {
      const page = params.page ?? 1;
      const pageSize = params.pageSize ?? 10;
      const list = homeDiscoveryMock.notes.slice(0, pageSize);

      return {
        list,
        page,
        pageSize,
        total: homeDiscoveryMock.notes.length,
        hasMore: homeDiscoveryMock.notes.length > pageSize,
      };
    }

    throw error;
  }
}
