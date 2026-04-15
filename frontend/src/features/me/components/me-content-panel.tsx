import React from "react";
import { motion } from "motion/react";
import { FeedCard, ListContainer, ShopCard } from "@/components/ditan";
import type { AsyncViewState } from "@/types/common";
import { PROFILE_NOTES, PROFILE_SHOPS } from "../mocks";

type MeContentPanelProps = {
  activeTab: string;
  appState: AsyncViewState;
  subFilter: string;
  onSubFilterChange: (value: string) => void;
  onTabChange: (value: string) => void;
};

export const MeContentPanel = ({
  activeTab,
  appState,
  subFilter,
  onSubFilterChange,
  onTabChange,
}: MeContentPanelProps) => {
  return (
    <div className="bg-card rounded-[20px] shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-border/40 overflow-hidden flex flex-col min-h-[500px]">
      <div className="flex border-b border-border/40 text-[15px] font-bold px-2 pt-2">
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
        <div className="flex gap-[8px] px-4 py-3 border-b border-border/30 bg-muted/20">
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

      <ListContainer state={appState} className="flex-1 bg-muted/10 p-3">
        {(activeTab === "笔记" || (activeTab !== "笔记" && (subFilter === "全部" || subFilter === "笔记"))) && (
          <div className="grid grid-cols-2 gap-[10px] mb-4">
            {PROFILE_NOTES.map((note) => (
              <FeedCard
                key={note.id}
                id={note.id}
                title={note.title}
                author={note.author}
                authorAvatar={note.authorAvatar}
                likes={note.likes}
                liked={activeTab === "赞过"}
                imageClassName={note.height}
                image={note.image}
              />
            ))}
          </div>
        )}

        {activeTab !== "笔记" && (subFilter === "全部" || subFilter === "店铺") && (
          <div className="flex flex-col gap-[10px]">
            {PROFILE_SHOPS.map((shop) => (
              <ShopCard
                key={shop.id}
                id={shop.id}
                name={shop.name}
                rating={shop.rating}
                price={shop.price}
                recommendation={shop.recommendation}
                image={shop.image}
                distance={shop.distance}
                tags={shop.tags}
              />
            ))}
          </div>
        )}
      </ListContainer>
    </div>
  );
};
