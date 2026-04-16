import { createListResponse, withApiFallback } from "@/api/fallback";
import { useQuery } from "@tanstack/react-query";
import { unwrapApiEnvelope } from "@/api/client";
import { searchNotes, type SearchQuery } from "@/api/modules/search";
import { QUERY_KEYS } from "@/constants/query-keys";
import { SEARCH_NOTES } from "../mocks";

const searchNotesFallback = createListResponse(SEARCH_NOTES);

export function useSearchNotesQuery(query: SearchQuery, enabled = Boolean(query.keyword)) {
  return useQuery({
    enabled,
    initialData: searchNotesFallback,
    queryKey: QUERY_KEYS.search.notes(query.keyword),
    queryFn: async () =>
      withApiFallback(
        async () => unwrapApiEnvelope(await searchNotes(query)),
        searchNotesFallback,
      ),
  });
}
