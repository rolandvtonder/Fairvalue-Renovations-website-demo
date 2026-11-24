import {useEffect, useRef, type ReactNode} from 'react';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * A full-bleed hero stage that, as you scroll past it, drifts down, blurs,
 * dims and shrinks back — the camera pulling away rather than a fade.
 * Calls `onVisible` so slideshows can pause once the hero is gone.
 */
export function PullBack({
  children,
  className = '',
  onVisible,
}: {
  children: ReactNode;
  className?: string;
  onVisible?: (visible: boolean) => void;
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cb = useRef(onVisible);
  cb.current = onVisible;

  useEffect(() => {
    let wasVisible = true;
    return onFrame(() => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      const p = clamp(-r.top / Math.max(1, r.height));
      const visible = p < 0.98;
      if (visible !== wasVisible) {
        wasVisible = visible;
        cb.current?.(visible);
      }
      if (stage.current) {
        stage.current.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        stage.current.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }
    });
  }, []);

  return (
    <section ref={root} className={`relative overflow-hidden bg-ink ${className}`}>
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        {children}
      </div>
    </section>
  );
}
