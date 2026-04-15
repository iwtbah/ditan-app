import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Camera, ChevronRight, Hash, MapPin, Star, X } from "lucide-react";

type StoreOption = {
  name: string;
  city: string;
};

type PublishEditorProps = {
  content: string;
  images: string[];
  isRecommended: boolean;
  selectedStore: StoreOption | null;
  title: string;
  onContentChange: (value: string) => void;
  onOpenStoreSheet: () => void;
  onRemoveImage: (index: number) => void;
  onTitleChange: (value: string) => void;
  onToggleRecommended: () => void;
};

export const PublishEditor = ({
  content,
  images,
  isRecommended,
  selectedStore,
  title,
  onContentChange,
  onOpenStoreSheet,
  onRemoveImage,
  onTitleChange,
  onToggleRecommended,
}: PublishEditorProps) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-[100px] flex flex-col relative z-10">
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
                  onClick={() => onRemoveImage(idx)}
                  className="absolute top-2 right-2 w-[22px] h-[22px] bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X size={12} strokeWidth={3} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-3">
        <input
          type="text"
          placeholder="写一个吸引人的标题…"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full text-[22px] font-bold py-2 bg-transparent outline-none placeholder:text-text-tertiary text-text-primary placeholder:font-medium transition-colors"
        />

        <div className="h-[1px] w-full bg-border/40 my-1" />

        <textarea
          placeholder="说说你的真实体验…"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full text-[16px] py-3 min-h-[140px] resize-none bg-transparent outline-none placeholder:text-text-tertiary text-text-secondary leading-[1.6] transition-colors"
        />
      </div>

      <div className="mx-5 h-[1px] bg-border/40 my-3" />

      <div className="px-5 flex flex-col gap-[8px]">
        <button
          onClick={onOpenStoreSheet}
          className={`flex items-center justify-between w-full py-[14px] px-[16px] rounded-[16px] transition-all active:scale-[0.98] border ${
            selectedStore ? "bg-primary/5 border-primary/20" : "bg-muted/40 border-border/40 hover:bg-muted/60"
          }`}
        >
          <div className="flex items-center gap-[10px]">
            <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${selectedStore ? "bg-primary/10" : "bg-background shadow-sm border border-border/40"}`}>
              <MapPin size={16} strokeWidth={selectedStore ? 2.5 : 2} className={selectedStore ? "text-primary" : "text-text-tertiary"} />
            </div>
            <div className="flex flex-col items-start">
              <span className={`text-[15px] ${selectedStore ? "text-text-primary font-bold" : "text-text-secondary font-medium"}`}>
                {selectedStore ? selectedStore.name : "添加地点/店铺"}
              </span>
              {selectedStore && <span className="text-[11px] text-text-tertiary font-medium">{selectedStore.city}</span>}
            </div>
          </div>
          <ChevronRight size={20} className={selectedStore ? "text-primary/50" : "text-text-tertiary"} />
        </button>

        <div className="flex items-center justify-between w-full py-[16px] px-[16px] rounded-[16px] bg-muted/20 border border-border/40 mt-1">
          <div className="flex items-center gap-[12px]">
            <Star size={20} strokeWidth={2} className={isRecommended ? "text-warning" : "text-text-tertiary"} fill={isRecommended ? "currentColor" : "none"} />
            <span className="text-[15px] font-medium text-text-primary">推荐这条探店</span>
          </div>

          <button
            onClick={onToggleRecommended}
            className={`w-[46px] h-[26px] rounded-full p-[2px] transition-colors duration-300 ease-in-out relative ${
              isRecommended ? "bg-primary" : "bg-border/80"
            }`}
          >
            <motion.div
              animate={{ x: isRecommended ? 20 : 0, scale: isRecommended ? 1 : 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-[22px] h-[22px] bg-background rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
            />
          </button>
        </div>

        <button className="flex items-center justify-between w-full py-[14px] px-[16px] rounded-[16px] bg-muted/20 border border-border/40 hover:bg-muted/40 transition-colors active:scale-[0.98] mt-1">
          <div className="flex items-center gap-[10px]">
            <Hash size={18} strokeWidth={2} className="text-text-tertiary" />
            <span className="text-[15px] text-text-secondary font-medium">添加话题</span>
          </div>
          <ChevronRight size={20} className="text-text-tertiary" />
        </button>
      </div>
    </div>
  );
};
