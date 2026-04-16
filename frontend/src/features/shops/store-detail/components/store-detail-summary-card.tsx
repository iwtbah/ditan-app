import React from "react";
import { Camera, ChevronRight, Clock, Heart, MapPin, Phone, Star } from "lucide-react";
import type { StoreDetailData } from "@/types/shop";

type StoreDetailSummaryCardProps = {
  store: StoreDetailData;
};

export const StoreDetailSummaryCard = ({ store }: StoreDetailSummaryCardProps) => {
  return (
    <div className="mx-4 -mt-20 bg-card rounded-[20px] p-5 pb-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-border/40 relative z-20">
      <div className="flex justify-between items-start mb-3">
        <h1 className="text-[20px] font-bold text-text-primary leading-[1.3] tracking-tight pr-4">{store.name}</h1>
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border/60 shrink-0 text-text-secondary active:scale-95 transition-transform shadow-sm">
          <Phone size={18} strokeWidth={2.5} />
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md text-amber-600">
          <Star size={14} fill="currentColor" />
          <span className="font-bold text-[14px]">{store.rating}</span>
        </div>
        <span className="text-[13px] font-bold text-text-secondary">{store.price}</span>
        <span className="text-[12px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md">
          本地人气榜第1名
        </span>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {store.tags.map((tag: string) => (
          <span key={tag} className="flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-[8px] text-[12px] text-text-secondary font-bold">
            {tag === "出片率高" && <Camera size={12} className="opacity-60" />}
            {tag === "复古风" && <Clock size={12} className="opacity-60" />}
            {tag === "手冲咖啡" && <Star size={12} className="opacity-60" />}
            {tag === "宠物友好" && <Heart size={12} className="opacity-60" />}
            {tag}
          </span>
        ))}
      </div>

      <div className="h-px bg-border/50 my-3 -mx-1" />

      <div className="flex items-center justify-between pt-1 group cursor-pointer active:opacity-70 transition-opacity">
        <div className="flex items-start gap-2.5 flex-1 pr-4">
          <MapPin size={18} className="text-text-tertiary mt-0.5 shrink-0" strokeWidth={2.5} />
          <div className="flex flex-col gap-0.5">
            <span className="text-[14px] font-bold text-text-primary leading-tight">{store.address}</span>
            <span className="text-[11px] font-medium text-text-tertiary">
              距离您 {store.distance} • {store.walkTime}
            </span>
          </div>
        </div>
        <ChevronRight size={18} className="text-text-tertiary shrink-0" strokeWidth={2.5} />
      </div>
    </div>
  );
};
