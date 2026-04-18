import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";

export type SegmentedControlOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentedControlProps<T extends string> = {
  buttonClassName?: string;
  className?: string;
  inactiveTextClassName?: string;
  options: readonly SegmentedControlOption<T>[];
  value: T;
  activeTextClassName?: string;
  onChange: (value: T) => void;
};

export const profilePanelClassName = "bg-card rounded-[20px] shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-border/40";
export const overlayActionRowClassName =
  "fixed top-[max(env(safe-area-inset-top,0px),16px)] inset-x-0 px-4 py-2 flex justify-between z-[60] pointer-events-none mt-2";
export const overlayIconButtonClassName =
  "pointer-events-auto w-9 h-9 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform";
export const bottomGlassBarBaseClassName =
  "absolute bottom-0 inset-x-0 bg-background/80 border-t border-border/40 z-50";

export const SegmentedControl = <T extends string>({
  buttonClassName = "",
  className = "",
  inactiveTextClassName = "text-text-tertiary",
  options,
  value,
  activeTextClassName = "text-text-primary",
  onChange,
}: SegmentedControlProps<T>) => {
  const activeIndex = Math.max(
    options.findIndex((option) => option.value === value),
    0,
  );

  return (
    <div
      className={`flex bg-muted/80 backdrop-blur-sm rounded-[12px] p-[3px] shadow-inner border border-border/40 relative ${className}`}
    >
      <div
        className="absolute top-[3px] bottom-[3px] bg-card rounded-[9px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-border/60 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          left: "3px",
          transform: `translateX(${activeIndex * 100}%)`,
          width: `calc((100% - 6px) / ${options.length})`,
        }}
      />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex-1 relative z-10 rounded-lg transition-colors ${buttonClassName} ${
            option.value === value ? activeTextClassName : inactiveTextClassName
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

type MasonryColumnsProps<T> = {
  className?: string;
  columnClassName?: string;
  items: T[];
  renderItem: (item: T, index: number, columnIndex: 0 | 1) => React.ReactNode;
};

export const MasonryColumns = <T,>({
  className = "flex gap-sm",
  columnClassName = "flex-1 flex flex-col gap-sm",
  items,
  renderItem,
}: MasonryColumnsProps<T>) => {
  const columns = items.reduce(
    (accumulator, item, index) => {
      accumulator[index % 2].push(item);
      return accumulator;
    },
    [[], []] as Array<T[]>,
  );

  return (
    <div className={className}>
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className={columnClassName}>
          {column.map((item, index) => renderItem(item, index, columnIndex as 0 | 1))}
        </div>
      ))}
    </div>
  );
};

type SectionHeaderProps = {
  className?: string;
  title: string;
  titleClassName?: string;
  trailing?: React.ReactNode;
};

export const SectionHeader = ({
  className = "px-5 flex items-center justify-between mb-4",
  title,
  titleClassName = "text-[17px] font-bold text-text-primary tracking-tight",
  trailing,
}: SectionHeaderProps) => (
  <div className={className}>
    <h3 className={titleClassName}>{title}</h3>
    {trailing}
  </div>
);

export const SheetHandle = () => (
  <div className="w-full flex justify-center pt-3 pb-2">
    <div className="w-10 h-1 bg-border/80 rounded-full" />
  </div>
);

type ListEndHintProps = {
  className?: string;
  text?: string;
};

export const ListEndHint = ({
  className = "py-6 text-center text-[12px] font-bold tracking-widest text-text-tertiary",
  text = "- 没有更多动态了 -",
}: ListEndHintProps) => <div className={className}>{text}</div>;

type PullEndScrollAreaProps = {
  children: React.ReactNode;
  endHintBottomClassName?: string;
  endHintClassName?: string;
  enabled?: boolean;
  hintText?: string;
  maxPullDistance?: number;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
  onTouchRelease?: (scrollTop: number) => void;
  scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
  scrollClassName?: string;
  wrapperClassName?: string;
};

export const PullEndScrollArea = ({
  children,
  endHintBottomClassName = "bottom-5",
  endHintClassName,
  enabled = true,
  hintText = "没有更多动态了",
  maxPullDistance = 52,
  onScroll,
  onTouchEnd,
  onTouchStart,
  onTouchRelease,
  scrollRef,
  scrollClassName,
  wrapperClassName = "flex-1 relative overflow-hidden",
}: PullEndScrollAreaProps) => {
  const localScrollRef = useRef<HTMLDivElement | null>(null) as React.MutableRefObject<HTMLDivElement | null>;
  const resolvedScrollRef = scrollRef ?? localScrollRef;
  const rawPullOffset = useMotionValue(0);
  const pullOffset = useSpring(rawPullOffset, {
    stiffness: 380,
    damping: 34,
    mass: 0.72,
  });
  const hintOpacity = useTransform(pullOffset, [-maxPullDistance, -8, 0], [1, 0.18, 0]);
  const hintScale = useTransform(pullOffset, [-maxPullDistance, 0], [1, 0.94]);
  const hintY = useTransform(pullOffset, [-maxPullDistance, 0], [0, 16]);
  const hintBlur = useTransform(pullOffset, [-maxPullDistance, 0], [0, 6]);
  const highlightOpacity = useTransform(pullOffset, [-maxPullDistance, 0], [0.22, 0]);
  const hintFilter = useMotionTemplate`blur(${hintBlur}px)`;
  const touchStateRef = useRef<{
    startY: number;
    startedAtBottom: boolean;
  } | null>(null);

  const isAtBottom = () => {
    const element = resolvedScrollRef.current;
    if (!element) return false;
    return element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    onTouchStart?.(event);
    if (!enabled) return;

    touchStateRef.current = {
      startY: event.touches[0]?.clientY ?? 0,
      startedAtBottom: isAtBottom(),
    };
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!enabled || !touchStateRef.current) return;

    const currentY = event.touches[0]?.clientY ?? touchStateRef.current.startY;
    const dragDistance = touchStateRef.current.startY - currentY;

    if (dragDistance <= 0) {
      if (rawPullOffset.get() !== 0) {
        rawPullOffset.set(0);
      }
      return;
    }

    if (!touchStateRef.current.startedAtBottom) {
      touchStateRef.current.startedAtBottom = isAtBottom();
    }

    if (!touchStateRef.current.startedAtBottom || !isAtBottom()) {
      return;
    }

    event.preventDefault();
    rawPullOffset.set(-Math.min(maxPullDistance, dragDistance * 0.42));
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStateRef.current = null;
    if (rawPullOffset.get() !== 0) {
      rawPullOffset.set(0);
    }

    onTouchRelease?.(resolvedScrollRef.current?.scrollTop ?? 0);
    onTouchEnd?.(event);
  };

  return (
    <div className={wrapperClassName}>
      <motion.div style={{ y: pullOffset }} className="h-full will-change-transform">
        <div
          ref={(node) => {
            localScrollRef.current = node;
            if (scrollRef) {
              (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }
          }}
          className={scrollClassName}
          onScroll={onScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {children}
        </div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 flex justify-center ${endHintBottomClassName}`}
        style={{ opacity: hintOpacity, y: hintY, scale: hintScale, filter: hintFilter }}
      >
        <div
          className={`relative overflow-hidden rounded-full border border-border/60 bg-background/88 px-4 py-2 text-[12px] font-bold tracking-[0.24em] text-text-secondary shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl ${endHintClassName ?? ""}`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{ opacity: highlightOpacity }}
          />
          <span className="relative z-10">{hintText}</span>
        </div>
      </motion.div>
    </div>
  );
};
