import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, SearchIcon } from '@/components/common/icons';
import { NoteFeedCard } from '@/components/discovery/note-feed-card';
import { GlassSegmentedControl } from '@/components/glass/glass-segmented-control';
import { ShopListCard } from '@/components/discovery/shop-list-card';
import { MasonryGrid } from '@/components/layout/masonry-grid';
import { ROUTE_PATHS } from '@/constants/routes';
import { useHomeDiscoveryQuery } from '@/features/home/hooks/use-home-discovery-query';
import type { HomeContentType } from '@/types';
import { cn } from '@/utils/cn';

const contentTypeOptions: { label: string; value: HomeContentType }[] = [
  { label: '探店日记', value: 'notes' },
  { label: '店铺', value: 'shops' },
];

const noteHeightPattern = ['h-48', 'h-64', 'h-56', 'h-40', 'h-72', 'h-48'];

export function HomeDiscoverySection() {
  const navigate = useNavigate();
  const homeQuery = useHomeDiscoveryQuery();
  const [contentType, setContentType] = useState<HomeContentType>('notes');
  const categories = homeQuery.data?.categories ?? ['推荐'];
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? '推荐');

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0] ?? '推荐');
    }
  }, [activeCategory, categories]);

  const filteredNotes = useMemo(() => {
    const notes = homeQuery.data?.notes ?? [];

    if (activeCategory === '推荐') {
      return notes;
    }

    return notes.filter((note) => note.category === activeCategory);
  }, [activeCategory, homeQuery.data?.notes]);

  const filteredShops = useMemo(() => {
    const shops = homeQuery.data?.shops ?? [];

    if (activeCategory === '推荐') {
      return shops;
    }

    return shops.filter(
      (shop) => shop.category === activeCategory || shop.tags.some((tag) => tag.label === activeCategory),
    );
  }, [activeCategory, homeQuery.data?.shops]);

  return (
    <div className="flex h-full flex-col bg-muted">
      <div className="glass-float sticky top-0 z-20 pt-safe shadow-sm">
        <div className="flex items-center gap-md px-lg py-md">
          <div className="glass-chip flex shrink-0 items-center gap-xs rounded-full px-3 py-1.5 text-body font-bold text-text-primary">
            <MapPinIcon className="text-primary" size={18} />
            <span>{homeQuery.data?.city ?? '北京'}</span>
          </div>

          <button
            className="glass-chip flex h-9 flex-1 items-center gap-sm rounded-full px-md text-left"
            onClick={() => navigate(ROUTE_PATHS.search)}
            type="button"
          >
            <SearchIcon className="text-text-tertiary" size={16} />
            <span className="text-body text-text-tertiary">搜索你想去的探店...</span>
          </button>
        </div>

        <div className="flex justify-center px-lg pb-1 pt-2">
          <GlassSegmentedControl
            className="w-[220px]"
            onChange={setContentType}
            options={contentTypeOptions}
            value={contentType}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto bg-transparent px-lg py-[10px] no-scrollbar">
          {categories.map((category) => {
            const isActive = category === activeCategory;

            return (
              <button
                key={category}
                className={cn(
                  'shrink-0 whitespace-nowrap rounded-[10px] px-[14px] py-[6px] text-[13px] font-bold transition-colors',
                  isActive
                    ? 'bg-text-primary text-background shadow-sm'
                    : 'border border-border/40 bg-card text-text-secondary',
                )}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto bg-muted px-sm pb-[104px] pt-sm">
        {homeQuery.isLoading ? (
          contentType === 'shops' ? (
            <div className="flex flex-col gap-sm">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-[16px] border border-border/40 bg-card p-3 shadow-sm"
                >
                  <div className="h-[84px] w-[84px] animate-pulse rounded-xl bg-muted" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                    </div>
                    <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-sm">
              {[0, 1].map((column) => (
                <div key={column} className="flex flex-1 flex-col gap-sm">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-[16px] border border-border/40 bg-card p-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                    >
                      <div
                        className={cn(
                          'mb-sm animate-pulse rounded-md bg-muted',
                          noteHeightPattern[(column * 3 + index) % noteHeightPattern.length],
                        )}
                      />
                      <div className="mb-2 h-4 w-[90%] animate-pulse rounded bg-muted" />
                      <div className="h-4 w-[60%] animate-pulse rounded bg-muted" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )
        ) : homeQuery.isError ? (
          <div className="flex h-full items-center justify-center">
            <div className="rounded-[18px] border border-red-200 bg-white px-4 py-5 text-center text-sm text-red-600 shadow-sm">
              首页内容加载失败，请稍后重试
            </div>
          </div>
        ) : contentType === 'shops' ? (
          filteredShops.length > 0 ? (
            <div className="flex flex-col gap-sm">
              {filteredShops.map((shop) => (
                <div key={shop.id} className="flex flex-col gap-2">
                  <ShopListCard shop={shop} />
                  {shop.recommendedNoteTitle ? (
                    <div className="ml-12 border-l-2 border-primary/20 pl-2">
                      <div className="flex items-center gap-1 text-caption text-text-secondary">
                        <span className="font-bold text-primary">推荐笔记</span>
                        <span>"{shop.recommendedNoteTitle}"</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message={`暂无${activeCategory}相关内容`} />
          )
        ) : filteredNotes.length > 0 ? (
          <MasonryGrid className="motion-fade-up" gap={10}>
            {filteredNotes.map((note, index) => (
              <NoteFeedCard
                key={note.id}
                coverClassName={noteHeightPattern[index % noteHeightPattern.length]}
                note={note}
              />
            ))}
          </MasonryGrid>
        ) : (
          <EmptyState message={`暂无${activeCategory}相关内容`} />
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  message: string;
}

function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="rounded-[18px] border border-border/50 bg-card px-5 py-6 text-center text-body text-text-secondary shadow-sm">
        {message}
      </div>
    </div>
  );
}
