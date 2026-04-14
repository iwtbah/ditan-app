import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface GlassSegmentedOption<T extends string> {
  label: ReactNode;
  value: T;
}

interface GlassSegmentedControlProps<T extends string> {
  options: GlassSegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  optionClassName?: string;
}

export function GlassSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  optionClassName,
}: GlassSegmentedControlProps<T>) {
  const activeIndex = Math.max(
    options.findIndex((option) => option.value === value),
    0,
  );

  return (
    <div className={cn('glass-solid relative flex rounded-[12px] p-[3px]', className)}>
      <div
        className="absolute bottom-[3px] left-[3px] top-[3px] rounded-[9px] bg-card shadow-[0_8px_18px_rgba(17,24,39,0.08)] transition-transform duration-300"
        style={{
          transform: `translateX(calc(100% * ${activeIndex}))`,
          width: `calc((100% - 6px) / ${Math.max(options.length, 1)})`,
        }}
      />
      {options.map((option) => (
        <button
          key={option.value}
          className={cn(
            'relative z-10 flex-1 rounded-lg py-[6px] text-[14px] font-bold transition-colors',
            value === option.value ? 'text-text-primary' : 'text-text-tertiary',
            optionClassName,
          )}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
