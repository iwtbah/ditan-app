import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type GlassIconButtonTone = 'light' | 'dark' | 'accent';
type GlassIconButtonSize = 'sm' | 'md' | 'lg';

interface GlassIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  tone?: GlassIconButtonTone;
  size?: GlassIconButtonSize;
}

const sizeClassNames: Record<GlassIconButtonSize, string> = {
  sm: 'h-9 w-9',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

const toneClassNames: Record<GlassIconButtonTone, string> = {
  light: 'glass-chip text-text-primary',
  dark:
    'border border-white/20 bg-black/22 text-white shadow-[0_10px_28px_rgba(15,23,42,0.2)] backdrop-blur-2xl',
  accent:
    'border border-primary/20 bg-primary/90 text-white shadow-[0_10px_28px_rgba(74,93,90,0.28)] backdrop-blur-2xl',
};

export function GlassIconButton({
  children,
  className,
  size = 'sm',
  tone = 'light',
  type = 'button',
  ...props
}: GlassIconButtonProps) {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center rounded-full transition-all active:scale-95',
        sizeClassNames[size],
        toneClassNames[tone],
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
