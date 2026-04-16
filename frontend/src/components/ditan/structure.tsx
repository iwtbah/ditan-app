import React from "react";
import { motion } from "motion/react";
import { EmptyState, ErrorState } from "@/components/feedback/wireframe-ui";
import { MapPin, Search } from "lucide-react";
import type { AsyncViewState } from "@/types/common";

type HeaderProps = {
  autoFocus?: boolean;
  city: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onSearch?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  readOnly?: boolean;
};

export const Header = ({ city, placeholder, onSearch, onClick, className = "", readOnly = false, autoFocus = false }: HeaderProps) => (
  <div className={`flex items-center px-lg py-md gap-md bg-background/80 backdrop-blur-xl border-b border-border z-50 ${className}`}>
    <div className="flex items-center text-body font-bold gap-xs text-text-primary shrink-0">
      <MapPin size={18} strokeWidth={2.5} className="text-primary" />
      <span>{city}</span>
    </div>
    <div
      className="flex-1 bg-input h-[36px] rounded-full flex items-center px-md gap-sm cursor-pointer shadow-inner border border-border/50"
      onClick={onClick}
    >
      <Search size={16} className="text-text-tertiary" strokeWidth={2.5} />
      <input
        type="text"
        placeholder={placeholder}
        onChange={onSearch}
        readOnly={readOnly}
        autoFocus={autoFocus}
        className={`bg-transparent border-none outline-none text-body w-full placeholder:text-text-tertiary text-text-primary ${readOnly ? "pointer-events-none" : ""}`}
      />
    </div>
  </div>
);

type CategoryChipsProps = {
  activeTag?: string;
  className?: string;
  onChange?: (tag: string) => void;
  tags: string[];
};

export const CategoryChips = ({ tags, activeTag, onChange, className = "" }: CategoryChipsProps) => (
  <div className={`flex px-lg py-[10px] overflow-x-auto no-scrollbar gap-2 bg-transparent ${className}`}>
    {tags.map((tag: string, idx: number) => {
      const isActive = activeTag === tag || (activeTag === undefined && idx === 0);
      return (
        <button
          key={tag}
          onClick={() => onChange && onChange(tag)}
          className={`relative whitespace-nowrap px-[14px] py-[6px] text-[13px] font-bold rounded-[10px] transition-colors shrink-0 ${
            isActive ? "text-background" : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {isActive && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-text-primary rounded-[10px] shadow-sm"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          {!isActive && <div className="absolute inset-0 bg-card rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.02)] border border-border/40 -z-10" />}
          <span className="relative z-10">{tag}</span>
        </button>
      );
    })}
  </div>
);

type ListContainerProps = {
  children?: React.ReactNode;
  className?: string;
  emptyMessage?: string;
  errorMessage?: string;
  loadingComponent?: React.ReactNode;
  onRetry?: () => void;
  state: AsyncViewState;
};

export const ListContainer = ({ state, loadingComponent, emptyMessage = "暂无内容", errorMessage = "加载失败", onRetry, children, className = "" }: ListContainerProps) => {
  if (state === "Loading") return <div className={className}>{loadingComponent}</div>;
  if (state === "Empty") {
    return (
      <div className={`h-full flex items-center justify-center ${className}`}>
        <EmptyState message={emptyMessage} />
      </div>
    );
  }
  if (state === "Error") {
    return (
      <div className={`h-full flex items-center justify-center ${className}`}>
        <ErrorState message={errorMessage} onRetry={onRetry} />
      </div>
    );
  }
  return <div className={className}>{children}</div>;
};
