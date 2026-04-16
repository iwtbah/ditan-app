import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CommentItem, SectionHeader, SheetHandle } from "@/components/ditan";
import { ChevronRight, Heart, MessageSquare, MoreHorizontal, Star } from "lucide-react";
import type { NoteComment, NoteDetailData } from "@/types/note";
import type { LinkedStoreData } from "@/types/shop";

type NoteDetailContentProps = {
  comments: NoteComment[];
  followState: number;
  isCollected: boolean;
  isLiked: boolean;
  note: NoteDetailData;
  store: LinkedStoreData;
  onNavigateStore: () => void;
  onOpenCommenting: () => void;
  onToggleCollected: () => void;
  onToggleFollowState: () => void;
  onToggleLiked: () => void;
};

export const NoteDetailContent = ({
  comments,
  followState,
  isCollected,
  isLiked,
  note,
  store,
  onNavigateStore,
  onOpenCommenting,
  onToggleCollected,
  onToggleFollowState,
  onToggleLiked,
}: NoteDetailContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      className="relative z-10 bg-background min-h-[100vh] -mt-6 rounded-t-[24px] shadow-[0_-4px_30px_rgba(0,0,0,0.06)] pb-safe"
    >
      <SheetHandle />

      <div className="px-5">
        <div className="flex items-center justify-between mb-5 mt-1">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-border/60">
              <img src={note.author.avatar} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[15px] text-text-primary tracking-tight">{note.author.name}</span>
              <span className="text-[11px] font-medium text-text-tertiary">
                {note.author.location} • {note.author.time}
              </span>
            </div>
          </div>

          <button
            onClick={onToggleFollowState}
            className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all active:scale-95 ${
              followState === 0
                ? "bg-text-primary text-background"
                : "bg-muted/80 text-text-secondary border border-border/60"
            }`}
          >
            {followState === 0 ? "关注" : followState === 1 ? "已关注" : "互相关注"}
          </button>
        </div>

        <h1 className="text-[19px] font-bold text-text-primary leading-[1.4] tracking-tight mb-3">
          {note.title}
        </h1>

        <div className="text-[15px] text-text-primary/90 leading-[1.75] space-y-4 mb-6">
          {note.content.map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5 mb-6">
          {note.tags.map((tag: string) => (
            <span key={tag} className="text-[13px] text-blue-600/90 font-bold bg-blue-50/80 px-3 py-1.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div className="text-[12px] text-text-tertiary mb-5">编辑于 {note.author.time}</div>

        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={onNavigateStore}
          className="bg-card rounded-[18px] p-3.5 flex items-center gap-3.5 mb-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-border/60 cursor-pointer"
        >
          <div className="w-[52px] h-[52px] rounded-[14px] bg-muted overflow-hidden shrink-0">
            <img src={store.image} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <h4 className="text-[15px] font-bold text-text-primary leading-tight mb-1">{store.name}</h4>
            <div className="flex items-center gap-1.5 text-[12px] text-text-secondary font-medium">
              <Star size={12} className="text-amber-500 fill-amber-500 mb-0.5" />
              <span className="text-amber-600/90 font-bold">{store.rating}</span>
              <span className="text-border">|</span>
              <span>{store.tags.join(" • ")}</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center border border-border/40">
            <ChevronRight size={16} className="text-text-tertiary ml-0.5" />
          </div>
        </motion.div>

        <div className="h-px bg-border/40 my-6 mx-[-20px]" />

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-6">
            <button onClick={onToggleLiked} className="flex items-center gap-1.5 group">
              <motion.div animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
                <Heart size={24} strokeWidth={isLiked ? 2.5 : 2} className={isLiked ? "text-red-500 fill-red-500" : "text-text-secondary"} />
              </motion.div>
              <span className={`text-[14px] font-bold ${isLiked ? "text-red-500" : "text-text-secondary"}`}>
                {note.likes + (isLiked ? 1 : 0)}
              </span>
            </button>

            <button onClick={onToggleCollected} className="flex items-center gap-1.5 group">
              <motion.div animate={isCollected ? { scale: [1, 1.3, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
                <Star size={24} strokeWidth={isCollected ? 2.5 : 2} className={isCollected ? "text-amber-400 fill-amber-400" : "text-text-secondary"} />
              </motion.div>
              <span className={`text-[14px] font-bold ${isCollected ? "text-amber-500" : "text-text-secondary"}`}>
                {note.collected + (isCollected ? 1 : 0)}
              </span>
            </button>

            <button onClick={onOpenCommenting} className="flex items-center gap-1.5 group">
              <MessageSquare size={24} strokeWidth={2} className="text-text-secondary group-active:scale-95 transition-transform" />
              <span className="text-[14px] font-bold text-text-secondary">{comments.length + 126}</span>
            </button>
          </div>
        </div>

        <div className="bg-muted/40 rounded-[16px] p-3 flex items-center justify-between mb-8 border border-border/40">
          <div className="flex -space-x-2.5 overflow-hidden px-1">
            {note.likedAvatars.map((src: string, index: number) => (
              <div key={index} className="w-[26px] h-[26px] rounded-full border-2 border-background overflow-hidden shrink-0 z-10 relative">
                <img src={src} className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-[26px] h-[26px] rounded-full border-2 border-background bg-muted flex items-center justify-center shrink-0 z-10 relative">
              <MoreHorizontal size={12} className="text-text-tertiary" />
            </div>
          </div>
          <div className="text-[12px] font-bold text-text-tertiary mr-2">等 {note.likes} 人觉得很赞</div>
        </div>

        <div>
          <SectionHeader
            title={`共 ${comments.length + 126} 条评论`}
            className="mb-5"
            titleClassName="font-bold text-[16px] text-text-primary tracking-tight"
          />
          <div className="space-y-5 pb-24">
            <AnimatePresence>
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CommentItem {...comment} />
                </motion.div>
              ))}
            </AnimatePresence>
            <button className="w-full py-3 mt-4 text-[13px] font-bold text-text-secondary bg-muted/60 rounded-full hover:bg-muted transition-colors">
              展开更多评论
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
