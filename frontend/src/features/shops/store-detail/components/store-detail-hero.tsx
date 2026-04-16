import React from "react";
import { motion, type MotionValue } from "motion/react";
import { ChevronLeft, Share2, Star } from "lucide-react";
import type { StoreDetailData } from "@/types/shop";

type StoreDetailHeroProps = {
  coverOpacity: MotionValue<number>;
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
  coverOpacity,
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

          <motion.div
            style={{ opacity: coverOpacity }}
            className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none z-[1]"
          />

          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none opacity-90" />
        </motion.div>
      </div>
    </>
  );
};
