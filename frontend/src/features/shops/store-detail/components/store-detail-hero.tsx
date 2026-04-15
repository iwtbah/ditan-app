import React from "react";
import { motion, type MotionValue } from "motion/react";
import { Camera, ChevronLeft, ChevronRight, Clock, Heart, MapPin, Phone, Share2, Star } from "lucide-react";
import type { StoreDetailData } from "@/types/shop";

type StoreDetailHeroProps = {
  currentImageIndex: number;
  headerOpacity: MotionValue<number>;
  headerY: MotionValue<number>;
  imageOpacity: MotionValue<number>;
  imageScale: MotionValue<number>;
  imageY: MotionValue<number>;
  store: StoreDetailData;
  onBack: () => void;
  onImageScroll: (event: React.UIEvent<HTMLDivElement>) => void;
};

export const StoreDetailHero = ({
  currentImageIndex,
  headerOpacity,
  headerY,
  imageOpacity,
  imageScale,
  imageY,
  store,
  onBack,
  onImageScroll,
}: StoreDetailHeroProps) => {
  return (
    <>
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-2xl border-b border-border/40 pt-[max(env(safe-area-inset-top,0px),24px)] px-14 pb-3 flex flex-col items-center justify-center shadow-sm"
      >
        <span className="font-bold text-[16px] text-text-primary truncate max-w-[200px]">{store.name}</span>
        <div className="flex items-center gap-1 mt-0.5 text-[11px] text-text-secondary font-medium">
          <Star size={10} className="text-amber-500 fill-amber-500" />
          <span className="text-amber-600 font-bold">{store.rating}</span>
          <span>•</span>
          <span>{store.price}</span>
        </div>
      </motion.div>

      <div className="fixed top-[max(env(safe-area-inset-top,0px),16px)] inset-x-0 px-4 py-2 flex justify-between z-[60] pointer-events-none mt-2">
        <button
          onClick={onBack}
          className="pointer-events-auto w-9 h-9 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform shadow-sm"
        >
          <ChevronLeft size={22} strokeWidth={2.5} className="-ml-0.5" />
        </button>
        <button className="pointer-events-auto w-9 h-9 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform shadow-sm">
          <Share2 size={18} strokeWidth={2.5} />
        </button>
      </div>

      <div className="sticky top-0 z-0 h-[48vh] w-full overflow-hidden bg-muted">
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity, y: imageY }}
          className="w-full h-full origin-top relative"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar" onScroll={onImageScroll}>
            {store.images.map((img: string, index: number) => (
              <div key={index} className="w-full h-full shrink-0 snap-center relative">
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="absolute bottom-28 inset-x-0 flex justify-center gap-1.5 z-10 pointer-events-none">
            {store.images.map((_: string, index: number) => (
              <motion.div
                key={index}
                animate={{ width: index === currentImageIndex ? 16 : 6, opacity: index === currentImageIndex ? 1 : 0.5 }}
                className="h-1.5 bg-white rounded-full shadow-sm"
              />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none opacity-90" />
        </motion.div>
      </div>

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
    </>
  );
};
