import React from "react";
import { motion } from "motion/react";
import { FeedCard, ListContainer, ShopCard } from "@/components/ditan";
import type { AsyncViewState } from "@/types/common";
import type { NoteCardData } from "@/types/note";
import type { ShopCardData } from "@/types/shop";

type MeContentPanelProps = {
  activeTab: string;
  appState: AsyncViewState;
  notes: NoteCardData[];
  onRetry?: () => void;
  subFilter: string;
  shops: ShopCardData[];
  onSubFilterChange: (value: string) => void;
  onTabChange: (value: string) => void;
};

export const MeContentPanel = ({
  activeTab,
  appState,
  notes,
  onRetry,
  subFilter,
  shops,
  onSubFilterChange,
  onTabChange,
}: MeContentPanelProps) => {
  const showNotes = activeTab === "笔记" || (activeTab !== "笔记" && (subFilter === "全部" || subFilter === "笔记"));
  const showShops = activeTab !== "笔记" && (subFilter === "全部" || subFilter === "店铺");

  return (
    <section className="overflow-hidden rounded-t-[30px] border border-border/40 bg-background/94 shadow-[0_-2px_16px_rgba(0,0,0,0.03)] backdrop-blur-xl">
      <div className="flex border-b border-border/40 px-2 pt-2 text-[15px] font-bold">
        {["笔记", "收藏", "赞过"].map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex-1 py-3 relative transition-colors ${
              activeTab === tab ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            {tab}
            {tab === "笔记" ? " (12)" : tab === "收藏" ? " (45)" : " (102)"}
            {activeTab === tab && (
              <motion.div layoutId="profileTabIndicator" className="absolute bottom-0 inset-x-0 mx-auto w-6 h-[3px] bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {(activeTab === "收藏" || activeTab === "赞过") && (
        <div className="flex gap-[8px] border-b border-border/30 bg-muted/20 px-4 py-3">
          {["全部", "店铺", "笔记"].map((filter) => (
            <button
              key={filter}
              onClick={() => onSubFilterChange(filter)}
              className={`px-4 py-[6px] text-[12px] font-bold rounded-[10px] transition-all border ${
                subFilter === filter
                  ? "bg-text-primary text-background border-text-primary shadow-sm"
                  : "bg-card text-text-secondary border-border/60 hover:text-text-primary shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <ListContainer state={appState} className="flex-1 bg-transparent p-3 pt-4" onRetry={onRetry}>
        {showNotes && (
          <div className="grid grid-cols-2 gap-[10px] mb-4">
            {notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
              >
                <FeedCard
                  id={note.id}
                  title={note.title}
                  author={note.author}
                  authorAvatar={note.authorAvatar}
                  likes={note.likes}
                  liked={activeTab === "赞过"}
                  imageClassName={note.height}
                  image={note.image}
                />
              </motion.div>
            ))}
          </div>
        )}

        {showShops && (
          <div className="flex flex-col gap-[10px]">
            {shops.map((shop, index) => (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
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
              </motion.div>
            ))}
          </div>
        )}
      </ListContainer>
    </section>
  );
};
