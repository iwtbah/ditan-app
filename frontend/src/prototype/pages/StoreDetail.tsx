import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ChevronLeft, Share2, MapPin, Phone, Star, Ticket, ChevronRight, Navigation, Clock, Camera, Heart, X, Edit3, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../components/WireframeUI";
import { useStateContext } from "../context/StateContext";
import { ListContainer } from "../components/ditan";

// --- Mock Data ---
const STORE = {
  name: "时光机复古杂货铺",
  rating: "4.8",
  price: "￥120/人",
  tags: ["出片率高", "复古风", "手冲咖啡", "宠物友好"],
  address: "东城区交道口南大街15号院内",
  distance: "2.4km",
  walkTime: "步行约15分钟",
  images: [
    "https://images.unsplash.com/photo-1571217748526-261477b6ac62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    "https://images.unsplash.com/photo-1606757870480-975652100251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
  ],
  image: "https://images.unsplash.com/photo-1571217748526-261477b6ac62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
};

const COUPONS = [
  { id: 1, title: "79元 代 100元 饮品甜点券", sales: "半年售 1200+", type: "代金券", oldPrice: "100", newPrice: "79" },
  { id: 2, title: "双人复古下午茶套餐", sales: "半年售 800+", type: "套餐", oldPrice: "258", newPrice: "188" }
];

const DISHES = [
  { id: 1, name: "招牌手冲瑰夏", reason: "进店必点", image: "https://images.unsplash.com/photo-1753109818506-2c4c39c16c9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400" },
  { id: 2, name: "焦糖海盐卷", reason: "甜而不腻", image: "https://images.unsplash.com/photo-1680090966795-06fdd0e7046b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400" },
  { id: 3, name: "牛油果轻食吐司", reason: "健康轻食", image: "https://images.unsplash.com/photo-1593903971086-da1ad90da20b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400" }
];

