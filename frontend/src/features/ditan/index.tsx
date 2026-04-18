import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "motion/react";
import { HeaderActionButton, HeaderMetaChip, PageHeader } from "@/components/ditan";
import { Heart, MapPin, Navigation2, X } from "lucide-react";
import type { DitanCardData } from "./mocks";
import { useDitanCardStack } from "./hooks";

export const Ditan = () => {
  const { cards, consumeTopCard, removeCard, resetCards } = useDitanCardStack();

  const handleManualSwipe = (_direction: "left" | "right") => {
    if (cards.length > 0) {
      consumeTopCard();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      <PageHeader
        title="迪探"
        leading={(
          <HeaderMetaChip
            icon={<MapPin size={14} className="text-primary" strokeWidth={2.5} />}
            label="北京"
          />
        )}
        actions={(
          <HeaderActionButton aria-label="打开定位导航">
            <Navigation2 size={18} strokeWidth={2.4} />
          </HeaderActionButton>
        )}
      />

      <div className="z-20 px-4 pt-2 pb-4 text-center">
        <p className="text-[12px] font-bold tracking-[0.14em] text-text-secondary">
          左滑略过 · 右滑想去
        </p>
      </div>

      <div className="flex-1 relative w-full px-5 pb-32 pt-2 flex justify-center items-center z-10">
        {cards.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-text-secondary">
            <div className="w-[80px] h-[80px] bg-muted rounded-full flex items-center justify-center mb-6 shadow-sm">
              <MapPin size={32} className="text-text-tertiary" strokeWidth={1.5} />
            </div>
            <p className="text-[15px] font-bold text-text-primary">附近没有更多新发现了</p>
            <button
              onClick={resetCards}
              className="mt-6 px-8 py-3 bg-primary hover:bg-primary/90 active:scale-95 transition-all rounded-full text-primary-foreground text-[14px] font-bold shadow-md"
            >
              扩大搜索范围
            </button>
          </div>
        ) : (
          <div className="relative w-full max-w-[380px] aspect-[3/4.5]">
            <AnimatePresence>
              {cards.map((card, index) => {
                if (index > 2) return null;
                const isTop = index === 0;

                return (
                  <SwipeCard
                    key={card.id}
                    card={card}
                    isTop={isTop}
                    index={index}
                    onRemove={removeCard}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {cards.length > 0 && (
        <div className="absolute bottom-28 inset-x-0 flex justify-center gap-6 z-30 pointer-events-none">
          <button
            onClick={() => handleManualSwipe("left")}
            className="pointer-events-auto w-[64px] h-[64px] bg-background/40 backdrop-blur-2xl rounded-full flex items-center justify-center text-text-primary hover:bg-background/60 active:scale-90 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20"
          >
            <X size={28} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => handleManualSwipe("right")}
            className="pointer-events-auto w-[64px] h-[64px] bg-primary/90 backdrop-blur-2xl rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary active:scale-90 transition-all shadow-[0_8px_32px_rgba(74,93,90,0.3)] border border-primary/20"
          >
            <Heart size={28} fill="currentColor" strokeWidth={0} />
          </button>
        </div>
      )}
    </div>
  );
};

type SwipeCardProps = {
  card: DitanCardData;
  index: number;
  isTop: boolean;
  onRemove: (id: number) => void;
};

const SwipeCard = ({ card, isTop, index, onRemove }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const [exitX, setExitX] = useState(0);

  const rotate = useTransform(x, [-200, 200], [-3, 3]);
  const nopeOpacity = useTransform(x, [-30, -120], [0, 1]);
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = 120;

    if (offset > threshold || velocity > 500) {
      setExitX(500);
      onRemove(card.id);
    } else if (offset < -threshold || velocity < -500) {
      setExitX(-500);
      onRemove(card.id);
    }
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full rounded-[24px] overflow-hidden shadow-modal bg-card border border-border/50 flex flex-col will-change-transform"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 10 - index,
      }}
      initial={{ scale: 0.96, y: 16, opacity: 0 }}
      animate={{
        scale: isTop ? 1 : Math.max(1 - index * 0.04, 0.9),
        y: isTop ? 0 : index * 12,
        opacity: isTop ? 1 : Math.max(1 - index * 0.2, 0.5),
      }}
      exit={{
        x: exitX,
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 1 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing", scale: 1.01 }}
      whileHover={{ cursor: isTop ? "grab" : "auto" }}
    >
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      <motion.div
        className="absolute top-12 right-10 border border-white/20 bg-black/40 backdrop-blur-xl rounded-full px-6 py-2 shadow-lg pointer-events-none z-20 flex items-center justify-center"
        style={{ opacity: isTop ? nopeOpacity : 0 }}
      >
        <span className="text-white/90 font-bold tracking-widest text-[14px]">略过</span>
      </motion.div>

      <motion.div
        className="absolute top-12 left-10 border border-primary/30 bg-primary/40 backdrop-blur-xl rounded-full px-6 py-2 shadow-lg pointer-events-none z-20 flex items-center justify-center"
        style={{ opacity: isTop ? likeOpacity : 0 }}
      >
        <span className="text-white font-bold tracking-widest text-[14px]">想去</span>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col gap-[10px] pointer-events-none">
        <div className="flex items-center gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="px-[10px] py-[4px] bg-white/20 backdrop-blur-md rounded-md text-[11px] font-medium text-white shadow-sm border border-white/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-white text-[24px] font-bold shadow-sm leading-[32px] drop-shadow-md">
          {card.title}
        </h2>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 text-white/90">
            <span className="font-bold text-[15px] drop-shadow-sm">{card.shopName}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-white bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <MapPin size={12} strokeWidth={2.5} />
            <span>{card.distance}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Ditan;
