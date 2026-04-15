import type { NoteComment, NoteDetailData } from "@/types/note";
import type { LinkedStoreData, PublishStoreOption } from "@/types/shop";
import type { ApiEnvelope, ApiListResponse } from "@/types/api";
import { apiRequest } from "@/api/client";

export interface NoteDetailResponse {
  comments: ApiListResponse<NoteComment>;
  note: NoteDetailData;
  store: LinkedStoreData;
}

export interface PublishNotePayload {
  content: string;
  images: string[];
  recommended: boolean;
  store?: PublishStoreOption | null;
  title: string;
}

export function getNoteDetail(noteId: string) {
  return apiRequest<ApiEnvelope<NoteDetailResponse>>(`/api/notes/${noteId}`);
}

export function publishNote(payload: PublishNotePayload) {
  return apiRequest<ApiEnvelope<{ id: string }>>("/api/notes", {
    body: payload,
    method: "POST",
  });
}
