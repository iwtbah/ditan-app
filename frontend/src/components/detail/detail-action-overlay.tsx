import type { ReactNode } from 'react';
import { ChevronLeftIcon } from '@/components/common/icons';
import { GlassIconButton } from '@/components/glass/glass-icon-button';
import { cn } from '@/utils/cn';

interface DetailActionOverlayProps {
  onBack: () => void;
  trailing?: ReactNode;
  light?: boolean;
  title?: string;
  progress?: number;
}

export function DetailActionOverlay({
  onBack,
  trailing,
  light = true,
  title,
  progress = 0,
}: DetailActionOverlayProps) {
  const normalizedProgress = Math.min(Math.max(progress, 0), 1);
  const buttonTone = normalizedProgress > 0.5 || !light ? 'light' : 'dark';

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[max(env(safe-area-inset-top,0px),16px)] z-[60] mt-2 flex justify-center px-4 py-2">
      <div className="relative flex w-full max-w-[430px] items-center justify-between">
        <div
          className="glass-float pointer-events-none absolute inset-x-0 -top-2 h-[52px] rounded-[20px] transition-opacity duration-300"
          style={{ opacity: normalizedProgress }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-16">
          <span
            className={cn(
              'max-w-full truncate text-[14px] font-bold tracking-tight text-text-primary transition-all duration-300',
              title ? '' : 'invisible',
            )}
            style={{
              opacity: normalizedProgress,
              transform: `translate3d(0, ${(1 - normalizedProgress) * 10}px, 0)`,
            }}
          >
            {title}
          </span>
        </div>
        <GlassIconButton
          className="pointer-events-auto"
          onClick={onBack}
          tone={buttonTone}
          type="button"
        >
          <ChevronLeftIcon size={20} />
        </GlassIconButton>
        {trailing ? <div className="pointer-events-auto">{trailing}</div> : <div className="h-9 w-9" />}
      </div>
    </div>
  );
}
