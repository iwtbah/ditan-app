import { MapPin, Settings, Share, PenTool } from "lucide-react";
import React, { useState } from "react";
import { ListContainer, FeedCard, ShopCard } from "../components/ditan";
import { useStateContext } from "../context/StateContext";
import { motion } from "motion/react";

export const Profile = () => {
  const { appState } = useStateContext();
  const [activeTab, setActiveTab] = useState("笔记"); // 笔记, 收藏, 赞过
  const [subFilter, setSubFilter] = useState("全部"); // 全部, 店铺, 笔记

  const mockNotes = [
    { id: 1, title: "绝美日落观景台", author: "明明", authorAvatar: "https://images.unsplash.com/photo-1572604745465-3f65869e2c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJsJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzYwODk2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", likes: 121, height: "h-[180px]", image: "https://images.unsplash.com/photo-1617965215075-b1f768dc8a61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjB2aWV3fGVufDF8fHx8MTc3NjA4OTY1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: 2, title: "隐藏在弄堂里的古着店", author: "明明", authorAvatar: "https://images.unsplash.com/photo-1572604745465-3f65869e2c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJsJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzYwODk2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", likes: 122, height: "h-[160px]", image: "https://images.unsplash.com/photo-1721884258144-5d788061e4c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xvdGhpbmclMjBzdG9yZXxlbnwxfHx8fDE3NzYwODk2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: 3, title: "周末城市公园野餐指南", author: "明明", authorAvatar: "https://images.unsplash.com/photo-1572604745465-3f65869e2c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJsJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzYwODk2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", likes: 89, height: "h-[180px]", image: "https://images.unsplash.com/photo-1668009219418-4ece0d9e36c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFya3xlbnwxfHx8fDE3NzYwODk2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: 4, title: "极简纯白风咖啡馆打卡", author: "明明", authorAvatar: "https://images.unsplash.com/photo-1572604745465-3f65869e2c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJsJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzYwODk2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", likes: 210, height: "h-[160px]", image: "https://images.unsplash.com/photo-1648462908676-8305f0eff8e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc2MDg5NjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  ];

  const mockShops = [
    { id: 1, name: "时光机复古杂货铺", rating: "4.8", distance: "1.2km", tags: ["复古", "杂货", "好店推荐"], price: "￥80/人", recommendation: "这里藏着80后的童年回忆", image: "https://images.unsplash.com/photo-1721884258144-5d788061e4c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xvdGhpbmclMjBzdG9yZXxlbnwxfHx8fDE3NzYwODk2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: 2, name: "半岛咖啡馆", rating: "4.9", distance: "3.5km", tags: ["咖啡", "下午茶", "高颜值"], price: "￥65/人", recommendation: "拿铁和海盐卷盲点不出错", image: "https://images.unsplash.com/photo-1648462908676-8305f0eff8e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc2MDg5NjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      {/* Top Background Pattern - using a subtle muted area instead of full gradient */}
      <div className="absolute top-0 inset-x-0 h-[180px] bg-gradient-to-b from-muted/80 to-background pointer-events-none" />

      {/* Header Actions */}
      <div className="pt-safe px-5 py-3 flex items-center justify-between z-20 sticky top-0">
        <span className="font-bold text-[16px] tracking-widest text-text-primary invisible">我的</span>
        <div className="flex gap-4 text-text-primary">
          <Share size={22} strokeWidth={2.5} className="cursor-pointer active:scale-95 transition-transform" />
          <Settings size={22} strokeWidth={2.5} className="cursor-pointer active:scale-95 transition-transform" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-[90px] z-10 relative px-4 no-scrollbar">
        {/* User Info Card */}
        <div className="bg-card rounded-[20px] shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-5 mb-[14px] border border-border/40 mt-6 relative z-20">
          <div className="flex justify-between items-start -mt-10 mb-3">
            <img 
              src="https://images.unsplash.com/photo-1572604745465-3f65869e2c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJsJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzYwODk2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Avatar" 
              className="w-[84px] h-[84px] rounded-full object-cover shadow-[0_4px_16px_rgba(0,0,0,0.06)] ring-4 ring-card bg-muted"
            />
            <button className="px-4 py-1.5 mt-10 bg-muted/60 hover:bg-muted text-text-primary rounded-full text-[12px] font-bold active:scale-95 transition-all flex items-center gap-1.5 border border-border/40 shadow-sm">
              <PenTool size={14} strokeWidth={2.5} /> <span>编辑资料</span>
            </button>
          </div>
          
          <h1 className="text-[22px] font-bold text-text-primary mb-[4px] tracking-tight">小明的小名叫明明</h1>
          
          <div className="flex items-center text-[12px] text-text-tertiary mb-[12px] gap-[6px] font-medium">
            <div className="flex items-center gap-[2px]">
              <MapPin size={12} strokeWidth={2.5} />
              <span>北京</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-primary/90 font-bold bg-primary/10 px-1.5 py-0.5 rounded text-[11px]">探店达人</span>
          </div>
          
          <p className="text-[14px] text-text-secondary leading-[20px] mb-5 line-clamp-2 max-w-[90%]">
            爱好摄影，喜欢打卡各种宝藏小店。<br/>关注我，带你发现城市里的美好~
          </p>

          {/* User Stats Area */}
          <div className="flex gap-8 border-t border-border/40 pt-4">
            <div className="flex flex-col items-center">
              <span className="font-bold text-text-primary text-[18px]">128</span>
              <span className="text-[11px] font-medium text-text-tertiary mt-[2px]">关注</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-text-primary text-[18px]">3.4k</span>
              <span className="text-[11px] font-medium text-text-tertiary mt-[2px]">粉丝</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-text-primary text-[18px]">12.5k</span>
              <span className="text-[11px] font-medium text-text-tertiary mt-[2px]">获赞与收藏</span>
            </div>
          </div>
        </div>

        {/* Content Tabs Area */}
        <div className="bg-card rounded-[20px] shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-border/40 overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Main Segmented Tabs */}
          <div className="flex border-b border-border/40 text-[15px] font-bold px-2 pt-2">
            {["笔记", "收藏", "赞过"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 relative transition-colors ${
                  activeTab === tab ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {tab}
                {tab === "笔记" ? " (12)" : tab === "收藏" ? " (45)" : " (102)"}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="profileTabIndicator"
                    className="absolute bottom-0 inset-x-0 mx-auto w-6 h-[3px] bg-primary rounded-t-full" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Sub Filters (Only for 收藏 and 赞过) */}
          {(activeTab === "收藏" || activeTab === "赞过") && (
            <div className="flex gap-[8px] px-4 py-3 border-b border-border/30 bg-muted/20">
              {["全部", "店铺", "笔记"].map(filter => (
                <button
                  key={filter}
                  onClick={() => setSubFilter(filter)}
                  className={`px-4 py-[6px] text-[12px] font-bold rounded-[10px] transition-all border ${
                    subFilter === filter 
                      ? "bg-text-primary text-background border-text-primary shadow-sm" 
                      : "bg-card text-text-secondary border-border/60 hover:text-text-primary shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
          
          {/* Feed Content */}
          <ListContainer state={appState} className="flex-1 bg-muted/10 p-3">
            {/* Show Notes */}
            {((activeTab === "笔记") || (activeTab !== "笔记" && (subFilter === "全部" || subFilter === "笔记"))) && (
              <div className="grid grid-cols-2 gap-[10px] mb-4">
                {mockNotes.map((note) => (
                  <FeedCard 
                    key={note.id} 
                    id={note.id} 
                    title={note.title} 
                    author={note.author} 
                    authorAvatar={note.authorAvatar}
                    likes={note.likes} 
                    liked={activeTab === "赞过"}
                    imageClassName={note.height}
                    image={note.image}
                  />
                ))}
              </div>
            )}
            
            {/* Show Shops */}
            {(activeTab !== "笔记" && (subFilter === "全部" || subFilter === "店铺")) && (
              <div className="flex flex-col gap-[10px]">
                {mockShops.map((shop) => (
                  <ShopCard 
                    key={shop.id}
                    id={shop.id}
                    name={shop.name}
                    rating={shop.rating}
                    price={shop.price}
                    recommendation={shop.recommendation}
                    image={shop.image}
                    distance={shop.distance}
                    tags={shop.tags}
                  />
                ))}
              </div>
            )}
          </ListContainer>
        </div>
      </div>
    </div>
  );
};
