import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { FeedCard, ListContainer, MasonryColumns, PullEndScrollArea, ShopCard, ShopListSkeleton } from "@/components/ditan";
import type { AsyncViewState } from "@/types/common";
import type { NoteCardData } from "@/types/note";
import type { ShopCardData } from "@/types/shop";
import { HomeSkeletonNote } from "./home-skeleton-note";

type HomeFeedProps = {
  activeCategory: string;
  contentType: string;
  notes: NoteCardData[];
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

export const HomeFeed = ({
  activeCategory,
  contentType,
  notes,
  onRetry,
  shops,
  state,
}: HomeFeedProps) => {
  return (
    <PullEndScrollArea
      enabled={state === "Normal"}
      wrapperClassName="flex-1 relative overflow-hidden bg-muted"
      endHintBottomClassName="bottom-[92px]"
      scrollClassName="h-full overflow-y-auto no-scrollbar overscroll-y-contain px-sm pt-sm pb-[90px] relative"
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
          >
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
