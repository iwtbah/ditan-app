import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookmarkIcon,
  ChevronRightIcon,
  NavigationIcon,
  PhoneIcon,
  ShareIcon,
  StarIcon,
} from '@/components/common/icons';
import { CommentList } from '@/components/detail/comment-list';
import { DetailActionOverlay } from '@/components/detail/detail-action-overlay';
import { ImageCarouselHero } from '@/components/detail/image-carousel-hero';
import { GlassBottomSheet } from '@/components/glass/glass-bottom-sheet';
import { GlassIconButton } from '@/components/glass/glass-icon-button';
import { ShopNotesMasonry } from '@/features/shops/components/shop-notes-masonry';
import { ShopRecommendedDishes } from '@/features/shops/components/shop-recommended-dishes';
import { ShopSelectedNotes } from '@/features/shops/components/shop-selected-notes';
import { useShopDetailQuery } from '@/features/shops/hooks/use-shop-detail-query';
import { useShopNotesQuery } from '@/features/shops/hooks/use-shop-notes-query';
import { useScrollProgress } from '@/hooks/use-scroll-progress';

interface ShopDetailSectionProps {
  shopId: string;
}

export function ShopDetailSection({ shopId }: ShopDetailSectionProps) {
  const navigate = useNavigate();
  const detailQuery = useShopDetailQuery(shopId);
  const notesQuery = useShopNotesQuery(shopId);
  const shop = detailQuery.data;
  const notes = notesQuery.data?.list ?? [];
  const [isCollected, setIsCollected] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const { progress, scrollTop, handleScroll } = useScrollProgress(180);

  if (detailQuery.isLoading) {
    return (
      <div className="flex h-full flex-col bg-background">
        <div className="h-[50vh] animate-pulse bg-muted" />
        <div className="relative z-20 mx-4 -mt-20 rounded-[20px] bg-card p-5 shadow-sm">
          <div className="mb-4 h-7 w-3/4 animate-pulse rounded-md bg-muted" />
          <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-muted" />
          <div className="flex gap-2">
            <div className="h-8 w-16 animate-pulse rounded-lg bg-muted" />
            <div className="h-8 w-16 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (detailQuery.isError || !shop) {
    return (
      <div className="flex h-full items-center justify-center bg-background p-6">
        <div className="rounded-[18px] border border-red-200 bg-white px-4 py-5 text-center text-sm text-red-600 shadow-sm">
          {detailQuery.error?.message ?? '抱歉，该店铺不存在或已打烊'}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col bg-background">
      <DetailActionOverlay
        onBack={() => navigate(-1)}
        progress={progress}
        title={shop.name}
        trailing={
          <GlassIconButton tone={progress > 0.5 ? 'light' : 'dark'}>
            <ShareIcon size={18} />
          </GlassIconButton>
        }
      />

      <div className="h-full overflow-y-auto no-scrollbar" onScroll={handleScroll}>
        <ImageCarouselHero
          alt={shop.name}
          content={
            <div className="max-w-[82%]">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/22 px-3 py-1.5 shadow-[0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                <StarIcon className="text-amber-300" size={14} />
                <span className="text-[12px] font-bold text-white">{shop.rating.toFixed(1)}</span>
                <span className="text-[12px] font-medium text-white/72">
                  {shop.averagePrice ? `￥${shop.averagePrice}/人` : '待补充人均'}
                </span>
              </div>
              <h1 className="text-[28px] font-bold leading-[1.2] tracking-tight text-white drop-shadow-[0_10px_28px_rgba(15,23,42,0.3)]">
                {shop.name}
              </h1>
              <p className="mt-2 text-[12px] font-semibold text-white/78">
                {shop.distance ?? '2.4km'} • {shop.walkTime ?? '步行约15分钟'}
              </p>
            </div>
          }
          contentStyle={{
            opacity: Math.max(0, 1 - progress * 1.2),
            transform: `translate3d(0, ${progress * 24}px, 0)`,
          }}
          dotsClassName="bottom-28"
          heightClassName="h-[48vh]"
          imageClassName="transition-transform duration-300 ease-out will-change-transform"
          imageStyle={{
            transform: `translate3d(0, ${Math.min(scrollTop * 0.22, 34)}px, 0) scale(${1 + progress * 0.07})`,
          }}
          images={shop.photoUrls}
          overlayClassName="h-2/3 from-black/72 via-black/24 to-transparent"
        />

        <div className="relative z-10 min-h-[100vh]">
          <div className="absolute inset-x-0 bottom-0 -top-4 -z-10 rounded-t-[32px] bg-background shadow-[0_-4px_24px_rgba(0,0,0,0.02)]" />

          <div
            className="relative z-20 mx-4 -mt-20 rounded-[20px] border border-border/40 bg-card p-5 pb-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            style={{
              transform: `translate3d(0, ${Math.max(-progress * 8, -8)}px, 0)`,
            }}
          >
            <div className="mb-3 flex items-start justify-between">
              <h1 className="pr-4 text-[20px] font-bold leading-[1.3] tracking-tight text-text-primary">{shop.name}</h1>
              <div className="glass-chip flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-secondary">
                <PhoneIcon size={18} />
              </div>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-amber-600">
                <StarIcon size={14} />
                <span className="text-[14px] font-bold">{shop.rating.toFixed(1)}</span>
              </div>
              <span className="text-[13px] font-bold text-text-secondary">
                {shop.averagePrice ? `￥${shop.averagePrice}/人` : '待补充人均'}
              </span>
              {shop.rankingText ? (
                <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[12px] font-medium text-amber-600">
                  {shop.rankingText}
                </span>
              ) : null}
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {shop.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-[8px] bg-muted/60 px-2.5 py-1 text-[12px] font-bold text-text-secondary"
                >
                  {tag.label}
                </span>
              ))}
            </div>

            <div className="mx-[-4px] my-3 h-px bg-border/50" />

            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-1 items-start gap-2.5 pr-4">
                <div className="mt-0.5 text-text-tertiary">📍</div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-bold leading-tight text-text-primary">{shop.address}</span>
                  <span className="text-[11px] font-medium text-text-tertiary">
                    距离您 {shop.distance ?? '2.4km'} • {shop.walkTime ?? '步行约15分钟'}
                  </span>
                </div>
              </div>
              <ChevronRightIcon className="shrink-0 text-text-tertiary" size={18} />
            </div>
          </div>

          {shop.coupons[0] ? (
            <div className="mx-4 mt-5">
              <button
                className="relative flex w-full items-center justify-between overflow-hidden rounded-[18px] border border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50 p-3.5 shadow-[0_2px_12px_rgba(245,158,11,0.06)]"
                onClick={() => setIsCouponOpen(true)}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-amber-500/10 text-amber-600">
                    🎟
                  </div>
                  <div className="text-left">
                    <h4 className="mb-0.5 text-[14px] font-bold leading-tight text-amber-900">
                      {shop.coupons[0].title}
                    </h4>
                    <p className="text-[11px] font-bold text-amber-700/70">{shop.coupons[0].sales} • 随时退</p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-500 px-3.5 py-1.5 text-[12px] font-bold text-white shadow-sm">
                  立即领取
                </span>
              </button>
            </div>
          ) : null}

          <ShopSelectedNotes notes={shop.selectedNotes} />
          <ShopRecommendedDishes dishes={shop.recommendedDishes} />

          <div className="mt-8 px-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[17px] font-bold tracking-tight text-text-primary">热门评价</h3>
              <span className="flex items-center gap-0.5 text-[12px] font-bold text-text-tertiary">
                共 {shop.commentCount} 条 <ChevronRightIcon size={14} />
              </span>
            </div>
            <CommentList comments={shop.reviews} variant="review" />
          </div>

          {notesQuery.isLoading ? (
            <div className="px-5 py-10 text-sm text-text-secondary">正在加载更多探店内容...</div>
          ) : notesQuery.isError ? (
            <div className="px-5 py-10 text-sm text-red-600">更多探店内容加载失败</div>
          ) : notes.length > 0 ? (
            <ShopNotesMasonry notes={notes} />
          ) : null}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-50 px-3 pb-safe">
        <div className="glass-float flex items-center gap-6 rounded-t-[24px] border-t border-white/40 px-5 py-3">
          <div className="flex shrink-0 gap-5 pl-1">
            <button
              className="flex flex-col items-center justify-center gap-1 text-text-secondary transition-transform active:scale-90"
              onClick={() => setIsCollected((value) => !value)}
              type="button"
            >
              <BookmarkIcon className={isCollected ? 'fill-amber-500 text-amber-500' : ''} size={22} />
              <span className={`text-[10px] font-bold ${isCollected ? 'text-amber-600' : ''}`}>
                {isCollected ? '已收藏' : '收藏'}
              </span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 text-text-secondary transition-transform active:scale-90" type="button">
              <span className="text-[22px]">✎</span>
              <span className="text-[10px] font-bold">写评价</span>
            </button>
          </div>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-text-primary py-[12px] text-[15px] font-bold text-background shadow-md transition-transform active:scale-95" type="button">
            <NavigationIcon size={18} />
            导航去这里
          </button>
        </div>
      </div>

      <GlassBottomSheet
        onClose={() => setIsCouponOpen(false)}
        open={isCouponOpen}
        title="优惠与活动"
      >
        <div className="flex max-h-[50vh] flex-col gap-4 overflow-y-auto pb-2 no-scrollbar">
          {shop.coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="relative flex flex-col gap-3 overflow-hidden rounded-[20px] border border-white/45 bg-white/55 p-4 shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-start justify-between px-2">
                <div className="flex gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-amber-50 text-amber-500">
                    🎟
                  </div>
                  <div>
                    <h4 className="mb-1 text-[16px] font-bold tracking-tight text-text-primary">{coupon.title}</h4>
                    <span className="rounded bg-red-50 px-2 py-0.5 text-[11px] font-bold text-red-600">
                      {coupon.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[20px] font-bold text-amber-600">
                    <span className="text-[12px]">￥</span>
                    {coupon.newPrice}
                  </div>
                  <div className="text-[12px] font-medium text-text-tertiary line-through">￥{coupon.oldPrice}</div>
                </div>
              </div>

              <div className="mt-1 flex items-center justify-between border-t border-dashed border-border/60 px-2 pt-3.5">
                <div className="text-[12px] font-bold text-text-tertiary">{coupon.sales} • 随时退 • 过期退</div>
                <button className="rounded-full bg-amber-500 px-5 py-2 text-[13px] font-bold text-white shadow-[0_2px_12px_rgba(245,158,11,0.3)] transition-transform active:scale-95" type="button">
                  立即抢购
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassBottomSheet>
    </div>
  );
}
