"use client";

import React, { useEffect, useRef, useState } from "react";

type HorizontalScrollerProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  scrollAmount?: number;
};

export default function HorizontalScroller({
  children,
  className = "",
  contentClassName = "",
  scrollAmount = 320,
}: HorizontalScrollerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateScrollState();

    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => updateScrollState());
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const delta = direction === "left" ? -scrollAmount : scrollAmount;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Left gradient and button */}
      {canScrollLeft && (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10" />
      )}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => handleScroll("left")}
        disabled={!canScrollLeft}
        className="flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white border border-gray-200 shadow-lg z-20 disabled:opacity-40 hover:border-primary/30 hover:shadow-primary/20 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 md:h-5 md:w-5 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Scroll container */}
      <div ref={containerRef} className={`overflow-x-auto scrollbar-hide scroll-smooth ${contentClassName}`}>
        <div className="flex gap-4 min-w-max">{children}</div>
      </div>

      {/* Right gradient and button */}
      {canScrollRight && (
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10" />
      )}
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => handleScroll("right")}
        disabled={!canScrollRight}
        className="flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white border border-gray-200 shadow-lg z-20 disabled:opacity-40 hover:border-primary/30 hover:shadow-primary/20 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 md:h-5 md:w-5 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}


