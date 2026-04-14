import { useCallback, useRef, useState, type UIEventHandler } from 'react';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function useScrollProgress(maxOffset: number) {
  const frameRef = useRef<number | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback<UIEventHandler<HTMLElement>>((event) => {
    const nextScrollTop = event.currentTarget.scrollTop;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      setScrollTop(nextScrollTop);
      frameRef.current = null;
    });
  }, []);

  return {
    scrollTop,
    progress: clamp(scrollTop / Math.max(maxOffset, 1), 0, 1),
    handleScroll,
  };
}
