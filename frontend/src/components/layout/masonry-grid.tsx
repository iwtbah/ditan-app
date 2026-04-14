import type { CSSProperties, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

interface MasonryGridProps extends PropsWithChildren {
  className?: string;
  itemClassName?: string;
  columns?: 1 | 2;
  gap?: number;
}

export function MasonryGrid({
  children,
  className,
  itemClassName,
  columns = 2,
  gap = 10,
}: MasonryGridProps) {
  return (
    <div
      className={cn('masonry-grid', className)}
      style={
        {
          ['--masonry-columns' as string]: String(columns),
          ['--masonry-gap' as string]: `${gap}px`,
        } as CSSProperties
      }
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div key={index} className={cn('masonry-item', itemClassName)}>
              {child}
            </div>
          ))
        : children
          ? <div className={cn('masonry-item', itemClassName)}>{children}</div>
          : null}
    </div>
  );
}
