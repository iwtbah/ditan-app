import type { ReactNode } from 'react';
import { GlassIconButton } from '@/components/glass/glass-icon-button';
import { cn } from '@/utils/cn';

interface GlassBottomSheetProps {
  open: boolean;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  className?: string;
  contentClassName?: string;
  hideHandle?: boolean;
  headerTrailing?: ReactNode;
}

export function GlassBottomSheet({
  open,
  title,
  description,
  children,
  onClose,
  className,
  contentClassName,
  hideHandle = false,
  headerTrailing,
}: GlassBottomSheetProps) {
  if (!open) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-black/36 backdrop-blur-[3px]" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-[80] flex justify-center px-3 pb-safe">
        <div
          className={cn(
            'glass-float w-full max-w-[430px] rounded-t-[28px] border-t border-white/40 px-5 pb-5 pt-3 shadow-[0_-14px_48px_rgba(15,23,42,0.16)]',
            className,
          )}
        >
          {hideHandle ? null : (
            <div className="mb-4 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-white/70 shadow-[0_1px_6px_rgba(255,255,255,0.4)]" />
            </div>
          )}

          {title || headerTrailing ? (
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                {title ? (
                  <div className="text-[18px] font-bold tracking-tight text-text-primary">{title}</div>
                ) : null}
                {description ? (
                  <div className="mt-1 text-[12px] font-medium text-text-tertiary">{description}</div>
                ) : null}
              </div>
              {headerTrailing ?? (
                <GlassIconButton aria-label="关闭" className="shrink-0" onClick={onClose}>
                  <span className="text-[18px] leading-none">×</span>
                </GlassIconButton>
              )}
            </div>
          ) : null}

          <div className={cn('no-scrollbar', contentClassName)}>{children}</div>
        </div>
      </div>
    </>
  );
}
