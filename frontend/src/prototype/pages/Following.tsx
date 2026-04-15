import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Heart, MessageSquare, Star, MoreHorizontal, UserPlus, Share } from "lucide-react";
import { useStateContext } from "../context/StateContext";
import { motion, AnimatePresence } from "motion/react";

const MOCK_FEEDS = [
  {
    id: 1,
    type: '笔记',
    author: { name: '早睡早起的小白', avatar: 'https://images.unsplash.com/photo-1595918989407-ae09b2f222bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGdpcmwlMjBjdXRlfGVufDF8fHx8MTc3NjEzMjE3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    time: '2小时前',
    title: '藏在深巷里的治愈系咖啡馆，周末好去处',
    content: '周末偶然发现的一家日系原木风咖啡馆，手冲咖啡味道很绝，还有两只可爱的店猫。绝对是放松心情的绝佳地点！',
    image: 'https://images.unsplash.com/photo-1597657399260-79eedfca3c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwY2FmZXxlbnwxfHx8fDE3NzYxMzIxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    shopInfo: { name: '猫雨咖啡', city: '上海' },
    stats: { likes: 128, comments: 34, stars: 56, isLiked: true }
  },
  {
    id: 2,
    type: '店铺',
    author: { name: '城市探索指南', avatar: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTMyMTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    time: '5小时前',
    title: '本地人私藏的平价地道日料店',
    content: '绝对是N刷不腻的一家宝藏小店，招牌寿喜锅和厚切三文鱼分量超级足，性价比绝了！每天都要排队。',
    image: 'https://images.unsplash.com/photo-1696449241254-11cf7f18ce32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc2MTMyMTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    shopInfo: { name: '隐泉日式料理', city: '北京' },
    stats: { likes: 89, comments: 12, stars: 22, isLiked: false }
  }
];

export const Following = () => {
  const { appState } = useStateContext();
  const [filter, setFilter] = useState("全部");
  const navigate = useNavigate();

  const filteredFeeds = MOCK_FEEDS.filter(f => filter === "全部" ? true : f.type === filter);
  
  // Simulate state switching to show empty/loading states based on global appState
  // For demo: if appState is "Empty", force empty. If "Loading", force loading.
  const isEmpty = appState === "Empty" || (appState === "Normal" && filteredFeeds.length === 0);
  const isLoading = appState === "Loading";

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      
      {/* 1. Top Structure (Sticky, Glass Effect) */}
      <div className="pt-safe bg-background/85 backdrop-blur-xl z-40 sticky top-0 shadow-sm border-b border-border/40">
        <div className="flex items-center justify-center px-4 py-3 relative">
          <span className="font-bold text-[17px] tracking-widest text-text-primary">关注</span>
        </div>
        
        {/* Segmented Control Filter */}
        <div className="px-5 pb-3 pt-1 w-full max-w-[320px] mx-auto">
          <div className="flex bg-muted/80 backdrop-blur-sm rounded-[12px] p-[3px] shadow-inner border border-border/40 relative">
            <div 
              className={`absolute top-[3px] bottom-[3px] w-[calc(33.333%-2px)] bg-card rounded-[9px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-border/60 transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1)`}
              style={{ 
                transform: `translateX(${filter === '全部' ? '0' : filter === '笔记' ? '100%' : '200%'})`,
                left: '3px'
              }}
            />
            {["全部", "笔记", "店铺"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 py-[6px] text-[13px] font-bold rounded-lg relative z-10 transition-colors ${
                  filter === tab ? "text-text-primary" : "text-text-tertiary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Feed List Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-muted/20 relative pb-[90px]">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="py-4 space-y-4"
            >
              {[1, 2].map((i) => (
                <div key={i} className="bg-card rounded-[16px] shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-border/40 p-4 mx-4 animate-pulse">
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
          ) : isEmpty ? (
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
              <p className="text-[14px] text-text-secondary mb-8 leading-relaxed max-w-[240px]">去首页发现更多精彩的探店内容，关注有趣的达人吧</p>
              <button 
                onClick={() => navigate('/')} 
                className="px-8 py-[12px] bg-primary hover:bg-primary/90 text-primary-foreground text-[15px] font-bold rounded-full transition-all active:scale-95 shadow-[0_4px_16px_rgba(74,93,90,0.2)] border border-border/10"
              >
                去首页发现
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="content" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="py-4 space-y-4"
            >
              {filteredFeeds.map((feed) => (
                <div key={feed.id} className="bg-card rounded-[16px] shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-border/40 mx-4 overflow-hidden">
                  
                  {/* User Info */}
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

                  {/* Text Content */}
                  <Link to={`/note/${feed.id}`} className="block px-4 pb-3 active:opacity-70 transition-opacity">
                    <h3 className="text-[16px] font-bold text-text-primary leading-[24px] line-clamp-2 mb-1.5">{feed.title}</h3>
                    <p className="text-[14px] text-text-secondary leading-[22px] line-clamp-1">{feed.content}</p>
                  </Link>

                  {/* Image Content */}
                  <Link to={`/note/${feed.id}`} className="block px-4 pb-3 active:opacity-70 transition-opacity">
                    <div className="w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-muted border border-border/40">
                      <img 
                        src={feed.image} 
                        alt="Feed image" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    </div>
                  </Link>

                  {/* Shop Tag (Optional) */}
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

                  {/* Interaction Bar */}
                  <div className="flex items-center justify-between px-5 py-[14px] border-t border-border/40 bg-muted/10">
                    <div className="flex items-center gap-6 text-text-tertiary font-bold text-[13px]">
                      <button className="flex items-center gap-1.5 hover:text-primary transition-colors group">
                        <Heart size={20} strokeWidth={feed.stats.isLiked ? 0 : 2} fill={feed.stats.isLiked ? "currentColor" : "none"} className={feed.stats.isLiked ? "text-primary" : "group-hover:text-primary"} />
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
              <div className="py-6 text-center text-[12px] font-bold tracking-widest text-text-tertiary">
                - 没有更多动态了 -
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
