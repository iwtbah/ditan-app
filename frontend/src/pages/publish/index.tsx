import { PublishNoteEditor } from '@/features/publish/components/publish-note-editor';
import { usePageTitle } from '@/hooks/use-page-title';

export function PublishPage() {
  usePageTitle('新建笔记');

  return <PublishNoteEditor />;
}
