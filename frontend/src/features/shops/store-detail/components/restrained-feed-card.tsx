import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import type { MasonryNoteData } from "@/types/note";

type RestrainedFeedCardProps = {
  note: MasonryNoteData;
  onOpenNote: (noteId: number) => void;
};

export const RestrainedFeedCard = ({ note, onOpenNote }: RestrainedFeedCardProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={() => onOpenNote(note.id)}
      className="relative rounded-[16px] overflow-hidden mb-4 bg-muted shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-border/40 cursor-pointer group"
    >
      <div className={`w-full ${note.height || "h-[180px]"} relative bg-muted/50`}>
        <img
          src={note.image}
          alt={note.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-80" />
      </div>

      <div className="absolute bottom-0 inset-x-0 p-3 flex flex-col gap-2 z-10">
        <h3 className="text-[13px] font-bold text-white/90 leading-[1.4] line-clamp-2 drop-shadow-sm">
          {note.title}
        </h3>

        <div className="flex items-center justify-between mt-0.5">
          <div className="flex items-center gap-1.5 opacity-90">
            <div className="w-4 h-4 rounded-full overflow-hidden bg-white/20 backdrop-blur-md">
              <img src={note.avatar} alt={note.author} className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] font-medium text-white/80 drop-shadow-sm">{note.author}</span>
          </div>

          <div className="flex items-center gap-1 text-white/80">
            <Heart size={11} strokeWidth={2.5} fill="none" className="text-white/80" />
            <span className="text-[11px] font-bold drop-shadow-sm">{note.likes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
