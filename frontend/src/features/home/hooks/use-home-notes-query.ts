import { createListResponse, withApiFallback } from "@/api/fallback";
import { useQuery } from "@tanstack/react-query";
import { unwrapApiEnvelope } from "@/api/client";
import { getHomeNotes, type HomeFeedQuery } from "@/api/modules/home";
import { QUERY_KEYS } from "@/constants/query-keys";
import { HOME_NOTES } from "../mocks";

const homeNotesFallback = createListResponse(HOME_NOTES);

export function useHomeNotesQuery(query: HomeFeedQuery, enabled = true) {
  return useQuery({
    enabled,
    initialData: homeNotesFallback,
    queryKey: [...QUERY_KEYS.home.notes(query.category), query.contentType ?? "探店日记"] as const,
    queryFn: async () =>
      withApiFallback(
        async () => unwrapApiEnvelope(await getHomeNotes(query)),
        homeNotesFallback,
      ),
  });
}
