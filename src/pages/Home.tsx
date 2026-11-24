import type {CSSProperties} from 'react';
import {home, services, url} from '../content';
import {onNavClick} from '../lib/nav';
import {useReveals} from '../hooks/useReveals';
import {HomeHero} from '../components/HomeHero';
import {Panels} from '../components/Panels';
import {BeforeAfter} from '../components/BeforeAfter';
import {CallBand} from '../components/CallBand';
import {ArrowIcon} from '../components/Icons';

export function Home() {
  const intro = useReveals<HTMLElement>();
  const list = useReveals<HTMLElement>();
  const ba = useReveals<HTMLElement>();

  return (
    <>
      <HomeHero />
      <Panels />

      {/* Who we are, in one sentence, plus the facts from the company profile */}
      <section ref={intro} className="bg-paper text-ink">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-36">
          <p data-reveal className="caps text-maroon">
            Fairvalue Renovations &amp; Projects
          </p>
          <p data-reveal className="mt-6 max-w-[34ch] font-serif text-[clamp(30px,3.8vw,64px)] leading-[1.08]" style={{'--d': '0.08s'} as CSSProperties}>
            {home.intro}
          </p>
          <dl className="mt-16 grid grid-cols-2 gap-x-6 md:mt-24 md:grid-cols-4">
            {home.facts.map(([v, k], i) => (
              <div key={k} data-reveal className="border-t border-ink/20 py-6 pr-4 md:py-8" style={{'--d': `${0.06 * i}s`} as CSSProperties}>
                <dt className="sr-only">{k}</dt>
                <dd>
                  <span className="display block text-[clamp(34px,5vw,84px)] text-maroon">{v}</span>
                  <span className="caps mt-2 block text-ink/70">{k}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Every service, as an index that links into the services page */}
      <section ref={list} className="bg-sand text-ink" aria-labelledby="services-h">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:grid-cols-[1fr_2fr] md:px-14 md:py-32">
          <div>
            <h2 id="services-h" data-reveal className="display text-[clamp(44px,5vw,88px)]">
              <span className="block">What we</span>
              <span className="it block">Do</span>
            </h2>
            <a data-reveal href={url('services/')} onClick={onNavClick} className="caps mt-8 inline-flex min-h-11 items-center gap-3 border-b border-ink pb-1 hover:text-maroon">
              All services <ArrowIcon width={16} height={16} />
            </a>
          </div>
          <ul className="grid sm:grid-cols-2 sm:gap-x-10">
            {services.map((s, i) => (
              <li key={s.id} data-reveal style={{'--d': `${0.03 * i}s`} as CSSProperties}>
                <a
                  href={url(`services/#${s.id}`)}
                  onClick={onNavClick}
                  className="group flex items-baseline gap-4 border-b border-ink/20 py-4 transition-colors hover:text-maroon"
                >
                  <span className="caps w-7 text-ink/50">{String(i + 1).padStart(2, '0')}</span>
                  <span className="display text-[clamp(26px,2.4vw,38px)] group-hover:italic">{s.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Before / after */}
      <section ref={ba} className="bg-ink" aria-labelledby="ba-h">
        <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-5 py-24 md:grid-cols-[1fr_1.6fr] md:px-14 md:py-32">
          <div>
            <p data-reveal className="caps text-gold">
              Pool refurbishment
            </p>
            <h2 id="ba-h" data-reveal className="display mt-4 text-[clamp(44px,5vw,88px)] text-white">
              <span className="block">{home.beforeAfter.title[0]}</span>
              <span className="it block">{home.beforeAfter.title[1]}</span>
            </h2>
            <p data-reveal className="lede mt-6 max-w-[380px] text-white/80">
              {home.beforeAfter.body}
            </p>
          </div>
          <div data-reveal>
            <BeforeAfter before={home.beforeAfter.before} after={home.beforeAfter.after} />
          </div>
        </div>
      </section>

      <CallBand />
    </>
  );
}
