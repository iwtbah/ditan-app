import { request } from '@/api/client';
import { getMockSearchResults } from '@/mocks/search';
import type { SearchFilters, SearchResult } from '@/types';

const shouldUseSearchMock = import.meta.env.DEV && import.meta.env.VITE_DISABLE_SEARCH_MOCK !== 'true';

export async function fetchSearchResults(filters: SearchFilters) {
  try {
    return await request<SearchResult>('/search', {
      params: filters,
      withAuth: false,
    });
  } catch (error) {
    if (shouldUseSearchMock) {
      return getMockSearchResults(filters);
    }

    throw error;
  }
}
