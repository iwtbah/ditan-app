import { useQuery } from '@tanstack/react-query';
import { searchApi } from '@/api/modules';
import { queryKeys } from '@/constants/query-keys';
import type { SearchFilters } from '@/types';

export function useSearchResultsQuery(filters: SearchFilters) {
  return useQuery({
    queryKey: queryKeys.search.results(filters),
    queryFn: () => searchApi.fetchSearchResults(filters),
    enabled: filters.keyword.trim().length > 0,
  });
}
