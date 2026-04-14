import { useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, SearchIcon } from '@/components/common/icons';
import { NoteFeedCard } from '@/components/discovery/note-feed-card';
import { GlassSegmentedControl } from '@/components/glass/glass-segmented-control';
import { MasonryGrid } from '@/components/layout/masonry-grid';
import { useSearchResultsQuery } from '@/features/search/hooks/use-search-results-query';
import { SearchShopResultCard } from '@/features/search/components/search-shop-result-card';
import { useSearchStore } from '@/stores/search-store';
import type { SearchTab } from '@/types';

const tabs: { label: string; value: SearchTab }[] = [
  { label: '日记', value: 'notes' },
  { label: '店铺', value: 'shops' },
];

const noteHeights = ['h-48', 'h-40', 'h-56', 'h-44'];

export function SearchPanel() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const filters = useSearchStore((state) => state.filters);
  const submittedKeyword = useSearchStore((state) => state.submittedKeyword);
  const history = useSearchStore((state) => state.history);
  const setKeyword = useSearchStore((state) => state.setKeyword);
  const setTab = useSearchStore((state) => state.setTab);
  const submitSearch = useSearchStore((state) => state.submitSearch);
  const searchQuery = useSearchResultsQuery({
    ...filters,
    keyword: submittedKeyword,
  });
  const hasSearched = submittedKeyword.trim().length > 0;
  const isEmpty =
    (searchQuery.data?.shops.length ?? 0) + (searchQuery.data?.notes.length ?? 0) + (searchQuery.data?.users.length ?? 0) === 0;

  return (
    <div className="flex h-full flex-col bg-muted">
      <div className="glass-float sticky top-0 z-10 flex flex-col pt-safe shadow-sm">
        <div className="flex items-center gap-sm px-sm py-md">
          <button
            className="rounded-full p-sm text-text-secondary transition-colors active:bg-muted"
            onClick={() => navigate(-1)}
            type="button"
          >
            <ChevronLeftIcon size={24} />
          </button>

          <form
            className="glass-chip flex h-9 flex-1 items-center gap-sm rounded-full px-md"
            onSubmit={(event) => {
              event.preventDefault();
              submitSearch();
            }}
          >
            <SearchIcon className="text-text-secondary" size={16} />
            <input
              autoFocus
              className="w-full border-none bg-transparent text-body text-text-primary outline-none placeholder:text-text-secondary"
              onChange={(event) => {
                const nextKeyword = event.target.value;
                startTransition(() => {
                  setKeyword(nextKeyword);
                });
              }}
              placeholder="搜索日记或店铺..."
              value={filters.keyword}
            />
          </form>

          <button
            className="px-md py-sm text-body font-bold text-text-primary transition-colors active:text-primary"
            onClick={() => submitSearch()}
            type="button"
          >
            搜索
          </button>
        </div>

        {hasSearched ? (
          <div className="px-5 pb-1 pt-sm">
            <GlassSegmentedControl
              className="mx-auto w-[180px]"
              onChange={setTab}
              options={tabs}
              value={filters.tab}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto bg-muted p-sm relative">
            <div className="mt-lg">
              <h3 className="mb-md px-sm text-caption font-bold text-text-secondary">历史搜索</h3>
              <div className="flex flex-wrap gap-md px-sm">
                {history.map((term) => (
                  <button
                    key={term}
                    className="rounded-full border border-border bg-card px-md py-xs text-caption text-text-primary transition-colors active:bg-muted"
                    onClick={() => {
                      setKeyword(term);
                      submitSearch(term);
                    }}
                    type="button"
                  >
                    {term}
                  </button>
                ))}
              </div>
              {isPending ? <p className="px-sm pt-3 text-xs text-text-tertiary">正在同步搜索输入...</p> : null}
            </div>
          </div>
        )}
      </div>

      {hasSearched ? (
        <div className="relative flex-1 overflow-y-auto bg-muted p-sm">
          {searchQuery.isLoading ? (
            filters.tab === 'shops' ? (
              <div className="mt-md flex flex-col gap-sm">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-md rounded-xl border border-border bg-card p-md"
                  >
                    <div className="h-12 w-12 animate-pulse rounded-lg bg-muted" />
                    <div className="flex flex-1 flex-col gap-xs">
                      <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-md flex gap-sm">
                {[0, 1].map((column) => (
                  <div key={column} className="flex flex-1 flex-col gap-sm">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-lg border border-border bg-card p-md shadow-card"
                      >
                        <div
                          className={[
                            'mb-sm animate-pulse rounded-md bg-muted',
                            noteHeights[(column * 2 + index) % noteHeights.length],
                          ].join(' ')}
                        />
                        <div className="mb-2 h-4 w-[90%] animate-pulse rounded bg-muted" />
                        <div className="h-4 w-[60%] animate-pulse rounded bg-muted" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )
          ) : searchQuery.isError ? (
            <div className="mt-md rounded-[18px] border border-red-200 bg-white px-4 py-5 text-center text-sm text-red-600 shadow-sm">
              {searchQuery.error?.message ?? '加载失败'}
            </div>
          ) : isEmpty ? (
            <div className="mt-md rounded-[18px] border border-border/50 bg-card px-5 py-6 text-center text-body text-text-secondary shadow-sm">
              未找到与 "{submittedKeyword}" 相关的{filters.tab === 'shops' ? '店铺' : '日记'}
            </div>
          ) : filters.tab === 'shops' ? (
            <div className="mt-md flex flex-col gap-sm">
              {(searchQuery.data?.shops ?? []).map((shop) => (
                <SearchShopResultCard key={shop.id} shop={shop} />
              ))}
            </div>
          ) : (
            <MasonryGrid className="mt-md motion-fade-up" gap={10}>
              {(searchQuery.data?.notes ?? []).map((note, index) => (
                <NoteFeedCard
                  key={note.id}
                  coverClassName={noteHeights[index % noteHeights.length]}
                  note={{
                    ...note,
                    category: note.shop?.category ?? '搜索',
                  }}
                />
              ))}
            </MasonryGrid>
          )}
        </div>
      ) : null}
    </div>
  );
}
