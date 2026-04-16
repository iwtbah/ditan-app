import React from "react";
import { CategoryChips, Header, SegmentedControl } from "@/components/ditan";

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
        <SegmentedControl
          options={[
            { label: "探店日记", value: "探店日记" },
            { label: "店铺", value: "店铺" },
          ]}
          value={contentType}
          onChange={onContentTypeChange}
          className="w-[220px]"
          buttonClassName="py-[6px] text-[14px] font-bold"
        />
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
