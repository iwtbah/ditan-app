import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SectionCardProps extends PropsWithChildren {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function SectionCard({ title, description, actions, className, children }: SectionCardProps) {
  return (
    <section className={cn('card-surface rounded-xl2 p-5', className)}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2>
          {description ? <p className="text-sm text-slate-500">{description}</p> : null}
        </div>
        {actions ? <div>{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}
