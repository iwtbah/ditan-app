import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CloseIcon,
  CompassIcon,
  HeartIcon,
  MapPinIcon,
  NavigationIcon,
} from '@/components/common/icons';
import { GlassIconButton } from '@/components/glass/glass-icon-button';
import { useDitanDiscoveryQuery } from '@/features/ditan/hooks/use-ditan-discovery-query';
import type { DitanDiscoveryCard } from '@/types';
import { cn } from '@/utils/cn';

const SWIPE_THRESHOLD = 120;
const SWIPE_EXIT_DISTANCE = 460;

type SwipeDirection = 'left' | 'right';

export function DitanCardStack() {
  const discoveryQuery = useDitanDiscoveryQuery();
  const [cards, setCards] = useState<DitanDiscoveryCard[]>([]);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitingCardId, setExitingCardId] = useState<string | null>(null);
  const exitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (discoveryQuery.data?.cards) {
      setCards(discoveryQuery.data.cards);
    }
  }, [discoveryQuery.data]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current !== null) {
        clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  const topThreeCards = useMemo(() => cards.slice(0, 3), [cards]);
  const stackProgress = Math.min(Math.abs(dragX) / SWIPE_THRESHOLD, 1);

  const resetTopCard = () => {
    setDragX(0);
    setIsDragging(false);
  };

  const triggerSwipe = (direction: SwipeDirection) => {
    const topCard = cards[0];

    if (!topCard || exitingCardId) {
      return;
    }

    if (exitTimerRef.current !== null) {
      clearTimeout(exitTimerRef.current);
    }

    setExitingCardId(topCard.id);
    setIsDragging(false);
    setDragX(direction === 'right' ? SWIPE_EXIT_DISTANCE : -SWIPE_EXIT_DISTANCE);

    exitTimerRef.current = window.setTimeout(() => {
      setCards((current) => current.filter((card) => card.id !== topCard.id));
      setDragX(0);
      setExitingCardId(null);
      exitTimerRef.current = null;
    }, 260);
  };

  if (discoveryQuery.isLoading) {
    return (
      <div className="flex h-full flex-col overflow-hidden bg-background">
        <div className="z-20 flex items-center justify-between px-4 py-4 pt-safe">
          <div className="h-8 w-[72px] animate-pulse rounded-full bg-muted" />
          <div className="h-5 w-16 animate-pulse rounded bg-muted" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
        </div>
        <div className="mb-4 flex justify-center">
          <div className="h-3 w-28 animate-pulse rounded bg-muted" />
        </div>
        <div className="flex flex-1 items-center justify-center px-5 pb-32 pt-2">
          <div className="aspect-[3/4.5] w-full max-w-[380px] animate-pulse rounded-[24px] bg-muted" />
        </div>
      </div>
    );
  }

  if (discoveryQuery.isError) {
    return (
      <div className="flex h-full items-center justify-center bg-background p-6">
        <div className="rounded-[18px] border border-red-200 bg-white px-4 py-5 text-center text-sm text-red-600 shadow-sm">
          {discoveryQuery.error?.message ?? '迪探内容加载失败'}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <div className="z-20 flex items-center justify-between px-4 py-4 pt-safe">
        <div className="glass-chip flex items-center gap-1.5 rounded-full px-3 py-1.5">
          <MapPinIcon className="text-primary" size={14} />
          <span className="text-[12px] font-bold text-text-primary">{discoveryQuery.data?.city ?? '北京'}</span>
        </div>
        <div className="text-[16px] font-bold tracking-[0.1em] text-text-primary">迪探</div>
        <div className="flex w-[72px] justify-end">
          <GlassIconButton size="sm">
            <NavigationIcon className="text-text-primary" size={16} />
          </GlassIconButton>
        </div>
      </div>

      <div className="z-20 mb-4 text-center text-[11px] font-bold tracking-widest text-text-tertiary">
        左滑略过 · 右滑想去
      </div>

      <div className="z-10 flex flex-1 items-center justify-center px-5 pb-32 pt-2">
        {cards.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center text-text-secondary">
            <div className="mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-muted shadow-sm">
              <CompassIcon className="text-text-tertiary" size={32} />
            </div>
            <p className="text-[15px] font-bold text-text-primary">附近没有更多新发现了</p>
            <button
              className="mt-6 rounded-full bg-primary px-8 py-3 text-[14px] font-bold text-white shadow-md transition-all active:scale-95"
              onClick={() => setCards(discoveryQuery.data?.cards ?? [])}
              type="button"
            >
              扩大搜索范围
            </button>
          </div>
        ) : (
          <div className="relative aspect-[3/4.5] w-full max-w-[380px]">
            {topThreeCards
              .slice()
              .reverse()
              .map((card, reverseIndex) => {
                const index = topThreeCards.length - 1 - reverseIndex;
                const isTop = index === 0;
                const isExiting = isTop && exitingCardId === card.id;
                const computedDragX = isTop ? dragX : 0;
                const rotation = isTop ? computedDragX / 24 : 0;
                const scale = isTop
                  ? 1
                  : Math.min(Math.max(1 - index * 0.055 + stackProgress * (index === 1 ? 0.045 : 0.032), 0.88), 0.98);
                const translateY = isTop ? 0 : Math.max(index * 16 - stackProgress * (index === 1 ? 14 : 10), 0);

                return (
                  <div
                    key={card.id}
                    className="absolute inset-0 motion-pop-in"
                    style={{
                      opacity: isTop ? 1 : Math.max(0.44, 0.72 - index * 0.16 + stackProgress * 0.14),
                      filter: isTop ? 'none' : `blur(${Math.max(0, (index - 1.2 - stackProgress) * 1.4)}px)`,
                      transform: `translate3d(${computedDragX}px, ${translateY}px, 0) rotate(${rotation}deg) scale(${scale})`,
                      transition:
                        isDragging && isTop && !isExiting
                          ? 'none'
                          : 'transform 340ms cubic-bezier(0.22, 1, 0.36, 1), opacity 280ms ease, filter 280ms ease',
                      zIndex: 10 - index,
                    }}
                  >
                    <SwipeCard
                      card={card}
                      dragX={computedDragX}
                      isTop={isTop}
                      onDragEnd={(offsetX) => {
                        if (Math.abs(offsetX) > SWIPE_THRESHOLD) {
                          triggerSwipe(offsetX > 0 ? 'right' : 'left');
                        } else {
                          resetTopCard();
                        }
                      }}
                      onDragMove={(offsetX) => {
                        if (exitingCardId) {
                          return;
                        }

                        setDragX(offsetX);
                        setIsDragging(true);
                      }}
                      onDragStart={() => {
                        if (exitingCardId) {
                          return;
                        }

                        setDragX(0);
                        setIsDragging(true);
                      }}
                    />
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {cards.length > 0 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-28 z-30 flex justify-center gap-6">
          <GlassIconButton
            className={cn(
              'pointer-events-auto h-[64px] w-[64px] text-text-primary transition-all',
              dragX < -12 ? 'scale-105 shadow-[0_12px_32px_rgba(15,23,42,0.16)]' : '',
            )}
            onClick={() => triggerSwipe('left')}
            size="lg"
          >
            <CloseIcon size={28} />
          </GlassIconButton>
          <GlassIconButton
            className={cn(
              'pointer-events-auto h-[64px] w-[64px] transition-all',
              dragX > 12 ? 'scale-105 shadow-[0_12px_32px_rgba(74,93,90,0.34)]' : '',
            )}
            onClick={() => triggerSwipe('right')}
            size="lg"
            tone="accent"
          >
            <HeartIcon className="fill-current" size={28} />
          </GlassIconButton>
        </div>
      ) : null}
    </div>
  );
}

interface SwipeCardProps {
  card: DitanDiscoveryCard;
  isTop: boolean;
  dragX: number;
  onDragStart: () => void;
  onDragMove: (offsetX: number) => void;
  onDragEnd: (offsetX: number) => void;
}

function SwipeCard({
  card,
  isTop,
  dragX,
  onDragStart,
  onDragMove,
  onDragEnd,
}: SwipeCardProps) {
  const [startX, setStartX] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-border/50 bg-card shadow-[0_12px_40px_rgba(0,0,0,0.14)] will-change-transform',
        isTop ? 'touch-none' : 'pointer-events-none',
      )}
      onPointerDown={
        isTop
          ? (event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              setStartX(event.clientX);
              onDragStart();
            }
          : undefined
      }
      onPointerMove={
        isTop
          ? (event) => {
              if (startX === null) {
                return;
              }

              onDragMove(event.clientX - startX);
            }
          : undefined
      }
      onPointerUp={
        isTop
          ? (event) => {
              if (startX === null) {
                return;
              }

              onDragEnd(event.clientX - startX);
              event.currentTarget.releasePointerCapture(event.pointerId);
              setStartX(null);
            }
          : undefined
      }
      onPointerCancel={
        isTop
          ? () => {
              setStartX(null);
              onDragEnd(0);
            }
          : undefined
      }
    >
      <img alt={card.title} className="absolute inset-0 h-full w-full select-none object-cover pointer-events-none" src={card.imageUrl} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div
        className="pointer-events-none absolute right-10 top-12 z-20 flex justify-center rounded-full border border-white/20 bg-black/40 px-6 py-2 shadow-lg backdrop-blur-xl transition-opacity"
        style={{ opacity: isTop ? Math.min(Math.max(-dragX / 120, 0), 1) : 0 }}
      >
        <span className="text-[14px] font-bold tracking-widest text-white/90">略过</span>
      </div>
      <div
        className="pointer-events-none absolute left-10 top-12 z-20 flex justify-center rounded-full border border-primary/30 bg-primary/40 px-6 py-2 shadow-lg backdrop-blur-xl transition-opacity"
        style={{ opacity: isTop ? Math.min(Math.max(dragX / 120, 0), 1) : 0 }}
      >
        <span className="text-[14px] font-bold tracking-widest text-white">想去</span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-[10px] p-8">
        <div className="flex items-center gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/20 bg-white/20 px-[10px] py-[4px] text-[11px] font-medium text-white shadow-sm backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-[24px] font-bold leading-[32px] text-white drop-shadow-md">{card.title}</h2>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-[15px] font-bold drop-shadow-sm">{card.shopName}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
            <MapPinIcon size={12} />
            <span>{card.distance}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
