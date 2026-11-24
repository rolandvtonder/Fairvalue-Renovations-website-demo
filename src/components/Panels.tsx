import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {media, panels} from '../content';
import {onNavClick} from '../lib/nav';
import {ArrowIcon} from './Icons';

/**
 * What we build: three tall panels slide in from the right one after another
 * (the reference's fleet), each a trade with its own photo drifting slowly.
 * Each panel is a link into that part of the projects gallery.
 */
export function Panels() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), {threshold: 0.2});
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} aria-labelledby="what-we-build" className="relative bg-ink">
      <h2 id="what-we-build" className="sr-only">
        What we build
      </h2>
      <div className="grid h-svh min-h-[620px] grid-cols-3 gap-[3px] overflow-hidden max-md:h-auto max-md:grid-cols-1">
        {panels.map((b, i) => (
          <a
            key={b.id}
            href={b.href}
            onClick={onNavClick}
            className={`group relative block overflow-hidden bg-maroon transition-transform duration-[1100ms] ease-wipe max-md:h-[78svh] ${shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'}`}
            style={{transitionDelay: `${0.12 + i * 0.16}s`} as CSSProperties}
          >
            <img
              src={media(b.src)}
              alt={b.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(23_16_13/0.7),transparent_40%,transparent_60%,rgb(23_16_13/0.75))]" />
            <div className="relative flex h-full flex-col justify-between p-7 pt-28 md:p-9 md:pt-32">
              <div>
                <p className="caps text-gold">0{i + 1}</p>
                <h3 className="display mt-3 text-[clamp(38px,3.6vw,64px)] text-white">
                  <span className="block">{b.name[0]}</span>
                  <span className="it block">{b.name[1]}</span>
                </h3>
                <dl className={`mt-6 space-y-3 transition-opacity delay-[1400ms] duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                  {b.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-white/65">{k}</dt>
                      <dd className="caps text-[13px] text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <span className="caps flex items-center gap-3 self-start border-b border-white/50 pb-1 text-white transition-colors group-hover:border-gold group-hover:text-gold max-md:mb-16">
                See the work <ArrowIcon width={16} height={16} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
