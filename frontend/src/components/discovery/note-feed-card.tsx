import { Link } from 'react-router-dom';
import { HeartIcon } from '@/components/common/icons';
import { ROUTE_PATHS } from '@/constants/routes';
import type { HomeNoteCard } from '@/types';
import { cn } from '@/utils/cn';

interface NoteFeedCardProps {
  note: HomeNoteCard;
  coverClassName?: string;
  className?: string;
}

export function NoteFeedCard({ note, coverClassName, className }: NoteFeedCardProps) {
  return (
    <Link
      className={cn(
        'motion-fade-up motion-soft-scale group block overflow-hidden rounded-[16px] border border-border/40 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all active:scale-[0.98]',
        className,
      )}
      to={ROUTE_PATHS.noteDetail(note.id)}
    >
      <div className={cn('relative w-full overflow-hidden bg-muted', coverClassName)}>
        {note.coverUrl ? (
          <img
            alt={note.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            src={note.coverUrl}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-[6px] p-[14px]">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-[22px] text-text-primary">{note.title}</h3>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-1.5">
            {note.author.avatarUrl ? (
              <img
                alt={note.author.nickname}
                className="h-4 w-4 rounded-full object-cover opacity-90"
                src={note.author.avatarUrl}
              />
            ) : (
              <div className="h-4 w-4 rounded-full bg-muted" />
            )}
            <span className="truncate text-[11px] font-medium text-text-secondary">
              {note.author.nickname}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-text-secondary">
            <HeartIcon size={13} />
            <span>{note.likedCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
