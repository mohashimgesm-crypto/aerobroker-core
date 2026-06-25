'use client';

import {useState} from 'react';
import Image from 'next/image';

// معرض صور الإعلان: صورة رئيسية + صور مصغّرة
export function Gallery({images, alt}: {images: string[]; alt: string}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] w-full rounded-2xl border border-white/10 bg-surface" />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-[4/3] h-20 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                i === active ? 'border-sky' : 'border-white/10 hover:border-white/30'
              }`}
              aria-label={`${alt} ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
