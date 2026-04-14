import { useMemo, useState } from 'react';
import { NoteFeedCard } from '@/components/discovery/note-feed-card';
import { ShopListCard } from '@/components/discovery/shop-list-card';
import { MasonryGrid } from '@/components/layout/masonry-grid';
import {
  MapPinIcon,
  PenToolIcon,
  SettingsIcon,
  Share2Icon,
} from '@/components/common/icons';
import { useMyProfileViewQuery } from '@/features/me/hooks/use-my-profile-view-query';
import type { ProfileContentTab, ProfileSubFilter } from '@/types';
import { cn } from '@/utils/cn';

const mainTabs: { label: string; value: ProfileContentTab }[] = [
  { label: '笔记', value: 'notes' },
  { label: '收藏', value: 'favorites' },
  { label: '赞过', value: 'liked' },
];

const subTabs: { label: string; value: ProfileSubFilter }[] = [
  { label: '全部', value: 'all' },
  { label: '店铺', value: 'shops' },
  { label: '笔记', value: 'notes' },
];

const noteHeights = ['h-[180px]', 'h-[160px]', 'h-[180px]', 'h-[160px]'];

export function MyProfileSection() {
  const profileQuery = useMyProfileViewQuery();
  const [activeTab, setActiveTab] = useState<ProfileContentTab>('notes');
  const [subFilter, setSubFilter] = useState<ProfileSubFilter>('all');

  const content = useMemo(() => {
    const data = profileQuery.data;

    if (!data) {
      return { notes: [], shops: [] };
    }

    if (activeTab === 'notes') {
      return { notes: data.notes, shops: [] };
    }

    if (activeTab === 'favorites') {
      return {
        notes: subFilter === 'shops' ? [] : data.favoriteNotes,
        shops: subFilter === 'notes' ? [] : data.favoriteShops,
      };
    }

    return {
      notes: subFilter === 'shops' ? [] : data.likedNotes,
      shops: subFilter === 'notes' ? [] : data.likedShops,
    };
  }, [activeTab, profileQuery.data, subFilter]);

  if (profileQuery.isLoading) {
    return (
      <div className="relative flex h-full flex-col overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-muted/80 to-background" />
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3 pt-safe">
          <span className="invisible text-[16px] font-bold tracking-widest">我的</span>
          <div className="flex gap-4">
            <div className="h-6 w-6 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-6 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
        <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-[90px] no-scrollbar">
          <div className="mt-6 rounded-[20px] border border-border/40 bg-card p-5 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            <div className="mb-3 flex items-start justify-between">
              <div className="h-[84px] w-[84px] animate-pulse rounded-full bg-muted" />
              <div className="mt-10 h-8 w-24 animate-pulse rounded-full bg-muted" />
            </div>
            <div className="mb-2 h-6 w-40 animate-pulse rounded bg-muted" />
            <div className="mb-3 h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="mb-5 h-12 w-full animate-pulse rounded bg-muted" />
            <div className="grid grid-cols-3 gap-4 border-t border-border/40 pt-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-2 text-center">
                  <div className="mx-auto h-5 w-10 animate-pulse rounded bg-muted" />
                  <div className="mx-auto h-3 w-12 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <div className="flex h-full items-center justify-center bg-background p-6">
        <div className="rounded-[18px] border border-red-200 bg-white px-4 py-5 text-center text-sm text-red-600 shadow-sm">
          {profileQuery.error?.message ?? '我的页面加载失败'}
        </div>
      </div>
    );
  }

  const { profile } = profileQuery.data;

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-muted/80 to-background" />

      <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3 pt-safe">
        <span className="invisible text-[16px] font-bold tracking-widest text-text-primary">我的</span>
        <div className="flex gap-4 text-text-primary">
          <button className="transition-transform active:scale-95" type="button">
            <Share2Icon size={22} />
          </button>
          <button className="transition-transform active:scale-95" type="button">
            <SettingsIcon size={22} />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-[90px] no-scrollbar">
        <div className="relative z-20 mt-6 mb-[14px] rounded-[20px] border border-border/40 bg-card p-5 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
          <div className="mb-3 flex items-start justify-between -mt-10">
            <img
              alt={profile.nickname}
              className="h-[84px] w-[84px] rounded-full bg-muted object-cover ring-4 ring-card shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              src={profile.avatarUrl}
            />
            <button className="mt-10 flex items-center gap-1.5 rounded-full border border-border/40 bg-muted/60 px-4 py-1.5 text-[12px] font-bold text-text-primary shadow-sm transition-all active:scale-95" type="button">
              <PenToolIcon size={14} />
              <span>编辑资料</span>
            </button>
          </div>

          <h1 className="mb-[4px] text-[22px] font-bold tracking-tight text-text-primary">{profile.nickname}</h1>

          <div className="mb-[12px] flex items-center gap-[6px] text-[12px] font-medium text-text-tertiary">
            <div className="flex items-center gap-[2px]">
              <MapPinIcon size={12} />
              <span>{profile.city}</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-bold text-primary/90">{profile.badge}</span>
          </div>

          <p className="mb-5 max-w-[90%] text-[14px] leading-[20px] text-text-secondary">{profile.bio}</p>

          <div className="flex gap-8 border-t border-border/40 pt-4">
            <StatBlock label="关注" value="128" />
            <StatBlock label="粉丝" value="3.4k" />
            <StatBlock label="获赞与收藏" value="12.5k" />
          </div>
        </div>

        <div className="flex min-h-[500px] flex-col overflow-hidden rounded-[20px] border border-border/40 bg-card shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
          <div className="flex border-b border-border/40 px-2 pt-2 text-[15px] font-bold">
            {mainTabs.map((tab) => (
              <button
                key={tab.value}
                className={cn(
                  'relative flex-1 py-3 transition-colors',
                  activeTab === tab.value ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary',
                )}
                onClick={() => setActiveTab(tab.value)}
                type="button"
              >
                {tab.label}
                {tab.value === 'notes' ? ' (12)' : tab.value === 'favorites' ? ' (45)' : ' (102)'}
                {activeTab === tab.value ? (
                  <span className="absolute inset-x-0 bottom-0 mx-auto h-[3px] w-6 rounded-t-full bg-primary" />
                ) : null}
              </button>
            ))}
          </div>

          {activeTab !== 'notes' ? (
            <div className="flex gap-[8px] border-b border-border/30 bg-muted/20 px-4 py-3">
              {subTabs.map((tab) => (
                <button
                  key={tab.value}
                  className={cn(
                    'rounded-[10px] border px-4 py-[6px] text-[12px] font-bold transition-all',
                    subFilter === tab.value
                      ? 'border-text-primary bg-text-primary text-background shadow-sm'
                      : 'border-border/60 bg-card text-text-secondary shadow-[0_1px_4px_rgba(0,0,0,0.02)]',
                  )}
                  onClick={() => setSubFilter(tab.value)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : null}

          <div className="flex-1 bg-muted/10 p-3">
            {content.notes.length > 0 ? (
              <MasonryGrid className="mb-4" gap={10}>
                {content.notes.map((note, index) => (
                  <NoteFeedCard
                    key={note.id}
                    coverClassName={noteHeights[index % noteHeights.length]}
                    note={note}
                  />
                ))}
              </MasonryGrid>
            ) : null}

            {content.shops.length > 0 ? (
              <div className="flex flex-col gap-[10px]">
                {content.shops.map((shop) => (
                  <ShopListCard key={shop.id} shop={shop} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[18px] font-bold text-text-primary">{value}</span>
      <span className="mt-[2px] text-[11px] font-medium text-text-tertiary">{label}</span>
    </div>
  );
}
