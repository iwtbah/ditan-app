import React from "react";
import { motion } from "motion/react";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { HeaderActionButton, PageHeader } from "@/components/ditan";

const HOME_CATEGORIES = ["推荐", "美食", "咖啡", "火锅", "运动", "景点", "展览"] as const;

type HomeHeaderProps = {
  activeCategory: string;
  contentType: string;
  hideCategoryTabs?: boolean;
  onCategoryChange: (value: string) => void;
  onContentTypeChange: (value: string) => void;
  onOpenSearch: () => void;
};

export const HomeHeader = ({
  activeCategory,
  contentType,
  hideCategoryTabs = false,
  onCategoryChange,
  onContentTypeChange,
  onOpenSearch,
}: HomeHeaderProps) => {
  return (
    <div className="pt-safe sticky top-0 z-50 bg-background/94 shadow-sm backdrop-blur-xl border-b border-border/40">
      <PageHeader
        className="static border-b-0 bg-transparent pt-0 shadow-none backdrop-blur-none"
        title="首页"
        centerClassName="px-[112px]"
        leading={(
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1 rounded-full border border-border/40 bg-card/70 px-3 text-[13px] font-bold text-text-primary shadow-sm backdrop-blur-xl transition-transform active:scale-[0.98]"
          >
            <MapPin size={14} className="text-primary" strokeWidth={2.4} />
            <span>北京</span>
            <ChevronDown size={14} strokeWidth={2.4} />
          </button>
        )}
        center={(
          <HomeModeTabs
            value={contentType}
            onChange={onContentTypeChange}
          />
        )}
        actions={(
          <HeaderActionButton aria-label="打开搜索页" onClick={onOpenSearch}>
            <Search size={18} strokeWidth={2.4} />
          </HeaderActionButton>
        )}
      />

      <HomeCategoryTabs
        activeCategory={activeCategory}
        categories={HOME_CATEGORIES}
        hidden={hideCategoryTabs}
        onChange={onCategoryChange}
      />
    </div>
  );
};

type HomeModeTabsProps = {
  onChange: (value: string) => void;
  value: string;
};

const HomeModeTabs = ({ value, onChange }: HomeModeTabsProps) => (
  <div className="relative flex items-center justify-center gap-5">
    {(["探店日记", "店铺"] as const).map((option) => {
      const active = value === option;

      return (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`relative flex h-10 items-center px-1 text-[16px] transition-colors duration-200 ${
            active ? "font-bold text-text-primary" : "font-semibold text-text-tertiary"
          }`}
        >
          <span>{option}</span>
          {active && (
            <motion.span
              layoutId="home-mode-indicator"
              className="absolute inset-x-0 bottom-[5px] mx-auto h-[3px] w-6 rounded-full bg-primary"
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </button>
      );
    })}
  </div>
);

type HomeCategoryTabsProps = {
  activeCategory: string;
  categories: readonly string[];
  hidden?: boolean;
  onChange: (value: string) => void;
};

const HomeCategoryTabs = ({ activeCategory, categories, hidden = false, onChange }: HomeCategoryTabsProps) => (
  <motion.div
    animate={{
      height: hidden ? 0 : 44,
      opacity: hidden ? 0 : 1,
      y: hidden ? -8 : 0,
    }}
    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    className={`overflow-hidden ${hidden ? "pointer-events-none" : ""}`}
  >
    <div className="overflow-x-auto no-scrollbar px-4">
      <div className="flex min-w-max items-center gap-2 py-2">
        {categories.map((category, index) => {
          const active = activeCategory === category || (!activeCategory && index === 0);

          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              className={`relative isolate whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] transition-colors duration-200 ${
                active ? "font-bold text-text-primary" : "font-medium text-text-tertiary"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="home-category-highlight"
                  className="absolute inset-0 -z-10 rounded-full bg-card shadow-[0_2px_10px_rgba(0,0,0,0.05)] ring-1 ring-border/40"
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  </motion.div>
);
