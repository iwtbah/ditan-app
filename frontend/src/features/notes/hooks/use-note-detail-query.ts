import { useQuery } from '@tanstack/react-query';
import { noteApi } from '@/api/modules';
import { queryKeys } from '@/constants/query-keys';

export function useNoteDetailQuery(noteId: string) {
  return useQuery({
    queryKey: queryKeys.notes.detail(noteId),
    queryFn: () => noteApi.fetchNoteDetail(noteId),
    enabled: Boolean(noteId),
  });
}
