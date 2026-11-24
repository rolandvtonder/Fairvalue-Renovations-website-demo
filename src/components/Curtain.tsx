import {useEffect, useRef} from 'react';
import {registerLeave} from '../lib/nav';

const SLABS = ['bg-ink', 'bg-gold', 'bg-paper'];
const DUR = 700; // ms per slab
const STAGGER = 90; // ms between slabs

/**
 * The page transition. Arriving: three slabs (ink, gold, paper) already cover
 * the screen and wipe off to the left one after another. Leaving: they wipe
 * back in from the right, and the browser loads the next page under them.
 * Styles are written directly so nothing re-renders mid-wipe.
 */
export function Curtain({reduced}: {reduced: boolean}) {
  const slabs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const list = slabs.current.filter(Boolean) as HTMLDivElement[];
    const set = (x: string, animate: boolean, reverse = false) =>
      list.forEach((el, i) => {
        const k = reverse ? list.length - 1 - i : i;
        el.style.transition = animate ? `transform ${DUR}ms var(--ease-wipe) ${k * STAGGER}ms` : 'none';
        el.style.transform = `translate3d(${x}, 0, 0)`;
      });

    const reveal = () => {
      if (reduced) return set('-104%', false);
      // Paper slab (top) leaves first, so the arrival is paper → gold → ink.
      requestAnimationFrame(() => requestAnimationFrame(() => set('-104%', true, true)));
    };
    reveal();

    registerLeave((href) => {
      if (reduced) {
        location.href = href;
        return;
      }
      set('104%', false);
      void list[0]?.offsetWidth; // commit the off-screen start before animating in
      set('0%', true);
      window.setTimeout(() => (location.href = href), DUR + STAGGER * 2);
    });

    // Coming back via the browser's back button restores the covered page from cache.
    const onShow = (e: PageTransitionEvent) => e.persisted && set('-104%', false);
    window.addEventListener('pageshow', onShow);
    return () => {
      registerLeave(null);
      window.removeEventListener('pageshow', onShow);
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden>
      {SLABS.map((c, i) => (
        <div
          key={c}
          ref={(el) => {
            slabs.current[i] = el;
          }}
          className={`absolute inset-0 ${c}`}
        />
      ))}
    </div>
  );
}
