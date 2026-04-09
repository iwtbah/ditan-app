import { Link } from 'react-router-dom';
import { AsyncState } from '@/components/feedback/async-state';
import { SectionCard } from '@/components/common/section-card';
import { ROUTE_PATHS } from '@/constants/routes';
import { useHomeFeedQuery } from '@/features/home/hooks/use-home-feed-query';

export function HomeFeedSection() {
  const feedQuery = useHomeFeedQuery();
  const notes = feedQuery.data?.list ?? [];

  return (
    <SectionCard
      title="推荐探店内容"
      description="首页只负责挂载内容板块，具体接口查询和状态处理下沉到 feature。"
    >
      <AsyncState
        error={feedQuery.error}
        isEmpty={notes.length === 0}
        isError={feedQuery.isError}
        isLoading={feedQuery.isLoading}
        emptyMessage="暂无推荐内容"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {notes.map((note) => (
            <Link
              key={note.id}
              className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-brand-200 hover:bg-white"
              to={ROUTE_PATHS.noteDetail(note.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-slate-900">{note.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{note.excerpt}</p>
                </div>
                <div className="rounded-full bg-white px-2 py-1 text-xs text-slate-500">{note.likedCount} 赞</div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>{note.author.nickname}</span>
                <span>{note.publishedAt}</span>
              </div>
            </Link>
          ))}
        </div>
      </AsyncState>
    </SectionCard>
  );
}
