import { request } from '@/api/client';
import type { SearchFilters, SearchResult } from '@/types';

export function fetchSearchResults(filters: SearchFilters) {
  return request<SearchResult>('/search', {
    params: filters,
    withAuth: false,
  });
}
