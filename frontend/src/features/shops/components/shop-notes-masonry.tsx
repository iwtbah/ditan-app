import type { NoteCard } from '@/types';
import { MasonryGrid } from '@/components/layout/masonry-grid';
import { NoteFeedCard } from '@/components/discovery/note-feed-card';

interface ShopNotesMasonryProps {
  notes: NoteCard[];
}

const coverHeights = ['h-[220px]', 'h-[180px]', 'h-[260px]', 'h-[200px]'];

export function ShopNotesMasonry({ notes }: ShopNotesMasonryProps) {
  return (
    <div className="mt-10 bg-background px-5 pb-28">
      <h3 className="mb-5 text-[17px] font-bold tracking-tight text-text-primary">更多探店内容</h3>
      <MasonryGrid gap={16}>
        {notes.map((note, index) => (
          <NoteFeedCard
            key={note.id}
            coverClassName={coverHeights[index % coverHeights.length]}
            note={{ ...note, category: '推荐' }}
          />
        ))}
      </MasonryGrid>
    </div>
  );
}
