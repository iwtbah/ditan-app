import React, { useState } from "react";
import { Skeleton } from "../components/WireframeUI";
import { useStateContext } from "../context/StateContext";
import { Header, CategoryChips, ListContainer, FeedCard, ShopCard } from "../components/ditan";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const mockNotes = [
  { id: 1, title: "周末和闺蜜的宝藏下午茶店打卡，拍照绝绝子", author: "小透明", likes: 234, height: "h-48", liked: true },
  { id: 2, title: "城市露营体验 | 不出城也能拥抱大自然", author: "户外探路者", likes: 102, height: "h-64", liked: false },
  { id: 3, title: "这家深夜食堂，温暖了整个城市的胃口", author: "吃货老陈", likes: 890, height: "h-56", liked: true },
  { id: 4, title: "极简纯白风咖啡馆，随便拍都出片", author: "审美控", likes: 56, height: "h-40", liked: false },
  { id: 5, title: "隐藏在弄堂里的古着店，淘到宝了", author: "复古女孩", likes: 412, height: "h-72", liked: false },
  { id: 6, title: "绝美日落观景台，情侣约会必去", author: "浪漫主义者", likes: 1120, height: "h-48", liked: true },
];

const mockShops = [
  { id: 1, name: "时光机复古杂货铺", rating: "4.8", distance: "1.2km", tags: ["复古", "杂货", "好店推荐"], price: "￥80/人", recommendation: "这里藏着80后的童年回忆", image: "https://images.unsplash.com/photo-1443884590026-2e4d21aee71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc2hvcHxlbnwxfHx8fDE3NzYwODM0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 2, name: "半岛咖啡馆", rating: "4.9", distance: "3.5km", tags: ["咖啡", "下午茶", "高颜值"], price: "￥65/人", recommendation: "拿铁和海盐卷盲点不出错", image: "https://images.unsplash.com/photo-1567880905822-56f8e06fe630?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjYWZlfGVufDF8fHx8MTc3NjA4MzQyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 3, name: "不打烊小酒馆", rating: "4.7", distance: "2.1km", tags: ["精酿", "氛围感", "深夜食堂"], price: "￥120/人", recommendation: "氛围绝佳，精酿啤酒种类多", image: "https://images.unsplash.com/photo-1558210598-89ba75b1724e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJ8ZW58MXx8fHwxNzc2MDgzNDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 4, name: "山居秋野民宿", rating: "5.0", distance: "15km", tags: ["周末好去处", "自然", "避世"], price: "￥300/人", recommendation: "推开窗就是漫山遍野的绿意", image: "https://images.unsplash.com/photo-1618111415065-c20b4e1afd41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWQlMjBhbmQlMjBicmVha2Zhc3R8ZW58MXx8fHwxNzc2MDgzNDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

export const Home = () => {
  const { appState } = useStateContext();
  const navigate = useNavigate();
  const [contentType, setContentType] = useState("探店日记"); // 探店日记 or 店铺
  const [activeCategory, setActiveCategory] = useState("推荐");

  const renderSkeleton = () => {
    if (contentType === "店铺") {
      return (
        <div className="flex flex-col gap-sm">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-card rounded-xl p-md flex items-center justify-between border border-border">
              <div className="flex items-center gap-md w-full">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex flex-col gap-xs flex-1">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div className="flex gap-sm">
        <div className="flex-1 flex flex-col gap-sm">
          {[1, 2, 3].map(i => <SkeletonNote key={`left-${i}`} height={i % 2 === 0 ? "h-64" : "h-48"} />)}
        </div>
        <div className="flex-1 flex flex-col gap-sm">
          {[4, 5, 6].map(i => <SkeletonNote key={`right-${i}`} height={i % 2 !== 0 ? "h-56" : "h-40"} />)}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-muted">
      {/* Top Header */}
      <div className="pt-safe bg-background/80 backdrop-blur-xl z-50 sticky top-0 shadow-sm border-b border-border/40">
        {/* Search Bar Area */}
        <Header 
          city="北京" 
          placeholder="搜索你想去的探店..." 
          readOnly={true}
          onClick={() => navigate("/search")}
          className="border-none pb-0 bg-transparent backdrop-blur-none"
        />
        
        {/* Content Type Switch (Primary Tab) */}
        <div className="px-lg pt-2 pb-1 flex justify-center w-full relative z-10">
          <div className="flex bg-muted/80 backdrop-blur-sm rounded-[12px] p-[3px] relative w-[220px] shadow-inner border border-border/40">
            <div 
              className={`absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] bg-card rounded-[9px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-border/60 transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${
                contentType === "店铺" ? "translate-x-[100%]" : "translate-x-0"
              }`}
            />
            <button 
              onClick={() => setContentType("探店日记")}
              className={`flex-1 py-[6px] text-[14px] font-bold rounded-lg relative z-10 transition-colors ${
                contentType === "探店日记" ? "text-text-primary" : "text-text-tertiary"
              }`}
            >
              探店日记
            </button>
            <button 
              onClick={() => setContentType("店铺")}
              className={`flex-1 py-[6px] text-[14px] font-bold rounded-lg relative z-10 transition-colors ${
                contentType === "店铺" ? "text-text-primary" : "text-text-tertiary"
              }`}
            >
              店铺
            </button>
          </div>
        </div>
        
        {/* Category Filter (Secondary Scrollable Chips) */}
        <CategoryChips 
          tags={["推荐", "美食", "咖啡", "火锅", "运动", "景点", "展览"]} 
          activeTag={activeCategory} 
          onChange={setActiveCategory} 
          className="mt-sm mb-xs"
        />
      </div>

      {/* Feed Layout (ListContainer) */}
      <div className="flex-1 overflow-y-auto bg-muted p-sm relative">
        <ListContainer 
          state={appState} 
          loadingComponent={renderSkeleton()} 
          emptyMessage={`暂无${activeCategory}相关内容`}
          errorMessage="首页内容加载失败"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={contentType + activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {contentType === "探店日记" ? (
                <div className="flex gap-sm">
                  {/* Left Column */}
                  <div className="flex-1 flex flex-col gap-sm">
                    {mockNotes.filter((_, i) => i % 2 === 0).map((note, index) => (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <FeedCard 
                          id={note.id}
                          title={note.title}
                          author={note.author}
                          likes={note.likes}
                          liked={note.liked}
                          imageClassName={note.height}
                        />
                      </motion.div>
                    ))}
                  </div>
                  {/* Right Column */}
                  <div className="flex-1 flex flex-col gap-sm">
                    {mockNotes.filter((_, i) => i % 2 !== 0).map((note, index) => (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <FeedCard 
                          id={note.id}
                          title={note.title}
                          author={note.author}
                          likes={note.likes}
                          liked={note.liked}
                          imageClassName={note.height}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-sm">
                  {mockShops.map((shop, index) => (
                    <motion.div 
                      key={shop.id} 
                      className="flex flex-col gap-2"
                      initial={{ opacity: 0, scale: 0.97, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <ShopCard 
                        id={shop.id}
                        name={shop.name}
                        rating={shop.rating}
                        price={shop.price}
                        recommendation={shop.recommendation}
                        image={shop.image}
                        distance={shop.distance}
                        tags={shop.tags}
                      />
                      {/* Suggestion to show a recommended note below the shop as requested */}
                      <div className="ml-12 pl-2 border-l-2 border-primary/20">
                        <div className="text-caption text-text-secondary flex items-center gap-1">
                          <span className="font-bold text-primary">推荐笔记</span>
                          <span>"周末必须去打卡的绝美圣地..."</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </ListContainer>
      </div>
    </div>
  );
};

// Loading Skeleton Component
const SkeletonNote = ({ height }: { height: string }) => (
  <div className="bg-card rounded-lg overflow-hidden flex flex-col shadow-card border border-border p-md">
    <Skeleton className={`w-full ${height} mb-sm rounded-md bg-muted`} />
    <Skeleton className="h-4 w-[90%] mb-[8px]" />
    <Skeleton className="h-4 w-[60%] mb-[16px]" />
    <div className="flex items-center justify-between mt-auto">
      <div className="flex items-center gap-[6px]">
        <Skeleton className="w-4 h-4 rounded-full" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-3 w-8" />
    </div>
  </div>
);
