import React from "react";
import { ChevronRight, Clock3 } from "lucide-react";
import type { RecentBrowseItem } from "@/types/user";

type MeRecentBrowsePanelProps = {
  items: RecentBrowseItem[];
};

export const MeRecentBrowsePanel = ({ items }: MeRecentBrowsePanelProps) => {
  if (items.length === 0) return null;

  return (
    <section className="rounded-[24px] border border-border/40 bg-background/76 px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Clock3 size={16} strokeWidth={2.4} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-bold text-text-primary">最近浏览</h3>
            <p className="mt-1 truncate text-[12px] text-text-tertiary">
              最近看过 {items.length} 条内容
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-text-tertiary">
          <span className="text-[12px] font-medium">查看</span>
          <ChevronRight size={16} strokeWidth={2.4} />
        </div>
      </div>
    </section>
  );
};
