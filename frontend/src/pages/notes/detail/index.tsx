import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/common/page-container';
import { NoteDetailSection } from '@/features/notes/components/note-detail-section';
import { usePageTitle } from '@/hooks/use-page-title';

export function NoteDetailPage() {
  const { noteId = '' } = useParams();
  usePageTitle('笔记详情');

  return (
    <PageContainer>
      <NoteDetailSection noteId={noteId} />
    </PageContainer>
  );
}
