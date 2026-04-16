import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, MapPin, MessageSquare, MoreHorizontal, Share, Star, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { ErrorState } from "@/components/feedback/wireframe-ui";
import type { AsyncViewState } from "@/types/common";
import type { FollowingFeedData } from "@/types/note";

type FollowingContentProps = {
  feeds: FollowingFeedData[];
  onGoHome: () => void;
  onRetry?: () => void;
  state: AsyncViewState;
};

export const FollowingContent = ({ feeds, onGoHome, onRetry, state }: FollowingContentProps) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-muted/20 relative pb-[90px]">
      <AnimatePresence mode="wait">
        {state === "Loading" ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="bg-card rounded-[16px] shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-border/40 p-4 mx-4 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-[42px] h-[42px] rounded-full bg-muted" />
                  <div className="flex flex-col gap-[6px]">
                    <div className="w-24 h-3.5 rounded bg-muted" />
                    <div className="w-16 h-2.5 rounded bg-muted" />
                  </div>
                </div>
                <div className="w-3/4 h-4 rounded bg-muted mb-2" />
                <div className="w-full h-3 rounded bg-muted mb-4" />
                <div className="w-full aspect-[4/3] rounded-[14px] bg-muted mb-4" />
                <div className="flex items-center gap-6 pt-3 border-t border-border/40">
                  <div className="w-10 h-4 rounded bg-muted" />
                  <div className="w-10 h-4 rounded bg-muted" />
                  <div className="w-10 h-4 rounded bg-muted ml-auto" />
                </div>
              </div>
            ))}
          </motion.div>
        ) : state === "Error" ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="min-h-[65vh] flex items-center justify-center px-4"
          >
            <ErrorState message="关注动态加载失败" onRetry={onRetry} />
          </motion.div>
        ) : state === "Empty" ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center min-h-[65vh] text-center px-6"
          >
            <div className="w-[88px] h-[88px] bg-muted/60 rounded-full flex items-center justify-center mb-6 shadow-inner border border-border/40">
              <UserPlus size={36} className="text-text-tertiary" strokeWidth={1.5} />
            </div>
            <h3 className="text-[18px] font-bold text-text-primary mb-[6px] tracking-tight">还没有关注的人</h3>
            <p className="text-[14px] text-text-secondary mb-8 leading-relaxed max-w-[240px]">
              去首页发现更多精彩的探店内容，关注有趣的达人吧
            </p>
            <button
              onClick={onGoHome}
              className="px-8 py-[12px] bg-primary hover:bg-primary/90 text-primary-foreground text-[15px] font-bold rounded-full transition-all active:scale-95 shadow-[0_4px_16px_rgba(74,93,90,0.2)] border border-border/10"
            >
              去首页发现
            </button>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
            {feeds.map((feed) => (
              <div key={feed.id} className="bg-card rounded-[16px] shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-border/40 mx-4 overflow-hidden">
                <div className="flex items-center justify-between p-4 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={feed.author.avatar}
                      alt={feed.author.name}
                      className="w-[42px] h-[42px] rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-border/40"
                    />
                    <div className="flex flex-col gap-[2px]">
                      <span className="font-bold text-[15px] text-text-primary tracking-tight">{feed.author.name}</span>
                      <span className="text-[12px] text-text-tertiary font-medium">{feed.time}</span>
                    </div>
                  </div>
                  <button className="p-2 -mr-2 text-text-tertiary hover:text-text-primary transition-colors active:scale-90">
                    <MoreHorizontal size={20} strokeWidth={2.5} />
                  </button>
                </div>

                <Link to={ROUTE_PATHS.noteDetail(String(feed.id))} className="block px-4 pb-3 active:opacity-70 transition-opacity">
                  <h3 className="text-[16px] font-bold text-text-primary leading-[24px] line-clamp-2 mb-1.5">{feed.title}</h3>
                  <p className="text-[14px] text-text-secondary leading-[22px] line-clamp-1">{feed.content}</p>
                </Link>

                <Link to={ROUTE_PATHS.noteDetail(String(feed.id))} className="block px-4 pb-3 active:opacity-70 transition-opacity">
                  <div className="w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-muted border border-border/40">
                    <img src={feed.image} alt="Feed image" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
                  </div>
                </Link>

                {feed.shopInfo && (
                  <div className="px-4 mb-3">
                    <div className="inline-flex items-center gap-1.5 bg-muted/80 px-3 py-[6px] rounded-lg border border-border/40 max-w-full">
                      <MapPin size={12} className="text-primary/80 shrink-0" strokeWidth={2.5} />
                      <span className="text-[12px] font-bold text-text-secondary truncate">{feed.shopInfo.name}</span>
                      <span className="w-[3px] h-[3px] rounded-full bg-border shrink-0 mx-0.5" />
                      <span className="text-[11px] font-medium text-text-tertiary shrink-0">{feed.shopInfo.city}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between px-5 py-[14px] border-t border-border/40 bg-muted/10">
                  <div className="flex items-center gap-6 text-text-tertiary font-bold text-[13px]">
                    <button className="flex items-center gap-1.5 hover:text-primary transition-colors group">
                      <Heart
                        size={20}
                        strokeWidth={feed.stats.isLiked ? 0 : 2}
                        fill={feed.stats.isLiked ? "currentColor" : "none"}
                        className={feed.stats.isLiked ? "text-primary" : "group-hover:text-primary"}
                      />
                      <span className={feed.stats.isLiked ? "text-primary" : ""}>{feed.stats.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-text-primary transition-colors group">
                      <MessageSquare size={18} strokeWidth={2} className="group-hover:text-text-primary" />
                      <span>{feed.stats.comments}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-warning transition-colors group">
                      <Star size={19} strokeWidth={2} className="group-hover:text-warning" />
                      <span>{feed.stats.stars}</span>
                    </button>
                  </div>
                  <button className="text-text-tertiary hover:text-text-primary transition-colors active:scale-95">
                    <Share size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>
            ))}
            <div className="py-6 text-center text-[12px] font-bold tracking-widest text-text-tertiary">- 没有更多动态了 -</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
