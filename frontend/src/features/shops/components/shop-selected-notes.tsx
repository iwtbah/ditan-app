import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@/components/common/icons';
import { ROUTE_PATHS } from '@/constants/routes';
import type { FeaturedNotePreview } from '@/types';

interface ShopSelectedNotesProps {
  notes: FeaturedNotePreview[];
}

export function ShopSelectedNotes({ notes }: ShopSelectedNotesProps) {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between px-5">
        <h3 className="text-[17px] font-bold tracking-tight text-text-primary">精选探店</h3>
        <span className="flex items-center gap-0.5 text-[12px] font-bold text-text-tertiary">
          全部 <ChevronRightIcon size={14} />
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto px-5 pb-2 no-scrollbar">
        {notes.map((note) => (
          <Link
            key={note.id}
            className="relative w-[260px] shrink-0 overflow-hidden rounded-[18px] bg-card shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
            to={ROUTE_PATHS.noteDetail(note.id)}
          >
            <div className="relative h-[150px] w-full bg-muted">
              <img alt={note.title} className="h-full w-full object-cover" src={note.imageUrl} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
            </div>
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <h4 className="mb-2 line-clamp-2 text-[14px] font-bold leading-[1.3] text-white drop-shadow-md">
                {note.title}
              </h4>
              <div className="flex items-center gap-1.5 text-white/90">
                {note.avatarUrl ? (
                  <img alt={note.author} className="h-4 w-4 rounded-full border border-white/30" src={note.avatarUrl} />
                ) : null}
                <span className="text-[11px] font-medium drop-shadow-sm">{note.author}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
