import { request } from '@/api/client';
import type { NoteDetail } from '@/types';

export function fetchNoteDetail(noteId: string) {
  return request<NoteDetail>(`/notes/${noteId}`);
}
