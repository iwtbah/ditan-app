import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, MessageSquare, Send, Star } from "lucide-react";

type NoteDetailCommentComposerProps = {
  appState: string;
  commenting: boolean;
  isCollected: boolean;
  isLiked: boolean;
  newComment: string;
  onClose: () => void;
  onCommentChange: (value: string) => void;
  onOpen: () => void;
  onSubmit: () => void;
  onToggleCollected: () => void;
  onToggleLiked: () => void;
};

export const NoteDetailCommentComposer = ({
  appState,
  commenting,
  isCollected,
  isLiked,
  newComment,
  onClose,
  onCommentChange,
  onOpen,
  onSubmit,
  onToggleCollected,
  onToggleLiked,
}: NoteDetailCommentComposerProps) => {
  return (
    <>
      {(appState === "Normal" || appState === "Loading") && !commenting && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-0 inset-x-0 h-[64px] bg-background/80 backdrop-blur-xl border-t border-border/40 flex items-center px-5 gap-3 z-50 pb-safe"
        >
          <div
            onClick={onOpen}
            className="flex-1 bg-muted/80 h-10 rounded-full flex items-center px-4 text-text-tertiary hover:bg-muted transition-colors cursor-pointer border border-border/40"
          >
            <span className="font-medium text-[14px]">说点什么...</span>
          </div>
          <div className="flex gap-4 text-text-primary px-2">
            <button onClick={onToggleLiked} className="active:scale-90 transition-transform">
              <Heart size={26} strokeWidth={isLiked ? 2.5 : 2} className={isLiked ? "text-red-500 fill-red-500" : "text-text-primary"} />
            </button>
            <button onClick={onToggleCollected} className="active:scale-90 transition-transform">
              <Star size={26} strokeWidth={isCollected ? 2.5 : 2} className={isCollected ? "text-amber-400 fill-amber-400" : "text-text-primary"} />
            </button>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {commenting && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-50"
              onClick={onClose}
            />
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="absolute bottom-0 inset-x-0 bg-background rounded-t-[24px] z-[60] p-5 pb-safe flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-text-primary text-[16px]">发表评论</span>
                <span className="text-text-tertiary text-[12px] font-medium">{newComment.length}/200</span>
              </div>
              <div className="bg-muted/50 rounded-[16px] p-3 border border-border/40 mb-4 transition-colors focus-within:bg-background focus-within:border-primary/30">
                <textarea
                  value={newComment}
                  onChange={(e) => onCommentChange(e.target.value)}
                  placeholder="说点什么，友善的交流让人心情愉悦..."
                  className="w-full h-24 bg-transparent resize-none outline-none text-[15px] text-text-primary placeholder:text-text-tertiary leading-relaxed"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={onSubmit}
                  disabled={!newComment.trim()}
                  className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-bold text-[14px] transition-all ${
                    newComment.trim() ? "bg-text-primary text-background shadow-md active:scale-95" : "bg-muted text-text-tertiary cursor-not-allowed"
                  }`}
                >
                  <Send size={16} strokeWidth={2.5} /> 发送
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
