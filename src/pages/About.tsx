import type {CSSProperties} from 'react';
import {about, brand, media} from '../content';
import {useReveals} from '../hooks/useReveals';
import {PageHero} from '../components/PageHero';
import {CallBand} from '../components/CallBand';

export function About() {
  const story = useReveals<HTMLElement>();
  const values = useReveals<HTMLElement>();

  return (
    <>
      <PageHero
        index="04"
        label="About us"
        lines={about.lines}
        body={about.body}
        src="build-plastering.jpg"
        alt="Two plasterers on scaffolding plastering a new wall under a blue sky"
      />

      <section ref={story} className="bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-14 px-5 py-24 md:grid-cols-2 md:px-14 md:py-32">
          <div>
            <p data-reveal className="caps text-maroon">
              Our story
            </p>
            <h2 data-reveal className="display mt-5 text-[clamp(44px,5vw,88px)]">
              <span className="block">Registered</span>
              <span className="it block">In 2017</span>
            </h2>
            <div className="mt-10 space-y-5">
              {about.story.map((p, i) => (
                <p key={i} data-reveal className="lede max-w-[58ch] text-ink/85" style={{'--d': `${0.06 * i}s`} as CSSProperties}>
                  {p}
                </p>
              ))}
            </div>
            <p data-reveal className="caps mt-10 text-ink/60">
              {brand.legal} · Reg No {brand.reg}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 self-start">
            <img data-reveal src={media('build-brickwork-d.jpg')} alt="Bricklayers raising a chimney on scaffolding" loading="lazy" className="col-span-2 aspect-[4/3] w-full object-cover" />
            <img data-reveal src={media('tiling-wall-work.jpg')} alt="A tiler setting large wall tiles in a bathroom" loading="lazy" className="aspect-[3/4] w-full object-cover" style={{'--d': '0.08s'} as CSSProperties} />
            <img data-reveal src={media('interior-cabinets.jpg')} alt="A carpenter fitting white built-in cupboards" loading="lazy" className="aspect-[3/4] w-full object-cover" style={{'--d': '0.16s'} as CSSProperties} />
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="bg-ink text-white" aria-labelledby="founders-h">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-28">
          <h2 id="founders-h" className="caps text-gold">
            Founded by
          </h2>
          <ul className="mt-8 grid gap-px bg-white/15 md:grid-cols-2">
            {about.founders.map((f) => (
              <li key={f.name} className="bg-ink py-8 md:pr-10">
                <p className="display text-[clamp(38px,4vw,68px)]">{f.name}</p>
                <p className="caps mt-3 text-white/65">{f.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section ref={values} className="bg-sand text-ink" aria-labelledby="values-h">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <h2 id="values-h" data-reveal className="display text-[clamp(44px,5vw,88px)]">
            <span className="block">How we</span>
            <span className="it block">Work</span>
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {about.values.map(([t, b], i) => (
              <li key={t} data-reveal className="border-t border-ink/25 pt-6" style={{'--d': `${0.08 * i}s`} as CSSProperties}>
                <p className="caps text-maroon">0{i + 1}</p>
                <h3 className="display mt-3 text-[clamp(32px,3vw,48px)]">{t}</h3>
                <p className="lede mt-3 text-ink/80">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CallBand />
    </>
  );
}
