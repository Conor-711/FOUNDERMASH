"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export interface AvatarCarouselProps {
  images: string[];
  alt: string;
}

export default function AvatarCarousel({ images, alt }: AvatarCarouselProps) {
  const sources = useMemo(() => {
    const filtered = (images || []).filter(Boolean);
    return filtered.length > 0 ? filtered.slice(0, 3) : ["/vercel.svg"]; // fallback
  }, [images]);

  const [index, setIndex] = useState(0);
  const hasMultiple = sources.length > 1;

  function onPrev() {
    if (!hasMultiple) return;
    setIndex((prev) => (prev - 1 + sources.length) % sources.length);
  }

  function onNext() {
    if (!hasMultiple) return;
    setIndex((prev) => (prev + 1) % sources.length);
  }

  return (
    <div className="flex items-center gap-2">
      {hasMultiple && (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous avatar"
          className="bg-white text-[#333] border rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-50"
        >
          ‹
        </button>
      )}

      <div className="w-[160px] h-[160px]">
        <Image
          src={sources[index]}
          alt={alt}
          width={160}
          height={160}
          className="rounded-lg border object-cover w-[160px] h-[160px]"
        />
      </div>

      {hasMultiple && (
        <button
          type="button"
          onClick={onNext}
          aria-label="Next avatar"
          className="bg-white text-[#333] border rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-50"
        >
          ›
        </button>
      )}
    </div>
  );
}


