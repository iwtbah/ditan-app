import React from "react";
import { motion } from "motion/react";
import { ChevronRight, Star, ThumbsUp, Ticket } from "lucide-react";
import type { MasonryNoteData } from "@/types/note";
import type { StoreDish, StoreReview } from "@/types/shop";
import { RestrainedFeedCard } from "./restrained-feed-card";

type StoreDetailSectionsProps = {
  allNotes: MasonryNoteData[];
  dishes: StoreDish[];
  reviews: StoreReview[];
  selectedNotes: MasonryNoteData[];
  onOpenCouponSheet: () => void;
  onOpenNote: (noteId: number) => void;
};

export const StoreDetailSections = ({
  allNotes,
  dishes,
  reviews,
  selectedNotes,
  onOpenCouponSheet,
  onOpenNote,
}: StoreDetailSectionsProps) => {
  return (
    <>
      <div className="mx-4 mt-5">
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={onOpenCouponSheet}
          className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-[18px] p-3.5 flex items-center justify-between shadow-[0_2px_12px_rgba(245,158,11,0.06)] border border-amber-200/50 cursor-pointer relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 opacity-5 text-amber-600 pointer-events-none">
            <Ticket size={100} />
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-[12px] bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Ticket size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-amber-900 dark:text-amber-100 mb-0.5 leading-tight">79元 代 100元 饮品券</h4>
              <p className="text-[11px] text-amber-700/70 dark:text-amber-300/70 font-bold">半年售 1200+ • 随时退</p>
            </div>
          </div>

          <div className="relative z-10 shrink-0 ml-2">
            <button className="bg-amber-500 text-white text-[12px] font-bold px-3.5 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform">
              立即领取
            </button>
          </div>
        </motion.div>
      </div>

      <div className="mt-8">
        <div className="px-5 flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-bold text-text-primary tracking-tight">精选探店</h3>
          <span className="text-[12px] font-bold text-text-tertiary flex items-center gap-0.5 cursor-pointer active:opacity-70">
            全部 <ChevronRight size={14} />
          </span>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 gap-3 pb-2">
          {selectedNotes.map((note) => (
            <motion.div
              key={note.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenNote(note.id)}
              className="w-[260px] shrink-0 snap-center rounded-[18px] overflow-hidden bg-card shadow-[0_2px_12px_rgba(0,0,0,0.05)] cursor-pointer group relative"
            >
              <div className="h-[150px] w-full bg-muted relative">
                <img src={note.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
              </div>
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <h4 className="text-white text-[14px] font-bold leading-[1.3] line-clamp-2 drop-shadow-md mb-2">{note.title}</h4>
                <div className="flex items-center gap-1.5 text-white/90">
                  <img src={note.avatar} className="w-4 h-4 rounded-full border border-white/30" />
                  <span className="text-[11px] font-medium drop-shadow-sm">{note.author}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="px-5 mb-4">
          <h3 className="text-[17px] font-bold text-text-primary tracking-tight">推荐菜品</h3>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 gap-3 pb-2">
          {dishes.map((dish) => (
            <motion.div
              key={dish.id}
              whileTap={{ scale: 0.96 }}
              className="w-[130px] shrink-0 snap-center rounded-[16px] overflow-hidden bg-card border border-border/40 shadow-sm cursor-pointer"
            >
              <img src={dish.image} className="w-full h-[110px] object-cover" />
              <div className="p-2.5 flex flex-col items-start gap-1.5">
                <h4 className="font-bold text-[13px] text-text-primary truncate w-full">{dish.name}</h4>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-1.5 py-0.5 rounded shadow-sm">
                  {dish.reason}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 px-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-bold text-text-primary tracking-tight">热门评价</h3>
          <span className="text-[12px] font-bold text-text-tertiary flex items-center gap-0.5 cursor-pointer active:opacity-70">
            共 342 条 <ChevronRight size={14} />
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <motion.div key={review.id} whileTap={{ scale: 0.98 }} className="bg-muted/40 rounded-[14px] p-3.5 flex gap-3 border border-border/40 cursor-pointer">
              <img src={review.avatar} className="w-8 h-8 rounded-full shrink-0 border border-border/60" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-[12px] text-text-primary">{review.author}</span>
                  <div className="flex items-center gap-1 text-text-tertiary">
                    <ThumbsUp size={12} />
                    <span className="text-[10px] font-bold">{review.likes}</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-1.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={10} fill={index < (review.rating || 5) ? "currentColor" : "none"} strokeWidth={1.5} />
                  ))}
                </div>
                <p className="text-[13px] text-text-secondary leading-[1.5] line-clamp-2">{review.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-10 pb-8 bg-background">
        <h3 className="text-[17px] font-bold text-text-primary tracking-tight mb-5">更多探店内容</h3>
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            {allNotes.filter((_, index) => index % 2 === 0).map((note) => (
              <RestrainedFeedCard key={note.id} note={note} onOpenNote={onOpenNote} />
            ))}
          </div>
          <div className="flex-1 flex flex-col">
            {allNotes.filter((_, index) => index % 2 !== 0).map((note) => (
              <RestrainedFeedCard key={note.id} note={note} onOpenNote={onOpenNote} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
