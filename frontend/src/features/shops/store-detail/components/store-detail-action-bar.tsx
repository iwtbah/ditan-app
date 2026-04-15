import React from "react";
import { motion } from "motion/react";
import { Edit3, Navigation, Star } from "lucide-react";

type StoreDetailActionBarProps = {
  isCollected: boolean;
  onToggleCollected: () => void;
};

export const StoreDetailActionBar = ({ isCollected, onToggleCollected }: StoreDetailActionBarProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="absolute bottom-0 inset-x-0 bg-background/80 backdrop-blur-2xl border-t border-border/40 px-5 py-3 pb-safe flex items-center gap-6 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]"
    >
      <div className="flex gap-5 pl-1 shrink-0">
        <button onClick={onToggleCollected} className="flex flex-col items-center justify-center gap-1 text-text-secondary active:scale-90 transition-transform">
          <Star size={22} strokeWidth={isCollected ? 2.5 : 2} fill={isCollected ? "currentColor" : "none"} className={isCollected ? "text-amber-500" : ""} />
          <span className={`text-[10px] font-bold ${isCollected ? "text-amber-600" : ""}`}>{isCollected ? "已收藏" : "收藏"}</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1 text-text-secondary active:scale-90 transition-transform">
          <Edit3 size={22} strokeWidth={2} />
          <span className="text-[10px] font-bold">写评价</span>
        </button>
      </div>

      <button className="flex-1 bg-text-primary text-background rounded-full py-[12px] flex items-center justify-center gap-2 font-bold text-[15px] active:scale-95 transition-transform shadow-md">
        <Navigation size={18} strokeWidth={2.5} /> 导航去这里
      </button>
    </motion.div>
  );
};
