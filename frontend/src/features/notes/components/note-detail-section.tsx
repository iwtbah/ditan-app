import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/common/section-card';
import { AsyncState } from '@/components/feedback/async-state';
import { ROUTE_PATHS } from '@/constants/routes';
import { useNoteDetailQuery } from '@/features/notes/hooks/use-note-detail-query';

interface NoteDetailSectionProps {
  noteId: string;
}

export function NoteDetailSection({ noteId }: NoteDetailSectionProps) {
  const noteQuery = useNoteDetailQuery(noteId);
  const note = noteQuery.data;

  return (
    <SectionCard title="探店笔记详情" description="复杂详情逻辑位于 feature，page 只传递 noteId。">
      <AsyncState
        error={noteQuery.error}
        isEmpty={!note}
        isError={noteQuery.isError}
        isLoading={noteQuery.isLoading}
        emptyMessage="未找到笔记详情"
      >
        <article className="space-y-5">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span>{note?.author.nickname}</span>
              <span>{note?.publishedAt}</span>
              {note?.shop ? (
                <Link className="text-brand-700" to={ROUTE_PATHS.shopDetail(note.shop.id)}>
                  {note.shop.name}
                </Link>
              ) : null}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{note?.title}</h1>
            <p className="text-sm text-slate-600">{note?.content}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(note?.imageUrls ?? []).map((imageUrl, index) => (
              <div
                key={`${imageUrl}-${index}`}
                className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400"
              >
                {imageUrl || `图片 ${index + 1}`}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {(note?.tags ?? []).map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                #{tag}
              </span>
            ))}
          </div>
        </article>
      </AsyncState>
    </SectionCard>
  );
}
