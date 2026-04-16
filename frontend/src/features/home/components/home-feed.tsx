import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { FeedCard, ListContainer, ShopCard } from "@/components/ditan";
import { Skeleton } from "@/components/feedback/wireframe-ui";
import type { AsyncViewState } from "@/types/common";
import type { NoteCardData } from "@/types/note";
import type { ShopCardData } from "@/types/shop";
import { HomeSkeletonNote } from "./home-skeleton-note";

type HomeFeedProps = {
  activeCategory: string;
  appState: AsyncViewState;
  contentType: string;
  notes: NoteCardData[];
  shops: ShopCardData[];
};

const renderSkeleton = (contentType: string) => {
  if (contentType === "店铺") {
    return (
      <div className="flex flex-col gap-sm">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-card rounded-xl p-md flex items-center justify-between border border-border">
            <div className="flex items-center gap-md w-full">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div className="flex flex-col gap-xs flex-1">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-sm">
      <div className="flex-1 flex flex-col gap-sm">
        {[1, 2, 3].map((item) => (
          <HomeSkeletonNote key={`left-${item}`} height={item % 2 === 0 ? "h-64" : "h-48"} />
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-sm">
        {[4, 5, 6].map((item) => (
          <HomeSkeletonNote key={`right-${item}`} height={item % 2 !== 0 ? "h-56" : "h-40"} />
        ))}
      </div>
    </div>
  );
};

export const HomeFeed = ({ activeCategory, appState, contentType, notes, shops }: HomeFeedProps) => {
  return (
    <div className="flex-1 overflow-y-auto bg-muted p-sm relative">
      <ListContainer
        state={appState}
        loadingComponent={renderSkeleton(contentType)}
        emptyMessage={`暂无${activeCategory}相关内容`}
        errorMessage="首页内容加载失败"
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
                <div className="flex gap-sm">
                  <div className="flex-1 flex flex-col gap-sm">
                  {notes.filter((_, index) => index % 2 === 0).map((note, index) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <FeedCard
                        id={note.id}
                        title={note.title}
                        author={note.author}
                        likes={note.likes}
                        liked={note.liked}
                        imageClassName={note.height}
                      />
                    </motion.div>
                  ))}
                  </div>
                  <div className="flex-1 flex flex-col gap-sm">
                  {notes.filter((_, index) => index % 2 !== 0).map((note, index) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <FeedCard
                        id={note.id}
                        title={note.title}
                        author={note.author}
                        likes={note.likes}
                        liked={note.liked}
                        imageClassName={note.height}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
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
    </div>
  );
};
