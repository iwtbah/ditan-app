import { Link } from 'react-router-dom';
import { ChevronRightIcon, StarIcon } from '@/components/common/icons';
import { ROUTE_PATHS } from '@/constants/routes';
import type { ShopSummary } from '@/types';

interface NoteShopCardProps {
  shop: ShopSummary;
}

export function NoteShopCard({ shop }: NoteShopCardProps) {
  return (
    <Link
      className="mb-6 flex items-center gap-3.5 rounded-[18px] border border-border/60 bg-card p-3.5 shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
      to={ROUTE_PATHS.shopDetail(shop.id)}
    >
      <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-[14px] bg-muted">
        {shop.coverUrl ? <img alt={shop.name} className="h-full w-full object-cover" src={shop.coverUrl} /> : null}
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <h4 className="mb-1 text-[15px] font-bold leading-tight text-text-primary">{shop.name}</h4>
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-text-secondary">
          <StarIcon className="text-amber-500" size={12} />
          <span className="font-bold text-amber-600/90">{shop.rating.toFixed(1)}</span>
          <span className="text-border">|</span>
          <span>{shop.tags.map((tag) => tag.label).join(' • ')}</span>
        </div>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-muted/80">
        <ChevronRightIcon className="ml-0.5 text-text-tertiary" size={16} />
      </div>
    </Link>
  );
}
