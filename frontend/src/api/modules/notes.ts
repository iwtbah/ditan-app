import { request } from '@/api/client';
import { getMockNoteDetail } from '@/mocks/notes';
import type { NoteDetail } from '@/types';

const shouldUseDetailMock = import.meta.env.DEV && import.meta.env.VITE_DISABLE_DETAIL_MOCK !== 'true';

export async function fetchNoteDetail(noteId: string) {
  try {
    return await request<NoteDetail>(`/notes/${noteId}`);
  } catch (error) {
    if (shouldUseDetailMock) {
      return getMockNoteDetail(noteId);
    }

    throw error;
  }
}
