import { Link } from 'react-router-dom';
import { StarIcon } from '@/components/common/icons';
import { ROUTE_PATHS } from '@/constants/routes';
import type { ShopSummary } from '@/types';

interface SearchShopResultCardProps {
  shop: ShopSummary;
}

export function SearchShopResultCard({ shop }: SearchShopResultCardProps) {
  return (
    <Link
      className="group flex gap-3 rounded-[16px] border border-border/40 bg-card p-3 shadow-sm transition-all active:scale-[0.98]"
      to={ROUTE_PATHS.shopDetail(shop.id)}
    >
      <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-muted">
        {shop.coverUrl ? (
          <img
            alt={shop.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={shop.coverUrl}
          />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-[16px] font-bold tracking-tight text-text-primary">{shop.name}</h3>
          </div>

          <div className="mt-[3px] flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-medium text-text-secondary">
            <span className="flex items-center font-bold text-warning">
              <StarIcon className="mr-[3px]" size={11} />
              {shop.rating.toFixed(1)}
            </span>
            {shop.averagePrice ? <span className="text-text-tertiary">￥{shop.averagePrice}/人</span> : null}
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-[6px]">
          <div className="flex gap-[6px] overflow-hidden">
            {shop.tags.map((tag) => (
              <span
                key={tag.id}
                className="whitespace-nowrap rounded-md bg-muted/80 px-2 py-[3px] text-[10px] font-medium text-text-secondary"
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="text-[11px] font-medium text-text-tertiary">{shop.category} · {shop.district}</div>
        </div>
      </div>
    </Link>
  );
}
