import React from "react";
import { X } from "lucide-react";

type PublishHeaderProps = {
  canPublish: boolean;
  onBack: () => void;
  onPublish: () => void;
};

export const PublishHeader = ({ canPublish, onBack, onPublish }: PublishHeaderProps) => {
  return (
    <div className="pt-safe px-4 py-[14px] flex items-center justify-between bg-background/80 backdrop-blur-xl border-b border-border/40 z-20 sticky top-0 shadow-sm">
      <button
        onClick={onBack}
        className="p-1.5 -ml-1.5 text-text-primary hover:bg-muted rounded-full transition-colors active:scale-95"
      >
        <X size={26} strokeWidth={2} />
      </button>

      <button
        onClick={onPublish}
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
  );
};
