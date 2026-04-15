import React from "react";

type FollowingHeaderProps = {
  filter: string;
  onFilterChange: (value: string) => void;
};

export const FollowingHeader = ({ filter, onFilterChange }: FollowingHeaderProps) => {
  return (
    <div className="pt-safe bg-background/85 backdrop-blur-xl z-40 sticky top-0 shadow-sm border-b border-border/40">
      <div className="flex items-center justify-center px-4 py-3 relative">
        <span className="font-bold text-[17px] tracking-widest text-text-primary">关注</span>
      </div>

      <div className="px-5 pb-3 pt-1 w-full max-w-[320px] mx-auto">
        <div className="flex bg-muted/80 backdrop-blur-sm rounded-[12px] p-[3px] shadow-inner border border-border/40 relative">
          <div
            className="absolute top-[3px] bottom-[3px] w-[calc(33.333%-2px)] bg-card rounded-[9px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-border/60 transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1)"
            style={{
              transform: `translateX(${filter === "全部" ? "0" : filter === "笔记" ? "100%" : "200%"})`,
              left: "3px",
            }}
          />
          {["全部", "笔记", "店铺"].map((tab) => (
            <button
              key={tab}
              onClick={() => onFilterChange(tab)}
              className={`flex-1 py-[6px] text-[13px] font-bold rounded-lg relative z-10 transition-colors ${
                filter === tab ? "text-text-primary" : "text-text-tertiary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
