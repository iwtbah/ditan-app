import React from "react";
import { motion, type MotionValue } from "motion/react";
import { overlayActionRowClassName, overlayIconButtonClassName } from "@/components/ditan";
import { ChevronLeft, MoreHorizontal } from "lucide-react";

type NoteDetailOverlayHeaderProps = {
  authorAvatar: string;
  authorName: string;
  headerOpacity: MotionValue<number>;
  headerY: MotionValue<number>;
  onBack: () => void;
};

export const NoteDetailOverlayHeader = ({
  authorAvatar,
  authorName,
  headerOpacity,
  headerY,
  onBack,
}: NoteDetailOverlayHeaderProps) => {
  return (
    <>
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-2xl border-b border-border/50 pt-[max(env(safe-area-inset-top,0px),24px)] px-14 pb-2.5 flex items-center justify-center shadow-sm"
      >
        <div className="flex items-center gap-2">
          <img src={authorAvatar} className="w-6 h-6 rounded-full object-cover" />
          <span className="font-bold text-[14px] text-text-primary">{authorName}</span>
        </div>
      </motion.div>

      <div className={overlayActionRowClassName}>
        <button
          onClick={onBack}
          className={overlayIconButtonClassName}
        >
          <ChevronLeft size={22} strokeWidth={2.5} className="-ml-0.5" />
        </button>
        <button className={overlayIconButtonClassName}>
          <MoreHorizontal size={20} strokeWidth={2.5} />
        </button>
      </div>
    </>
  );
};
