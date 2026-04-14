import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HeartIcon,
  MapPinIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  Share2Icon,
  StarIcon,
  UserIcon,
} from '@/components/common/icons';
import { GlassSegmentedControl } from '@/components/glass/glass-segmented-control';
import { ROUTE_PATHS } from '@/constants/routes';
import { useFollowingFeedQuery } from '@/features/following/hooks/use-following-feed-query';
import type { FollowingFeedType } from '@/types';

const tabs: { label: string; value: FollowingFeedType }[] = [
  { label: '全部', value: 'all' },
  { label: '笔记', value: 'notes' },
  { label: '店铺', value: 'shops' },
];

export function FollowingFeedSection() {
  const navigate = useNavigate();
  const followingQuery = useFollowingFeedQuery();
  const [filter, setFilter] = useState<FollowingFeedType>('all');

  const items = useMemo(() => {
    const list = followingQuery.data?.items ?? [];

    if (filter === 'all') {
      return list;
    }

    return list.filter((item) => (filter === 'notes' ? item.type === '笔记' : item.type === '店铺'));
  }, [filter, followingQuery.data?.items]);

  if (followingQuery.isLoading) {
    return (
      <div className="flex h-full flex-col bg-background">
        <Header filter={filter} onChange={setFilter} />
        <div className="space-y-4 bg-muted/20 py-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="mx-4 animate-pulse rounded-[16px] border border-border/40 bg-card p-4 shadow-[0_2px_16px_rgba(0,0,0,0.03)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-[42px] w-[42px] rounded-full bg-muted" />
                <div className="flex flex-col gap-[6px]">
                  <div className="h-3.5 w-24 rounded bg-muted" />
                  <div className="h-2.5 w-16 rounded bg-muted" />
                </div>
              </div>
              <div className="mb-2 h-4 w-3/4 rounded bg-muted" />
              <div className="mb-4 h-3 w-full rounded bg-muted" />
              <div className="mb-4 aspect-[4/3] w-full rounded-[14px] bg-muted" />
              <div className="flex items-center gap-6 border-t border-border/40 pt-3">
                <div className="h-4 w-10 rounded bg-muted" />
                <div className="h-4 w-10 rounded bg-muted" />
                <div className="ml-auto h-4 w-10 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (followingQuery.isError) {
    return (
      <div className="flex h-full items-center justify-center bg-background p-6">
        <div className="rounded-[18px] border border-red-200 bg-white px-4 py-5 text-center text-sm text-red-600 shadow-sm">
          {followingQuery.error?.message ?? '关注动态加载失败'}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      <Header filter={filter} onChange={setFilter} />

      <div className="relative flex-1 overflow-y-auto bg-muted/20 pb-[90px] no-scrollbar">
        {items.length === 0 ? (
          <div className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center">
            <div className="mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-full border border-border/40 bg-muted/60 shadow-inner">
              <UserIcon className="text-text-tertiary" size={36} />
            </div>
            <h3 className="mb-[6px] text-[18px] font-bold tracking-tight text-text-primary">还没有关注的人</h3>
            <p className="mb-8 max-w-[240px] text-[14px] leading-relaxed text-text-secondary">
              去首页发现更多精彩的探店内容，关注有趣的达人吧
            </p>
            <button
              className="rounded-full border border-border/10 bg-primary px-8 py-[12px] text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(74,93,90,0.2)] transition-all active:scale-95"
              onClick={() => navigate(ROUTE_PATHS.home)}
              type="button"
            >
              去首页发现
            </button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {items.map((feed) => (
              <div
                key={feed.id}
                className="motion-fade-up motion-soft-scale mx-4 overflow-hidden rounded-[16px] border border-border/40 bg-card shadow-[0_2px_16px_rgba(0,0,0,0.03)]"
              >
                <div className="flex items-center justify-between p-4 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      alt={feed.author.name}
                      className="h-[42px] w-[42px] rounded-full border border-border/40 object-cover shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                      src={feed.author.avatarUrl}
                    />
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-[15px] font-bold tracking-tight text-text-primary">{feed.author.name}</span>
                      <span className="text-[12px] font-medium text-text-tertiary">{feed.timeLabel}</span>
                    </div>
                  </div>
                  <button className="mr-[-8px] p-2 text-text-tertiary transition-colors active:scale-90" type="button">
                    <MoreHorizontalIcon size={20} />
                  </button>
                </div>

                <Link className="block px-4 pb-3 transition-opacity active:opacity-70" to={ROUTE_PATHS.noteDetail(feed.id)}>
                  <h3 className="mb-1.5 line-clamp-2 text-[16px] font-bold leading-[24px] text-text-primary">
                    {feed.title}
                  </h3>
                  <p className="line-clamp-1 text-[14px] leading-[22px] text-text-secondary">{feed.content}</p>
                </Link>

                <Link className="block px-4 pb-3 transition-opacity active:opacity-70" to={ROUTE_PATHS.noteDetail(feed.id)}>
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-[14px] border border-border/40 bg-muted">
                    <img alt={feed.title} className="h-full w-full object-cover" src={feed.imageUrl} />
                  </div>
                </Link>

                {feed.shopInfo ? (
                  <div className="mb-3 px-4">
                    <div className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-border/40 bg-muted/80 px-3 py-[6px]">
                      <MapPinIcon className="shrink-0 text-primary/80" size={12} />
                      <span className="truncate text-[12px] font-bold text-text-secondary">{feed.shopInfo.name}</span>
                      <span className="mx-0.5 h-[3px] w-[3px] shrink-0 rounded-full bg-border" />
                      <span className="shrink-0 text-[11px] font-medium text-text-tertiary">{feed.shopInfo.city}</span>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center justify-between border-t border-border/40 bg-muted/10 px-5 py-[14px]">
                  <div className="flex items-center gap-6 text-[13px] font-bold text-text-tertiary">
                    <button className="group flex items-center gap-1.5 transition-colors hover:text-primary" type="button">
                      <HeartIcon className={feed.stats.isLiked ? 'fill-current text-primary' : 'group-hover:text-primary'} size={20} />
                      <span className={feed.stats.isLiked ? 'text-primary' : ''}>{feed.stats.likes}</span>
                    </button>
                    <button className="group flex items-center gap-1.5 transition-colors hover:text-text-primary" type="button">
                      <MessageSquareIcon className="group-hover:text-text-primary" size={18} />
                      <span>{feed.stats.comments}</span>
                    </button>
                    <button className="group flex items-center gap-1.5 transition-colors hover:text-warning" type="button">
                      <StarIcon className="group-hover:text-warning" size={19} />
                      <span>{feed.stats.favorites}</span>
                    </button>
                  </div>
                  <button className="text-text-tertiary transition-colors active:scale-95" type="button">
                    <Share2Icon size={18} />
                  </button>
                </div>
              </div>
            ))}
            <div className="py-6 text-center text-[12px] font-bold tracking-widest text-text-tertiary">- 没有更多动态了 -</div>
          </div>
        )}
      </div>
    </div>
  );
}

interface HeaderProps {
  filter: FollowingFeedType;
  onChange: (value: FollowingFeedType) => void;
}

function Header({ filter, onChange }: HeaderProps) {
  return (
    <div className="glass-float sticky top-0 z-40 pt-safe shadow-sm">
      <div className="relative flex items-center justify-center px-4 py-3">
        <span className="text-[17px] font-bold tracking-widest text-text-primary">关注</span>
      </div>
      <div className="mx-auto w-full max-w-[320px] px-5 pb-3 pt-1">
        <GlassSegmentedControl
          className="w-full"
          onChange={onChange}
          optionClassName="text-[13px]"
          options={tabs}
          value={filter}
        />
      </div>
    </div>
  );
}
