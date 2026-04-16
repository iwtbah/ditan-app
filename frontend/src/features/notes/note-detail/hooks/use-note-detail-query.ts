import { createListResponse, withApiFallback } from "@/api/fallback";
import { useQuery } from "@tanstack/react-query";
import { unwrapApiEnvelope } from "@/api/client";
import { getNoteDetail } from "@/api/modules/notes";
import { QUERY_KEYS } from "@/constants/query-keys";
import {
  NOTE_DETAIL_INITIAL_COMMENTS,
  NOTE_DETAIL_MOCK_NOTE,
  NOTE_DETAIL_MOCK_STORE,
} from "../../mocks";

const noteDetailFallback = {
  comments: createListResponse(NOTE_DETAIL_INITIAL_COMMENTS),
  note: NOTE_DETAIL_MOCK_NOTE,
  store: NOTE_DETAIL_MOCK_STORE,
};

export function useNoteDetailQuery(noteId: string, enabled = Boolean(noteId)) {
  return useQuery({
    enabled,
    initialData: noteDetailFallback,
    queryKey: QUERY_KEYS.notes.detail(noteId),
    queryFn: async () =>
      withApiFallback(
        async () => unwrapApiEnvelope(await getNoteDetail(noteId)),
        noteDetailFallback,
      ),
  });
}
