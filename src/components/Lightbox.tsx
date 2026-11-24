import {useEffect, useRef} from 'react';
import {media, type Photo} from '../content';
import {lockScroll} from '../lib/scroll';
import {ChevronIcon, CloseIcon} from './Icons';

/** Full-screen photo viewer: arrows / swipe-free buttons, Escape to close. */
export function Lightbox({
  list,
  index,
  onIndex,
  onClose,
}: {
  list: Photo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const photo = list[index];
  const go = (d: number) => onIndex((index + d + list.length) % list.length);

  useEffect(() => {
    lockScroll(true);
    const opener = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    return () => {
      lockScroll(false);
      opener?.focus({preventScroll: true});
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!photo) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[65] flex flex-col bg-ink/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="caps text-white/70">
          {index + 1} / {list.length}
        </p>
        <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close photo viewer" className="flex size-11 items-center justify-center text-white hover:text-gold">
          <CloseIcon width={22} height={22} />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 md:px-24">
        <img key={photo.src} src={media(photo.src)} alt={photo.alt} className="max-h-full max-w-full object-contain" />
        <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-1 flex size-12 items-center justify-center text-white hover:text-gold md:left-6">
          <ChevronIcon dir="left" width={28} height={28} />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-1 flex size-12 items-center justify-center text-white hover:text-gold md:right-6">
          <ChevronIcon width={28} height={28} />
        </button>
      </div>
      <p className="lede px-5 py-5 text-center text-white/80">{photo.alt}</p>
    </div>
  );
}
