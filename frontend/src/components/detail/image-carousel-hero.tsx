import { useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ImageCarouselHeroProps {
  images: string[];
  alt: string;
  heightClassName: string;
  dotsClassName?: string;
  overlayClassName?: string;
  imageClassName?: string;
  imageStyle?: CSSProperties;
  content?: ReactNode;
  contentClassName?: string;
  contentStyle?: CSSProperties;
}

export function ImageCarouselHero({
  images,
  alt,
  heightClassName,
  dotsClassName,
  overlayClassName,
  imageClassName,
  imageStyle,
  content,
  contentClassName,
  contentStyle,
}: ImageCarouselHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={cn('relative w-full overflow-hidden bg-muted', heightClassName)}>
      <div
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto no-scrollbar"
        onScroll={(event) => {
          const target = event.currentTarget;
          const index = Math.round(target.scrollLeft / Math.max(target.clientWidth, 1));

          if (index !== currentIndex) {
            setCurrentIndex(index);
          }
        }}
      >
        {images.map((imageUrl, index) => (
          <div key={`${imageUrl}-${index}`} className="h-full w-full shrink-0 snap-center">
            <img
              alt={alt}
              className={cn('h-full w-full object-cover', imageClassName)}
              src={imageUrl}
              style={imageStyle}
            />
          </div>
        ))}
      </div>

      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent',
          overlayClassName,
        )}
      />

      {content ? (
        <div
          className={cn('pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-16 pt-20', contentClassName)}
          style={contentStyle}
        >
          {content}
        </div>
      ) : null}

      <div className={cn('pointer-events-none absolute inset-x-0 bottom-10 flex justify-center gap-1.5', dotsClassName)}>
        {images.map((_, index) => (
          <div
            key={index}
            className={cn(
              'h-1.5 rounded-full bg-white shadow-sm transition-all',
              currentIndex === index ? 'w-4 opacity-100' : 'w-1.5 opacity-50',
            )}
          />
        ))}
      </div>
    </div>
  );
}
