import { withApiFallback } from "@/api/fallback";
import { useMutation } from "@tanstack/react-query";
import { publishNote, type PublishNotePayload } from "@/api/modules/notes";
import { unwrapApiEnvelope } from "@/api/client";

export function usePublishNoteMutation() {
  return useMutation({
    mutationFn: async (payload: PublishNotePayload) =>
      withApiFallback(
        async () => unwrapApiEnvelope(await publishNote(payload)),
        { id: String(Date.now()) },
      ),
  });
}
