import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { FeedCard, ListContainer, MasonryColumns, PullEndScrollArea, ShopCard, ShopListSkeleton } from "@/components/ditan";
import type { AsyncViewState } from "@/types/common";
import type { NoteCardData } from "@/types/note";
import type { ShopCardData } from "@/types/shop";
import { HomeSkeletonNote } from "./home-skeleton-note";

type HomeFeedProps = {
  activeCategory: string;
  contentType: string;
  notes: NoteCardData[];
  onScrollChange?: (scrollTop: number) => void;
  onSwipeMode?: (direction: "left" | "right") => void;
  onRetry?: () => void;
  shops: ShopCardData[];
  state: AsyncViewState;
};

const renderSkeleton = (contentType: string) => {
  if (contentType === "店铺") {
    return <ShopListSkeleton />;
  }

  return (
    <MasonryColumns
      items={[
        { id: "skeleton-1", height: "h-48" },
        { id: "skeleton-2", height: "h-56" },
        { id: "skeleton-3", height: "h-64" },
        { id: "skeleton-4", height: "h-40" },
        { id: "skeleton-5", height: "h-48" },
        { id: "skeleton-6", height: "h-56" },
      ]}
      renderItem={(item) => <HomeSkeletonNote key={item.id} height={item.height} />}
    />
  );
};

const SHOP_FEATURED_ENTRIES = [
  {
    accentClassName: "from-[#ECFFF5] via-[#F7FFFB] to-[#FFFFFF]",
    icon: TrendingUp,
    title: "好评榜单",
  },
  {
    accentClassName: "from-[#FFF1F2] via-[#FFF8F8] to-[#FFFFFF]",
    icon: TrendingDown,
    title: "避雷榜单",
  },
] as const;

export const HomeFeed = ({
  activeCategory,
  contentType,
  notes,
  onScrollChange,
  onSwipeMode,
  onRetry,
  shops,
  state,
}: HomeFeedProps) => {
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);

  return (
    <PullEndScrollArea
      enabled={state === "Normal"}
      wrapperClassName="flex-1 relative overflow-hidden bg-muted"
      endHintBottomClassName="bottom-[92px]"
      onScroll={(event) => onScrollChange?.(event.currentTarget.scrollTop)}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        if (!touch) return;
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(event) => {
        const start = touchStartRef.current;
        const touch = event.changedTouches[0];
        touchStartRef.current = null;

        if (!start || !touch) return;

        const deltaX = touch.clientX - start.x;
        const deltaY = touch.clientY - start.y;

        if (Math.abs(deltaX) < 58 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
          return;
        }

        onSwipeMode?.(deltaX < 0 ? "left" : "right");
      }}
      scrollClassName="h-full overflow-y-auto no-scrollbar overscroll-y-contain px-sm pt-2 pb-[90px] relative"
    >
      <ListContainer
        state={state}
        loadingComponent={renderSkeleton(contentType)}
        emptyMessage={`暂无${activeCategory}相关内容`}
        errorMessage="首页内容加载失败"
        onRetry={onRetry}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={contentType + activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-4"
          >
            <HomeFeaturedEntries contentType={contentType} />

            {contentType === "探店日记" ? (
              <MasonryColumns
                items={notes}
                renderItem={(note, index, columnIndex) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + columnIndex * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <FeedCard
                      id={note.id}
                      title={note.title}
                      author={note.author}
                      likes={note.likes}
                      liked={note.liked}
                      image={note.image}
                      imageClassName={note.height}
                    />
                  </motion.div>
                )}
              />
            ) : (
              <div className="flex flex-col gap-sm">
                {shops.map((shop, index) => (
                  <motion.div
                    key={shop.id}
                    className="flex flex-col gap-2"
                    initial={{ opacity: 0, scale: 0.97, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <ShopCard
                      id={shop.id}
                      name={shop.name}
                      rating={shop.rating}
                      price={shop.price}
                      recommendation={shop.recommendation}
                      image={shop.image}
                      distance={shop.distance}
                      tags={shop.tags}
                    />
                    <div className="ml-12 pl-2 border-l-2 border-primary/20">
                      <div className="text-caption text-text-secondary flex items-center gap-1">
                        <span className="font-bold text-primary">推荐笔记</span>
                        <span>"周末必须去打卡的绝美圣地..."</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </ListContainer>
    </PullEndScrollArea>
  );
};

type HomeFeaturedEntriesProps = {
  contentType: string;
};

const HomeFeaturedEntries = ({ contentType }: HomeFeaturedEntriesProps) => {
  if (contentType === "店铺") {
    return (
      <section className="grid grid-cols-2 gap-3 px-1">
        {SHOP_FEATURED_ENTRIES.map((entry, index) => {
          const Icon = entry.icon;

          return (
            <button
              key={entry.title}
              type="button"
              className={`relative overflow-hidden rounded-[22px] border border-border/40 bg-gradient-to-br ${entry.accentClassName} px-4 py-4 text-left shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-transform active:scale-[0.98]`}
            >
              <div className="absolute right-3 top-3 h-16 w-16 rounded-full bg-white/70 blur-2xl" />
              <div className="absolute bottom-3 right-3 flex items-end gap-1.5 opacity-55">
                {[18, 26, 14, 30].map((height, barIndex) => (
                  <span
                    key={`${entry.title}-${barIndex}`}
                    className="w-2 rounded-full bg-text-primary/18"
                    style={{ height }}
                  />
                ))}
              </div>
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-bold text-text-secondary ring-1 ring-border/40">
                    榜单入口
                  </span>
                  <h3 className="mt-3 text-[18px] font-bold tracking-tight text-text-primary">
                    {entry.title}
                  </h3>
                </div>
                <div className="rounded-2xl bg-background/82 p-2.5 text-text-primary shadow-sm ring-1 ring-border/30">
                  <Icon size={18} strokeWidth={2.3} />
                </div>
              </div>
            </button>
          );
        })}
      </section>
    );
  }

  return null;
};
