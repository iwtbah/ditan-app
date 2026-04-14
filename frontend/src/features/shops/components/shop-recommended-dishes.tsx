import type { RecommendedDish } from '@/types';

interface ShopRecommendedDishesProps {
  dishes: RecommendedDish[];
}

export function ShopRecommendedDishes({ dishes }: ShopRecommendedDishesProps) {
  return (
    <div className="mt-8">
      <div className="mb-4 px-5">
        <h3 className="text-[17px] font-bold tracking-tight text-text-primary">推荐菜品</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto px-5 pb-2 no-scrollbar">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="w-[130px] shrink-0 overflow-hidden rounded-[16px] border border-border/40 bg-card shadow-sm"
          >
            <img alt={dish.name} className="h-[110px] w-full object-cover" src={dish.imageUrl} />
            <div className="flex flex-col items-start gap-1.5 p-2.5">
              <h4 className="w-full truncate text-[13px] font-bold text-text-primary">{dish.name}</h4>
              <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600 shadow-sm">
                {dish.reason}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
