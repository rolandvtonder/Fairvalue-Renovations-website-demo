import {useState} from 'react';
import {media} from '../content';

/**
 * Before / after: drag the gold handle (or use the arrow keys) to wipe
 * between the two photos. The control is a real range input laid over the
 * photos, so mouse, touch and keyboard all work without custom drag code.
 */
export function BeforeAfter({before, after}: {before: {src: string; alt: string}; after: {src: string; alt: string}}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink select-none md:aspect-[4/3]">
      <img src={media(after.src)} alt={after.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <img
        src={media(before.src)}
        alt={before.alt}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{clipPath: `inset(0 ${100 - pos}% 0 0)`}}
      />
      <span className="caps pointer-events-none absolute top-4 left-4 bg-ink/70 px-3 py-1 text-white">Before</span>
      <span className="caps pointer-events-none absolute top-4 right-4 bg-gold px-3 py-1 text-ink">After</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after. Slide to show more of the before photo."
        className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <div className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-gold peer-focus-visible:w-[4px]" style={{left: `${pos}%`}}>
        <div className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-ink shadow-lg">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
