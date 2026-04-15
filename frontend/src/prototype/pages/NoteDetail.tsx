import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ChevronLeft, Share2, Star, MessageSquare, Send, Heart, ChevronRight, MoreHorizontal, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../components/WireframeUI";
import { useStateContext } from "../context/StateContext";
import { ListContainer, CommentItem } from "../components/ditan";

// --- Mock Data ---
const MOCK_NOTE = {
  images: [
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    "https://images.unsplash.com/photo-1606757870480-975652100251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    "https://images.unsplash.com/photo-1688148484023-b56a9b91525a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
  ],
  author: {
    name: "审美控_林",
    avatar: "https://images.unsplash.com/photo-1564752423896-11d52fbf3257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    location: "北京",
    time: "2小时前"
  },
  title: "周末和闺蜜的宝藏下午茶店打卡，拍照绝绝子，随便拍都出片！",
  content: [
    "今天去了收藏已久的这家纯白极简风咖啡馆，真的没有让我失望！",
    "店内的每个角落都被精心布置过，光影随着时间变化在墙上游走，自带一种高级的克制美学。最爱他们家的这面老墙，配合落地窗透进来的阳光，仿佛一切都慢了下来。",
    "特别推荐他们家的手冲咖啡和海盐卷，甜度刚刚好。建议下午三四点的时候去，阳光照进来的感觉太治愈了，拍照完全不需要滤镜，原相机直出就很美～",
  ],
  tags: ["北京探店", "咖啡馆", "周末去哪儿", "极简美学"],
  likes: 1254,
  collected: 856,
  likedAvatars: [
    "https://images.unsplash.com/photo-1572604745465-3f65869e2c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    "https://images.unsplash.com/photo-1617355453845-6996ffeee4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  ]
};

const MOCK_STORE = {
  id: 1,
  name: "半岛咖啡馆 Peninsula Coffee",
  tags: ["咖啡", "高颜值", "距你 1.2km"],
  image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  rating: "4.9"
};

export const NoteDetail = () => {
  const navigate = useNavigate();
  const { appState } = useStateContext();
  
  // Interaction States
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [followState, setFollowState] = useState(0); // 0: unassigned, 1: followed, 2: mutual
  const [isLiked, setIsLiked] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  
  // Comment States
  const [commenting, setCommenting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, author: "夏日限定", content: "真的很好看！上周刚去过，老板人超好！", time: "昨天 18:00", likes: 45, liked: false, hasReply: true },
    { id: 2, author: "抹茶不加糖", content: "请问具体位置在哪里呀？周末想带朋友去。", time: "2小时前", likes: 12, liked: true, hasReply: false }
  ]);

  // Scroll Animation Setup
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  
  // Parallax and Header Animations
  const imageScale = useTransform(scrollY, [0, 300], [1, 0.92]);
  const imageOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);
  const headerOpacity = useTransform(scrollY, [150, 250], [0, 1]);
  const headerY = useTransform(scrollY, [150, 250], [-20, 0]);

  const handleImageScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const index = Math.round(target.scrollLeft / target.clientWidth);
    if (index !== currentImageIndex) setCurrentImageIndex(index);
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const newEntry = { id: Date.now(), author: "我", content: newComment, time: "刚刚", likes: 0, liked: false, hasReply: false };
    setComments([newEntry, ...comments]);
    setNewComment("");
    setCommenting(false);
  };

  const renderPageSkeleton = () => (
    <div className="flex-1 bg-background relative z-10">
      <Skeleton className="w-full h-[65vh] rounded-none bg-muted shrink-0" />
      <div className="p-5 flex-1 flex flex-col pt-6 bg-background rounded-t-[24px] -mt-6">
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 flex flex-col gap-1.5">
            <Skeleton className="w-28 h-4 rounded" />
            <Skeleton className="w-16 h-3 rounded" />
          </div>
        </div>
        <Skeleton className="w-[85%] h-6 mb-6 rounded" />
        <Skeleton className="w-full h-4 mb-2.5 rounded" />
        <Skeleton className="w-[90%] h-4 mb-6 rounded" />
      </div>
    </div>
  );

  return (
    <motion.div 
      className="w-full h-full bg-background relative flex flex-col shadow-[-10px_0_20px_rgba(0,0,0,0.1)]"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={(e, { offset, velocity }) => {
        if (offset.x > window.innerWidth * 0.3 || velocity.x > 500) {
          navigate(-1);
        }
      }}
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 30, mass: 1 }}
    >
      
      <ListContainer 
        state={appState} 
        loadingComponent={renderPageSkeleton()}
        emptyMessage="抱歉，该内容不存在或已被删除"
        className="flex-1 flex flex-col relative z-0 h-full"
      >
        <div ref={scrollRef} className="w-full h-full overflow-y-auto no-scrollbar relative">
          
          {/* Immersive Scroll-Linked Top Navigation */}
          <motion.div 
            style={{ opacity: headerOpacity, y: headerY }}
            className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-2xl border-b border-border/50 pt-[max(env(safe-area-inset-top,0px),24px)] px-14 pb-2.5 flex items-center justify-center shadow-sm"
          >
            <div className="flex items-center gap-2">
              <img src={MOCK_NOTE.author.avatar} className="w-6 h-6 rounded-full object-cover" />
              <span className="font-bold text-[14px] text-text-primary">{MOCK_NOTE.author.name}</span>
            </div>
          </motion.div>

          {/* Floating Action Buttons */}
          <div className="fixed top-[max(env(safe-area-inset-top,0px),16px)] inset-x-0 px-4 py-2 flex justify-between z-[60] pointer-events-none mt-2">
            <button 
              onClick={() => navigate(-1)} 
              className="pointer-events-auto w-9 h-9 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform"
            >
              <ChevronLeft size={22} strokeWidth={2.5} className="-ml-0.5" />
            </button>
            <button className="pointer-events-auto w-9 h-9 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform">
              <MoreHorizontal size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* 1. Top Image Carousel (Immersive Parallax) */}
          <div className="sticky top-0 z-0 h-[65vh] w-full overflow-hidden bg-muted">
            <motion.div 
              style={{ scale: imageScale, opacity: imageOpacity }} 
              className="w-full h-full origin-top relative"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div 
                className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
                onScroll={handleImageScroll}
              >
                {MOCK_NOTE.images.map((img, i) => (
                  <div key={i} className="w-full h-full shrink-0 snap-center relative">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              
              {/* Bottom Gradient Mask */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              
              {/* Image Pagination Dots */}
              <div className="absolute bottom-10 inset-x-0 flex justify-center gap-1.5 z-10 pointer-events-none">
                {MOCK_NOTE.images.map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ width: i === currentImageIndex ? 16 : 6, opacity: i === currentImageIndex ? 1 : 0.5 }}
                    className="h-1.5 bg-white rounded-full shadow-sm"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content Area (Overlaps the sticky image) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="relative z-10 bg-background min-h-[100vh] -mt-6 rounded-t-[24px] shadow-[0_-4px_30px_rgba(0,0,0,0.06)] pb-safe"
          >
            {/* Grabber indicator */}
            <div className="w-full flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-border/80 rounded-full" />
            </div>

            <div className="px-5">
              {/* 2. User Info Area */}
              <div className="flex items-center justify-between mb-5 mt-1">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-border/60">
                    <img src={MOCK_NOTE.author.avatar} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[15px] text-text-primary tracking-tight">{MOCK_NOTE.author.name}</span>
                    <span className="text-[11px] font-medium text-text-tertiary">{MOCK_NOTE.author.location} • {MOCK_NOTE.author.time}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setFollowState(f => (f + 1) % 3)} 
                  className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all active:scale-95 ${
                    followState === 0 ? 'bg-text-primary text-background' : 
                    followState === 1 ? 'bg-muted/80 text-text-secondary border border-border/60' : 
                    'bg-muted/80 text-text-secondary border border-border/60 flex items-center gap-1'
                  }`}
                >
                  {followState === 0 ? '关注' : followState === 1 ? '已关注' : '互相关注'}
                </button>
              </div>

              {/* 3. Title & Content */}
              <h1 className="text-[19px] font-bold text-text-primary leading-[1.4] tracking-tight mb-3">
                {MOCK_NOTE.title}
              </h1>
              
              <div className="text-[15px] text-text-primary/90 leading-[1.75] space-y-4 mb-6">
                {MOCK_NOTE.content.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                {MOCK_NOTE.tags.map(tag => (
                  <span key={tag} className="text-[13px] text-blue-600/90 font-bold bg-blue-50/80 px-3 py-1.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="text-[12px] text-text-tertiary mb-5">编辑于 {MOCK_NOTE.author.time}</div>

              {/* 4. Store Card (Core) */}
              <motion.div 
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/store/${MOCK_STORE.id}`)}
                className="bg-card rounded-[18px] p-3.5 flex items-center gap-3.5 mb-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-border/60 cursor-pointer"
              >
                <div className="w-[52px] h-[52px] rounded-[14px] bg-muted overflow-hidden shrink-0">
                  <img src={MOCK_STORE.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <h4 className="text-[15px] font-bold text-text-primary leading-tight mb-1">{MOCK_STORE.name}</h4>
                  <div className="flex items-center gap-1.5 text-[12px] text-text-secondary font-medium">
                    <Star size={12} className="text-amber-500 fill-amber-500 mb-0.5" />
                    <span className="text-amber-600/90 font-bold">{MOCK_STORE.rating}</span>
                    <span className="text-border">|</span>
                    <span>{MOCK_STORE.tags.join(" • ")}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center border border-border/40">
                  <ChevronRight size={16} className="text-text-tertiary ml-0.5" />
                </div>
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-border/40 my-6 mx-[-20px]" />

              {/* 5. Interaction Area & Liked Users */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-6">
                  {/* Like Button */}
                  <button 
                    onClick={() => setIsLiked(!isLiked)} 
                    className="flex items-center gap-1.5 group"
                  >
                    <motion.div animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
                      <Heart size={24} strokeWidth={isLiked ? 2.5 : 2} className={isLiked ? "text-red-500 fill-red-500" : "text-text-secondary"} />
                    </motion.div>
                    <span className={`text-[14px] font-bold ${isLiked ? 'text-red-500' : 'text-text-secondary'}`}>
                      {MOCK_NOTE.likes + (isLiked ? 1 : 0)}
                    </span>
                  </button>
                  
                  {/* Collect Button */}
                  <button 
                    onClick={() => setIsCollected(!isCollected)} 
                    className="flex items-center gap-1.5 group"
                  >
                    <motion.div animate={isCollected ? { scale: [1, 1.3, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
                      <Star size={24} strokeWidth={isCollected ? 2.5 : 2} className={isCollected ? "text-amber-400 fill-amber-400" : "text-text-secondary"} />
                    </motion.div>
                    <span className={`text-[14px] font-bold ${isCollected ? 'text-amber-500' : 'text-text-secondary'}`}>
                      {MOCK_NOTE.collected + (isCollected ? 1 : 0)}
                    </span>
                  </button>
                  
                  {/* Comment Action */}
                  <button onClick={() => setCommenting(true)} className="flex items-center gap-1.5 group">
                    <MessageSquare size={24} strokeWidth={2} className="text-text-secondary group-active:scale-95 transition-transform" />
                    <span className="text-[14px] font-bold text-text-secondary">{comments.length + 126}</span>
                  </button>
                </div>
              </div>

              {/* Liked Avatars Horizontal List */}
              <div className="bg-muted/40 rounded-[16px] p-3 flex items-center justify-between mb-8 border border-border/40">
                <div className="flex -space-x-2.5 overflow-hidden px-1">
                  {MOCK_NOTE.likedAvatars.map((src, i) => (
                    <div key={i} className="w-[26px] h-[26px] rounded-full border-2 border-background overflow-hidden shrink-0 z-10 relative">
                      <img src={src} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-[26px] h-[26px] rounded-full border-2 border-background bg-muted flex items-center justify-center shrink-0 z-10 relative">
                    <MoreHorizontal size={12} className="text-text-tertiary" />
                  </div>
                </div>
                <div className="text-[12px] font-bold text-text-tertiary mr-2">
                  等 {MOCK_NOTE.likes} 人觉得很赞
                </div>
              </div>

              {/* 6. Comments Section */}
              <div>
                <h3 className="font-bold text-[16px] text-text-primary mb-5 tracking-tight">共 {comments.length + 126} 条评论</h3>
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
        </div>

        {/* Global Bottom Input Bar */}
        {(appState === 'Normal' || appState === 'Loading') && !commenting && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-0 inset-x-0 h-[64px] bg-background/80 backdrop-blur-xl border-t border-border/40 flex items-center px-5 gap-3 z-50 pb-safe"
          >
            <div 
              onClick={() => setCommenting(true)}
              className="flex-1 bg-muted/80 h-10 rounded-full flex items-center px-4 text-text-tertiary hover:bg-muted transition-colors cursor-pointer border border-border/40"
            >
              <span className="font-medium text-[14px]">说点什么...</span>
            </div>
            <div className="flex gap-4 text-text-primary px-2">
              <button onClick={() => setIsLiked(!isLiked)} className="active:scale-90 transition-transform">
                <Heart size={26} strokeWidth={isLiked ? 2.5 : 2} className={isLiked ? "text-red-500 fill-red-500" : "text-text-primary"} />
              </button>
              <button onClick={() => setIsCollected(!isCollected)} className="active:scale-90 transition-transform">
                <Star size={26} strokeWidth={isCollected ? 2.5 : 2} className={isCollected ? "text-amber-400 fill-amber-400" : "text-text-primary"} />
              </button>
            </div>
          </motion.div>
        )}
      </ListContainer>

      {/* Comment Input Modal */}
      <AnimatePresence>
        {commenting && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-50"
              onClick={() => setCommenting(false)}
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
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="说点什么，友善的交流让人心情愉悦..."
                  className="w-full h-24 bg-transparent resize-none outline-none text-[15px] text-text-primary placeholder:text-text-tertiary leading-relaxed"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handlePostComment}
                  disabled={!newComment.trim()}
                  className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-bold text-[14px] transition-all ${
                    newComment.trim() 
                      ? "bg-text-primary text-background shadow-md active:scale-95" 
                      : "bg-muted text-text-tertiary cursor-not-allowed"
                  }`}
                >
                  <Send size={16} strokeWidth={2.5} /> 发送
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
