import { useDeferredValue, useTransition } from 'react';
import { AsyncState } from '@/components/feedback/async-state';
import { SectionCard } from '@/components/common/section-card';
import { useSearchResultsQuery } from '@/features/search/hooks/use-search-results-query';
import { useSearchStore } from '@/stores/search-store';
import type { SearchTab } from '@/types';
import { cn } from '@/utils/cn';

const tabs: { label: string; value: SearchTab }[] = [
  { label: '全部', value: 'all' },
  { label: '店铺', value: 'shops' },
  { label: '笔记', value: 'notes' },
  { label: '用户', value: 'users' },
];

export function SearchPanel() {
  const [isPending, startTransition] = useTransition();
  const filters = useSearchStore((state) => state.filters);
  const setKeyword = useSearchStore((state) => state.setKeyword);
  const setTab = useSearchStore((state) => state.setTab);
  const deferredKeyword = useDeferredValue(filters.keyword);
  const searchQuery = useSearchResultsQuery({
    ...filters,
    keyword: deferredKeyword,
  });

  return (
    <div className="space-y-6">
      <SectionCard
        title="搜索骨架"
        description="搜索条件保存在 Zustand，请求结果交由 TanStack Query 管理。"
      >
        <div className="space-y-4">
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-brand-400"
            onChange={(event) => {
              const nextKeyword = event.target.value;
              startTransition(() => {
                setKeyword(nextKeyword);
              });
            }}
            placeholder="搜索店铺、探店笔记、用户"
            value={filters.keyword}
          />

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition',
                  filters.tab === tab.value
                    ? 'bg-brand-600 text-white'
                    : 'border border-slate-200 bg-white text-slate-500',
                )}
                onClick={() => setTab(tab.value)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isPending ? <p className="text-xs text-slate-400">正在同步本地搜索条件...</p> : null}
        </div>
      </SectionCard>

      <SectionCard title="搜索结果" description="空关键字时不发请求，避免无意义的首页级远程查询。">
        {filters.keyword.trim().length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
            请输入关键字开始搜索
          </div>
        ) : (
          <AsyncState
            error={searchQuery.error}
            isEmpty={
              (searchQuery.data?.shops.length ?? 0) +
                (searchQuery.data?.notes.length ?? 0) +
                (searchQuery.data?.users.length ?? 0) ===
              0
            }
            isError={searchQuery.isError}
            isLoading={searchQuery.isLoading}
            emptyMessage="没有匹配的搜索结果"
          >
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-900">店铺</h3>
                {(searchQuery.data?.shops ?? []).map((shop) => (
                  <div key={shop.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                    <div className="font-medium text-slate-900">{shop.name}</div>
                    <div className="mt-1 text-slate-500">
                      {shop.category} · {shop.district}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-900">笔记</h3>
                {(searchQuery.data?.notes ?? []).map((note) => (
                  <div key={note.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                    <div className="font-medium text-slate-900">{note.title}</div>
                    <div className="mt-1 text-slate-500">{note.excerpt}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-900">用户</h3>
                {(searchQuery.data?.users ?? []).map((user) => (
                  <div key={user.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                    <div className="font-medium text-slate-900">{user.nickname}</div>
                    <div className="mt-1 text-slate-500">{user.bio || '暂无简介'}</div>
                  </div>
                ))}
              </div>
            </div>
          </AsyncState>
        )}
      </SectionCard>
    </div>
  );
}
