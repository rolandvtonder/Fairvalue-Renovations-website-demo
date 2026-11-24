import type {CSSProperties} from 'react';
import {media, services, services_page, url} from '../content';
import {onNavClick} from '../lib/nav';
import {useReveals} from '../hooks/useReveals';
import {PageHero} from '../components/PageHero';
import {CallBand} from '../components/CallBand';
import {ArrowIcon} from '../components/Icons';

export function Services() {
  const root = useReveals<HTMLElement>();

  return (
    <>
      <PageHero
        index="02"
        label="Services"
        lines={services_page.lines}
        body={services_page.body}
        src="build-facade-gate.jpg"
        alt="A double-storey home under construction behind a new steel gate"
      />

      <section ref={root} className="bg-paper text-ink" aria-label="Our services">
        <ol className="mx-auto max-w-[1680px] px-5 py-16 md:px-14 md:py-24">
          {services.map((s, i) => (
            <li
              key={s.id}
              id={s.id}
              className="grid scroll-mt-24 gap-6 border-t border-ink/20 py-10 md:grid-cols-[80px_1.2fr_1fr_minmax(0,0.9fr)] md:gap-10 md:py-14"
            >
              <span data-reveal className="caps text-maroon">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 data-reveal className="display text-[clamp(40px,4.4vw,76px)]" style={{'--d': '0.05s'} as CSSProperties}>
                {s.name.split(' ').map((w, k, all) => (
                  <span key={k} className={k === all.length - 1 && all.length > 1 ? 'it' : ''}>
                    {w}{' '}
                  </span>
                ))}
              </h2>
              <div data-reveal style={{'--d': '0.1s'} as CSSProperties}>
                <p className="lede max-w-[46ch] text-ink/80">{s.body}</p>
                <a href={url(`contact/?service=${s.id}#quote`)} onClick={onNavClick} className="caps mt-6 inline-flex min-h-11 items-center gap-3 border-b border-ink pb-1 hover:text-maroon">
                  Quote for {s.name.toLowerCase()} <ArrowIcon width={16} height={16} />
                </a>
              </div>
              <div data-reveal style={{'--d': '0.15s'} as CSSProperties}>
                {s.src ? (
                  <img src={media(s.src)} alt={s.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                ) : (
                  <div className="flex aspect-[4/3] w-full items-end bg-sand p-6" aria-hidden>
                    <span className="display text-[64px] text-maroon/25">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <CallBand />
    </>
  );
}
