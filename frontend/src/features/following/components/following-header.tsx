import React from "react";
import { SegmentedControl } from "@/components/ditan";
import type { FollowingFeedType } from "@/types/note";

type FollowingHeaderProps = {
  filter: FollowingFeedType;
  onFilterChange: (value: FollowingFeedType) => void;
};

export const FollowingHeader = ({ filter, onFilterChange }: FollowingHeaderProps) => {
  return (
    <div className="pt-safe bg-background/85 backdrop-blur-xl z-40 sticky top-0 shadow-sm border-b border-border/40">
      <div className="flex items-center justify-center px-4 py-3 relative">
        <span className="font-bold text-[17px] tracking-widest text-text-primary">关注</span>
      </div>

      <div className="px-5 pb-3 pt-1 w-full max-w-[320px] mx-auto">
        <SegmentedControl
          options={[
            { label: "全部", value: "全部" },
            { label: "笔记", value: "笔记" },
            { label: "店铺", value: "店铺" },
          ] as const satisfies readonly { label: string; value: FollowingFeedType }[]}
          value={filter}
          onChange={onFilterChange}
          buttonClassName="py-[6px] text-[13px] font-bold"
        />
      </div>
    </div>
  );
};