const REVIEWS = [
  { id: 1, author: "咖啡脑袋", avatar: "https://images.unsplash.com/photo-1564752423896-11d52fbf3257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", content: "氛围感拉满，手冲味道很干净，老板人超级好！还会再来的宝藏店铺。", likes: 124, rating: 5 },
  { id: 2, author: "周末探店", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", content: "位置有点隐蔽，但是进去别有洞天，非常适合拍照出片，强烈推荐大家下午光线好的时候来！", likes: 89, rating: 4 },
];

const SELECTED_NOTES = [
  { id: 1, title: "必打卡的复古小店，随手拍出大片感", author: "小透明", avatar: "https://images.unsplash.com/photo-1564752423896-11d52fbf3257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", likes: 234, image: "https://images.unsplash.com/photo-1688148484023-b56a9b91525a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: 2, title: "在这里待了一整个下午，太治愈了", author: "审美控", avatar: "https://images.unsplash.com/photo-1572604745465-3f65869e2c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", likes: 89, image: "https://images.unsplash.com/photo-1704354924223-d44ef8283cce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: 3, title: "打卡这杯手冲，口感很惊喜", author: "咖啡重度患者", avatar: "https://images.unsplash.com/photo-1617355453845-6996ffeee4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", likes: 156, image: "https://images.unsplash.com/photo-1622979059365-5952c36686e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" }
];

const ALL_NOTES = [
  ...SELECTED_NOTES,
  { id: 4, title: "城市露营体验 | 推荐这家宝藏店", author: "户外探路", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", likes: 102, height: "h-[220px]", image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: 5, title: "周末探店指南，赶紧收藏", author: "吃货", avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", likes: 412, height: "h-[260px]", image: "https://images.unsplash.com/photo-1606757870480-975652100251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: 6, title: "私藏咖啡馆，一般人我不告诉他", author: "老北京", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", likes: 55, height: "h-[180px]", image: "https://images.unsplash.com/photo-1571217748526-261477b6ac62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" }
];

// --- Restrained Feed Card (Light Card) ---
const RestrainedFeedCard = ({ note }: { note: any }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/note/${note.id}`)}
      className="relative rounded-[16px] overflow-hidden mb-4 bg-muted shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-border/40 cursor-pointer group"
    >
      <div className={`w-full ${note.height || 'h-[180px]'} relative bg-muted/50`}>
        <img 
          src={note.image} 
          alt={note.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-80" />
      </div>

      <div className="absolute bottom-0 inset-x-0 p-3 flex flex-col gap-2 z-10">
        <h3 className="text-[13px] font-bold text-white/90 leading-[1.4] line-clamp-2 drop-shadow-sm">
          {note.title}
        </h3>
        
        <div className="flex items-center justify-between mt-0.5">
          <div className="flex items-center gap-1.5 opacity-90">
            <div className="w-4 h-4 rounded-full overflow-hidden bg-white/20 backdrop-blur-md">
              <img src={note.avatar} alt={note.author} className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] font-medium text-white/80 drop-shadow-sm">{note.author}</span>
          </div>
          
          <div className="flex items-center gap-1 text-white/80">
            <Heart size={11} strokeWidth={2.5} fill="none" className="text-white/80" />
            <span className="text-[11px] font-bold drop-shadow-sm">{note.likes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const StoreDetail = () => {
  const navigate = useNavigate();
  const { appState } = useStateContext();
  
  // States
  const [isCollected, setIsCollected] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Scroll Animation Setup
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  
  // Parallax and Header Animations
  const imageScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0.4]);
  const imageY = useTransform(scrollY, [0, 300], [0, 80]);
  const headerOpacity = useTransform(scrollY, [150, 220], [0, 1]);
  const headerY = useTransform(scrollY, [150, 220], [-10, 0]);

  const handleImageScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const index = Math.round(target.scrollLeft / target.clientWidth);
    if (index !== currentImageIndex) setCurrentImageIndex(index);
  };

  const renderPageSkeleton = () => (
    <div className="flex-1 bg-background relative z-10 overflow-hidden">
      <Skeleton className="w-full h-[50vh] rounded-none bg-muted shrink-0" />
      <div className="relative z-20 mx-4 -mt-20 bg-card rounded-[20px] p-5 shadow-sm">
        <Skeleton className="w-3/4 h-7 mb-4 rounded-md" />
        <Skeleton className="w-1/2 h-4 mb-4 rounded" />
        <div className="flex gap-2">
          <Skeleton className="w-16 h-8 rounded-lg" />
          <Skeleton className="w-16 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-background relative flex flex-col">
      
      <ListContainer 
        state={appState} 
        loadingComponent={renderPageSkeleton()}
        emptyMessage="抱歉，该店铺不存在或已打烊"
        className="flex-1 flex flex-col relative z-0 h-full bg-background"
      >
        <div ref={scrollRef} className="w-full h-full overflow-y-auto no-scrollbar relative pb-[90px]">
          
          {/* Immersive Scroll-Linked Top Navigation (Becomes Sticky Info Card) */}
          <motion.div 
            style={{ opacity: headerOpacity, y: headerY }}
            className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-2xl border-b border-border/40 pt-[max(env(safe-area-inset-top,0px),24px)] px-14 pb-3 flex flex-col items-center justify-center shadow-sm"
          >
            <span className="font-bold text-[16px] text-text-primary truncate max-w-[200px]">
              {STORE.name}
            </span>
            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-text-secondary font-medium">
              <Star size={10} className="text-amber-500 fill-amber-500" />
              <span className="text-amber-600 font-bold">{STORE.rating}</span>
              <span>•</span>
              <span>{STORE.price}</span>
            </div>
          </motion.div>

          {/* Floating Action Buttons */}
          <div className="fixed top-[max(env(safe-area-inset-top,0px),16px)] inset-x-0 px-4 py-2 flex justify-between z-[60] pointer-events-none mt-2">
            <button 
              onClick={() => navigate(-1)} 
              className="pointer-events-auto w-9 h-9 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform shadow-sm"
            >
              <ChevronLeft size={22} strokeWidth={2.5} className="-ml-0.5" />
            </button>
            <button className="pointer-events-auto w-9 h-9 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform shadow-sm">
              <Share2 size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* 1. Top Image (Immersive Parallax 40-50% height) */}
          <div className="sticky top-0 z-0 h-[48vh] w-full overflow-hidden bg-muted">
            <motion.div 
              style={{ scale: imageScale, opacity: imageOpacity, y: imageY }} 
              className="w-full h-full origin-top relative"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div 
                className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
                onScroll={handleImageScroll}
              >
                {STORE.images.map((img, i) => (
                  <div key={i} className="w-full h-full shrink-0 snap-center relative">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              
              {/* Image Pagination Dots */}
              <div className="absolute bottom-28 inset-x-0 flex justify-center gap-1.5 z-10 pointer-events-none">
                {STORE.images.map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ width: i === currentImageIndex ? 16 : 6, opacity: i === currentImageIndex ? 1 : 0.5 }}
                    className="h-1.5 bg-white rounded-full shadow-sm"
                  />
                ))}
              </div>
              
              {/* Bottom Gradient Mask (20-30% coverage visually) */}
              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none opacity-90" />
            </motion.div>
          </div>

          {/* Main Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="relative z-10 min-h-[100vh]"
          >
            {/* Solid background layer starting just below the card's top edge to hide the image scrolling behind */}
            <div className="absolute inset-x-0 bottom-0 -top-4 bg-background rounded-t-[32px] -z-10 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]" />

            {/* 2. Store Info Card (Floating over image) */}
            <div className="mx-4 -mt-20 bg-card rounded-[20px] p-5 pb-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-border/40 relative z-20">
              <div className="flex justify-between items-start mb-3">
                <h1 className="text-[20px] font-bold text-text-primary leading-[1.3] tracking-tight pr-4">
                  {STORE.name}
                </h1>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border/60 shrink-0 text-text-secondary active:scale-95 transition-transform shadow-sm">
                  <Phone size={18} strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md text-amber-600">
                  <Star size={14} fill="currentColor" />
                  <span className="font-bold text-[14px]">{STORE.rating}</span>
                </div>
                <span className="text-[13px] font-bold text-text-secondary">{STORE.price}</span>
                <span className="text-[12px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md">
                  本地人气榜第1名
                </span>
              </div>

              {/* Highlights Chips */}
              <div className="flex gap-2 flex-wrap mb-4">
                {STORE.tags.map(tag => (
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

              {/* Address Line */}
              <div className="flex items-center justify-between pt-1 group cursor-pointer active:opacity-70 transition-opacity">
                <div className="flex items-start gap-2.5 flex-1 pr-4">
                  <MapPin size={18} className="text-text-tertiary mt-0.5 shrink-0" strokeWidth={2.5} />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-bold text-text-primary leading-tight">{STORE.address}</span>
                    <span className="text-[11px] font-medium text-text-tertiary">距离您 {STORE.distance} • {STORE.walkTime}</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-text-tertiary shrink-0" strokeWidth={2.5} />
              </div>
            </div>

            {/* 3. Coupon / Activity Banner */}
            <div className="mx-4 mt-5">
              <motion.div 
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsCouponOpen(true)}
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

            {/* Content Modules (Rhythm & Richness) */}

            {/* ① Selected Notes (Large Cards Horizontal) */}
            <div className="mt-8">
              <div className="px-5 flex items-center justify-between mb-4">
                <h3 className="text-[17px] font-bold text-text-primary tracking-tight">精选探店</h3>
                <span className="text-[12px] font-bold text-text-tertiary flex items-center gap-0.5 cursor-pointer active:opacity-70">
                  全部 <ChevronRight size={14} />
                </span>
              </div>
              
              <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 gap-3 pb-2">
                {SELECTED_NOTES.map(note => (
                  <motion.div 
                    key={note.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/note/${note.id}`)}
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

            {/* ② Recommended Dishes (Medium Cards Horizontal) */}
            <div className="mt-8">
              <div className="px-5 mb-4">
                <h3 className="text-[17px] font-bold text-text-primary tracking-tight">推荐菜品</h3>
              </div>
              <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 gap-3 pb-2">
                {DISHES.map(dish => (
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

            {/* ③ Hot Reviews (Small Cards Vertical) */}
            <div className="mt-8 px-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[17px] font-bold text-text-primary tracking-tight">热门评价</h3>
                <span className="text-[12px] font-bold text-text-tertiary flex items-center gap-0.5 cursor-pointer active:opacity-70">
                  共 342 条 <ChevronRight size={14} />
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {REVIEWS.map(review => (
                  <motion.div 
                    key={review.id}
                    whileTap={{ scale: 0.98 }}
                    className="bg-muted/40 rounded-[14px] p-3.5 flex gap-3 border border-border/40 cursor-pointer"
                  >
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
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={10} fill={i < (review.rating || 5) ? "currentColor" : "none"} strokeWidth={1.5} />
                        ))}
                      </div>
                      <p className="text-[13px] text-text-secondary leading-[1.5] line-clamp-2">
                        {review.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ④ All Notes Feed (Light Cards Masonry) */}
            <div className="px-5 mt-10 pb-8 bg-background">
              <h3 className="text-[17px] font-bold text-text-primary tracking-tight mb-5">更多探店内容</h3>
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col">
                  {ALL_NOTES.filter((_, i) => i % 2 === 0).map(note => (
                    <RestrainedFeedCard key={note.id} note={note} />
                  ))}
                </div>
                <div className="flex-1 flex flex-col">
                  {ALL_NOTES.filter((_, i) => i % 2 !== 0).map(note => (
                    <RestrainedFeedCard key={note.id} note={note} />
                  ))}
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>

        {/* --- 5. Global Fixed Bottom Action Bar --- */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-0 inset-x-0 bg-background/80 backdrop-blur-2xl border-t border-border/40 px-5 py-3 pb-safe flex items-center gap-6 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]"
        >
          <div className="flex gap-5 pl-1 shrink-0">
            <button 
              onClick={() => setIsCollected(!isCollected)} 
              className="flex flex-col items-center justify-center gap-1 text-text-secondary active:scale-90 transition-transform"
            >
              <Star size={22} strokeWidth={isCollected ? 2.5 : 2} fill={isCollected ? "currentColor" : "none"} className={isCollected ? "text-amber-500" : ""} />
              <span className={`text-[10px] font-bold ${isCollected ? 'text-amber-600' : ''}`}>{isCollected ? '已收藏' : '收藏'}</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 text-text-secondary active:scale-90 transition-transform">
              <Edit3 size={22} strokeWidth={2} />
              <span className="text-[10px] font-bold">写评价</span>
            </button>
          </div>
          
          <button className="flex-1 bg-text-primary text-background rounded-full py-[12px] flex items-center justify-center gap-2 font-bold text-[15px] active:scale-95 transition-transform shadow-md">
            <Navigation size={18} strokeWidth={2.5} /> 导航去这里
          </button>
        </motion.div>

      </ListContainer>

      {/* Bottom Sheet for Coupons (Glassmorphism) */}
      <AnimatePresence>
        {isCouponOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 z-[60]"
              onClick={() => setIsCouponOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="absolute bottom-0 inset-x-0 bg-background/85 backdrop-blur-3xl rounded-t-[28px] z-[70] p-6 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col border-t border-border/40"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[19px] font-bold text-text-primary tracking-tight">优惠与活动</h2>
                <button onClick={() => setIsCouponOpen(false)} className="w-8 h-8 bg-muted/60 rounded-full flex items-center justify-center text-text-secondary active:scale-95 transition-transform">
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4 pb-6">
                {COUPONS.map(coupon => (
                  <div key={coupon.id} className="bg-card/90 backdrop-blur-md border border-border/60 rounded-[20px] p-4 flex flex-col gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden">
                    <div className="absolute top-1/2 -left-2 w-4 h-4 bg-background/50 rounded-full -translate-y-1/2 border-r border-border/60" />
                    <div className="absolute top-1/2 -right-2 w-4 h-4 bg-background/50 rounded-full -translate-y-1/2 border-l border-border/60" />
                    
                    <div className="flex justify-between items-start px-2">
                      <div className="flex gap-3.5">
                        <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-[12px] flex items-center justify-center text-amber-500 shrink-0">
                          <Ticket size={24} strokeWidth={2} />
                        </div>
                        <div>
                          <h4 className="text-[16px] font-bold text-text-primary mb-1 tracking-tight">{coupon.title}</h4>
                          <span className="bg-red-50 dark:bg-red-500/10 text-red-600 text-[11px] px-2 py-0.5 rounded font-bold">{coupon.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[20px] font-bold text-amber-600"><span className="text-[12px]">￥</span>{coupon.newPrice}</div>
                        <div className="text-[12px] font-medium text-text-tertiary line-through">￥{coupon.oldPrice}</div>
                      </div>
                    </div>
                    
                    <div className="border-t border-dashed border-border/60 pt-3.5 flex justify-between items-center mt-1 px-2">
                      <div className="text-[12px] font-bold text-text-tertiary">{coupon.sales} • 随时退 • 过期退</div>
                      <button className="bg-amber-500 text-white font-bold text-[13px] px-5 py-2 rounded-full active:scale-95 transition-transform shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
                        立即抢购
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
