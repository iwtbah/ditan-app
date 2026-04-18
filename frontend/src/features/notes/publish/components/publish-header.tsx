import React from "react";
import { HeaderActionButton, PageHeader } from "@/components/ditan";
import { X } from "lucide-react";

type PublishHeaderProps = {
  canPublish: boolean;
  onBack: () => void;
  onPublish: () => void;
};

export const PublishHeader = ({ canPublish, onBack, onPublish }: PublishHeaderProps) => {
  return (
    <PageHeader
      title="发布"
      leading={(
        <HeaderActionButton
          aria-label="关闭发布页"
          className="border-transparent bg-transparent shadow-none"
          onClick={onBack}
        >
          <X size={22} strokeWidth={2.2} />
        </HeaderActionButton>
      )}
      actions={(
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
      )}
    />
  );
};
