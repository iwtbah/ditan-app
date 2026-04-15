import React from "react";
import { motion, type MotionValue } from "motion/react";

type NoteDetailGalleryProps = {
  currentImageIndex: number;
  imageOpacity: MotionValue<number>;
  imageScale: MotionValue<number>;
  images: string[];
  onImageScroll: (event: React.UIEvent<HTMLDivElement>) => void;
};

export const NoteDetailGallery = ({
  currentImageIndex,
  imageOpacity,
  imageScale,
  images,
  onImageScroll,
}: NoteDetailGalleryProps) => {
  return (
    <div className="sticky top-0 z-0 h-[65vh] w-full overflow-hidden bg-muted">
      <motion.div
        style={{ scale: imageScale, opacity: imageOpacity }}
        className="w-full h-full origin-top relative"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar" onScroll={onImageScroll}>
          {images.map((img, index) => (
            <div key={index} className="w-full h-full shrink-0 snap-center relative">
              <img src={img} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        <div className="absolute bottom-10 inset-x-0 flex justify-center gap-1.5 z-10 pointer-events-none">
          {images.map((_, index) => (
            <motion.div
              key={index}
              animate={{ width: index === currentImageIndex ? 16 : 6, opacity: index === currentImageIndex ? 1 : 0.5 }}
              className="h-1.5 bg-white rounded-full shadow-sm"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
