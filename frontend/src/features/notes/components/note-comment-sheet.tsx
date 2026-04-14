import { SendIcon } from '@/components/common/icons';
import { GlassBottomSheet } from '@/components/glass/glass-bottom-sheet';

interface NoteCommentSheetProps {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function NoteCommentSheet({
  open,
  value,
  onChange,
  onClose,
  onSubmit,
}: NoteCommentSheetProps) {
  if (!open) {
    return null;
  }

  return (
    <GlassBottomSheet
      description={`${value.length}/200`}
      onClose={onClose}
      open={open}
      title="发表评论"
    >
      <div className="mb-4 rounded-[18px] border border-white/45 bg-white/55 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
        <textarea
          className="h-24 w-full resize-none bg-transparent text-[15px] leading-relaxed text-text-primary outline-none placeholder:text-text-tertiary"
          maxLength={200}
          onChange={(event) => onChange(event.target.value)}
          placeholder="说点什么，友善的交流让人心情愉悦..."
          value={value}
        />
      </div>
      <div className="flex justify-end">
        <button
          className={`flex items-center gap-1.5 rounded-full px-6 py-2.5 text-[14px] font-bold transition-all ${
            value.trim()
              ? 'bg-text-primary text-background shadow-md active:scale-95'
              : 'cursor-not-allowed bg-muted text-text-tertiary'
          }`}
          disabled={!value.trim()}
          onClick={onSubmit}
          type="button"
        >
          <SendIcon size={16} />
          发送
        </button>
      </div>
    </GlassBottomSheet>
  );
}
