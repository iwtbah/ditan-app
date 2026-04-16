import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { PullEndScrollArea } from "@/components/ditan";
import { MapPin, X } from "lucide-react";

type StoreOption = {
  name: string;
  city: string;
};

type PublishStoreSheetProps = {
  isOpen: boolean;
  options: StoreOption[];
  selectedStore: StoreOption | null;
  onClose: () => void;
  onSelectStore: (store: StoreOption) => void;
  onCreateStore: () => void;
};

export const PublishStoreSheet = ({
  isOpen,
  options,
  selectedStore,
  onClose,
  onCreateStore,
  onSelectStore,
}: PublishStoreSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-[210]"
            onClick={onClose}
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
                onClick={onClose}
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

            <PullEndScrollArea
              hintText="已经到底了"
              wrapperClassName="flex-1 relative overflow-hidden"
              endHintBottomClassName="bottom-2"
              scrollClassName="h-full overflow-y-auto no-scrollbar overscroll-y-contain p-2"
            >
              {options.map((store) => (
                <div
                  key={store.name}
                  onClick={() => onSelectStore(store)}
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
                onClick={onCreateStore}
                className="mx-3 my-1 py-[14px] px-[16px] flex items-center gap-[8px] text-primary font-bold cursor-pointer hover:bg-primary/5 rounded-[14px] border border-primary/20 border-dashed active:scale-[0.98] transition-all"
              >
                <MapPin size={18} strokeWidth={2.5} />
                <span>+ 创建新地点</span>
              </div>
            </PullEndScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
