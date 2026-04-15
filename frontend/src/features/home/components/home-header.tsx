import React from "react";
import { Header, CategoryChips } from "@/components/ditan";

type HomeHeaderProps = {
  activeCategory: string;
  contentType: string;
  onCategoryChange: (value: string) => void;
  onContentTypeChange: (value: string) => void;
  onOpenSearch: () => void;
};

export const HomeHeader = ({
  activeCategory,
  contentType,
  onCategoryChange,
  onContentTypeChange,
  onOpenSearch,
}: HomeHeaderProps) => {
  return (
    <div className="pt-safe bg-background/80 backdrop-blur-xl z-50 sticky top-0 shadow-sm border-b border-border/40">
      <Header
        city="北京"
        placeholder="搜索你想去的探店..."
        readOnly={true}
        onClick={onOpenSearch}
        className="border-none pb-0 bg-transparent backdrop-blur-none"
      />

      <div className="px-lg pt-2 pb-1 flex justify-center w-full relative z-10">
        <div className="flex bg-muted/80 backdrop-blur-sm rounded-[12px] p-[3px] relative w-[220px] shadow-inner border border-border/40">
          <div
            className={`absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] bg-card rounded-[9px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-border/60 transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${
              contentType === "店铺" ? "translate-x-[100%]" : "translate-x-0"
            }`}
          />
          <button
            onClick={() => onContentTypeChange("探店日记")}
            className={`flex-1 py-[6px] text-[14px] font-bold rounded-lg relative z-10 transition-colors ${
              contentType === "探店日记" ? "text-text-primary" : "text-text-tertiary"
            }`}
          >
            探店日记
          </button>
          <button
            onClick={() => onContentTypeChange("店铺")}
            className={`flex-1 py-[6px] text-[14px] font-bold rounded-lg relative z-10 transition-colors ${
              contentType === "店铺" ? "text-text-primary" : "text-text-tertiary"
            }`}
          >
            店铺
          </button>
        </div>
      </div>

      <CategoryChips
        tags={["推荐", "美食", "咖啡", "火锅", "运动", "景点", "展览"]}
        activeTag={activeCategory}
        onChange={onCategoryChange}
        className="mt-sm mb-xs"
      />
    </div>
  );
};
