import React, { useState, useEffect } from "react";
import { Camera, X, MapPin, ChevronRight, Hash, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_IMAGES = [
  "https://images.unsplash.com/photo-1696350826221-983026d1c627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc3NjEwODg5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NzYxMzMxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1623334044303-241021148842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnR8ZW58MXx8fHwxNzc2MDU1MDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
];

export const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState(INITIAL_IMAGES);
  const [storeOpen, setStoreOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<{name: string, city: string} | null>(null);
  const [isRecommended, setIsRecommended] = useState(true);

  // Auto-save draft effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        toast.success("已自动保存草稿", { 
          position: "top-center", 
          duration: 1500,
          style: { background: 'var(--color-card)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }
        });
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [title, content]);

  const canPublish = title.trim() || content.trim() || images.length > 0;

  const handlePublish = () => {
    if (!canPublish) return;
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "正在发布...",
        success: () => {
          setTimeout(() => navigate(-1), 500);
          return "发布成功！";
        },
        error: "发布失败，请重试"
      }
    );
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const storeOptions = [
    { name: "时光机复古杂货铺", city: "上海" },
    { name: "半岛咖啡馆", city: "杭州" },
    { name: "不打烊小酒馆", city: "成都" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col h-full bg-background absolute inset-0 z-[200]"
    >
      {/* Top Header */}
      <div className="pt-safe px-4 py-[14px] flex items-center justify-between bg-background/80 backdrop-blur-xl border-b border-border/40 z-20 sticky top-0 shadow-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="p-1.5 -ml-1.5 text-text-primary hover:bg-muted rounded-full transition-colors active:scale-95"
        >
          <X size={26} strokeWidth={2} />
        </button>
        
        <button 
          onClick={handlePublish}
          disabled={!canPublish}
          className={`px-[18px] py-[8px] text-[15px] font-bold rounded-full transition-all duration-200 shadow-sm ${
            canPublish 
              ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 shadow-[0_2px_10px_rgba(var(--color-primary),0.3)]" 
              : "bg-muted text-text-tertiary cursor-not-allowed shadow-none"
          }`}
        >
          发布
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[100px] flex flex-col relative z-10">
        
        {/* 1. Image Uploader Row */}
        <div className="px-4 pt-6 pb-2">
          <div className="flex gap-[12px] overflow-x-auto no-scrollbar pb-4 snap-x">
            <button className="w-[104px] h-[104px] shrink-0 bg-muted/60 hover:bg-muted border border-border/60 rounded-[16px] flex flex-col items-center justify-center gap-2 text-text-tertiary transition-colors active:scale-95 snap-start">
              <div className="w-[36px] h-[36px] bg-background rounded-full flex items-center justify-center shadow-sm border border-border/40">
                <Camera size={18} strokeWidth={2} className="text-text-secondary" />
              </div>
              <span className="text-[12px] font-bold tracking-tight">添加图片</span>
            </button>
            
            <AnimatePresence>
              {images.map((img, idx) => (
                <motion.div 
                  key={img + idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, width: 0, margin: 0 }}
                  className="w-[104px] h-[104px] shrink-0 relative rounded-[16px] overflow-hidden bg-muted shadow-[0_2px_8px_rgba(0,0,0,0.05)] snap-start border border-border/40"
                >
                  <img src={img} alt={`upload-${idx}`} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 w-[22px] h-[22px] bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <X size={12} strokeWidth={3} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* 2. Text Input Area */}
        <div className="px-5 flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="写一个吸引人的标题…" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-[22px] font-bold py-2 bg-transparent outline-none placeholder:text-text-tertiary text-text-primary placeholder:font-medium transition-colors"
          />
          
          <div className="h-[1px] w-full bg-border/40 my-1" />
          
          <textarea 
            placeholder="说说你的真实体验…" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-[16px] py-3 min-h-[140px] resize-none bg-transparent outline-none placeholder:text-text-tertiary text-text-secondary leading-[1.6] transition-colors"
          />
        </div>

        <div className="mx-5 h-[1px] bg-border/40 my-3" />

        {/* 3. Shop & Topic Meta Area */}
        <div className="px-5 flex flex-col gap-[8px]">
          
          {/* Shop Selection Row */}
          <button 
            onClick={() => setStoreOpen(true)}
            className={`flex items-center justify-between w-full py-[14px] px-[16px] rounded-[16px] transition-all active:scale-[0.98] border ${
              selectedStore 
                ? "bg-primary/5 border-primary/20" 
                : "bg-muted/40 border-border/40 hover:bg-muted/60"
            }`}
          >
            <div className="flex items-center gap-[10px]">
              <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${selectedStore ? 'bg-primary/10' : 'bg-background shadow-sm border border-border/40'}`}>
                <MapPin size={16} strokeWidth={selectedStore ? 2.5 : 2} className={selectedStore ? "text-primary" : "text-text-tertiary"} />
              </div>
              <div className="flex flex-col items-start">
                <span className={`text-[15px] ${selectedStore ? "text-text-primary font-bold" : "text-text-secondary font-medium"}`}>
                  {selectedStore ? selectedStore.name : "添加地点/店铺"}
                </span>
                {selectedStore && (
                  <span className="text-[11px] text-text-tertiary font-medium">{selectedStore.city}</span>
                )}
              </div>
            </div>
            <ChevronRight size={20} className={selectedStore ? "text-primary/50" : "text-text-tertiary"} />
          </button>

          {/* Recommendation Switch */}
          <div className="flex items-center justify-between w-full py-[16px] px-[16px] rounded-[16px] bg-muted/20 border border-border/40 mt-1">
            <div className="flex items-center gap-[12px]">
              <Star size={20} strokeWidth={2} className={isRecommended ? "text-warning" : "text-text-tertiary"} fill={isRecommended ? "currentColor" : "none"} />
              <span className="text-[15px] font-medium text-text-primary">推荐这条探店</span>
            </div>
            
            {/* Custom iOS-like Switch */}
            <button 
              onClick={() => setIsRecommended(!isRecommended)}
              className={`w-[46px] h-[26px] rounded-full p-[2px] transition-colors duration-300 ease-in-out relative ${
                isRecommended ? "bg-primary" : "bg-border/80"
              }`}
            >
              <motion.div 
                animate={{ 
                  x: isRecommended ? 20 : 0,
                  scale: isRecommended ? 1 : 0.9
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-[22px] h-[22px] bg-background rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
              />
            </button>
          </div>

          {/* Topic Selection */}
          <button className="flex items-center justify-between w-full py-[14px] px-[16px] rounded-[16px] bg-muted/20 border border-border/40 hover:bg-muted/40 transition-colors active:scale-[0.98] mt-1">
            <div className="flex items-center gap-[10px]">
              <Hash size={18} strokeWidth={2} className="text-text-tertiary" />
              <span className="text-[15px] text-text-secondary font-medium">添加话题</span>
            </div>
            <ChevronRight size={20} className="text-text-tertiary" />
          </button>

        </div>
      </div>

      {/* Store Selection Bottom Sheet */}
      <AnimatePresence>
        {storeOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-[210]" 
              onClick={() => setStoreOpen(false)}
            />
            <motion.div 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              exit={{ y: "100%" }} 
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute bottom-0 inset-x-0 bg-background rounded-t-[24px] z-[220] flex flex-col max-h-[75vh] shadow-[0_-8px_32px_rgba(0,0,0,0.1)] border-t border-border/40"
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <span className="font-bold text-[18px] text-text-primary tracking-tight">选择地点</span>
                <button 
                  onClick={() => setStoreOpen(false)} 
                  className="w-[32px] h-[32px] bg-muted/80 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
              
              <div className="px-5 pb-4 border-b border-border/40">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="搜索店铺或创建新地点..." 
                    className="w-full bg-muted/60 border border-border/60 rounded-[12px] py-[10px] px-[16px] text-[15px] outline-none text-text-primary placeholder:text-text-tertiary focus:bg-background focus:border-primary/40 focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar p-2">
                {storeOptions.map((store) => (
                  <div 
                    key={store.name} 
                    onClick={() => {
                      setSelectedStore(store);
                      setStoreOpen(false);
                    }}
                    className={`mx-3 my-1 py-[14px] px-[16px] flex items-center justify-between rounded-[14px] cursor-pointer transition-colors active:scale-[0.98] ${
                      selectedStore?.name === store.name 
                        ? "bg-primary/10 border border-primary/20" 
                        : "bg-transparent border border-transparent hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className={`text-[15px] ${selectedStore?.name === store.name ? "text-primary font-bold" : "text-text-primary font-medium"}`}>
                        {store.name}
                      </span>
                      <span className={`text-[12px] ${selectedStore?.name === store.name ? "text-primary/70" : "text-text-tertiary"}`}>
                        {store.city}
                      </span>
                    </div>
                    {selectedStore?.name === store.name && (
                      <div className="w-[20px] h-[20px] rounded-full bg-primary flex items-center justify-center shadow-sm">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-[8px] h-[8px] bg-background rounded-full" />
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="mx-3 my-3 h-[1px] bg-border/40" />

                <div 
                  onClick={() => {
                    setSelectedStore({ name: "新创建的神秘小店", city: "当前位置" });
                    setStoreOpen(false);
                  }}
                  className="mx-3 my-1 py-[14px] px-[16px] flex items-center gap-[8px] text-primary font-bold cursor-pointer hover:bg-primary/5 rounded-[14px] border border-primary/20 border-dashed active:scale-[0.98] transition-all"
                >
                  <MapPin size={18} strokeWidth={2.5} />
                  <span>+ 创建新地点</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
