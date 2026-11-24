import {useEffect, useMemo, useState, type CSSProperties} from 'react';
import {categories, media, photos, projects_page, type Category} from '../content';
import {useReveals} from '../hooks/useReveals';
import {PageHero} from '../components/PageHero';
import {Lightbox} from '../components/Lightbox';
import {CallBand} from '../components/CallBand';

type Filter = Category | 'all';
const isFilter = (s: string): s is Filter => categories.some((c) => c.id === s);

export function Projects() {
  const root = useReveals<HTMLElement>();
  const [filter, setFilter] = useState<Filter>(() => {
    const h = location.hash.slice(1);
    return isFilter(h) ? h : 'all';
  });
  const [open, setOpen] = useState(-1);
  const list = useMemo(() => (filter === 'all' ? photos : photos.filter((p) => p.cat === filter)), [filter]);

  // Keep the filter in the URL so a filtered view can be shared or linked to.
  useEffect(() => {
    history.replaceState(null, '', filter === 'all' ? location.pathname : `#${filter}`);
  }, [filter]);

  return (
    <>
      <PageHero
        index="03"
        label="Projects"
        lines={projects_page.lines}
        body={projects_page.body}
        src="pool-tiled-curve.jpg"
        alt="A curved swimming pool freshly tiled in blue, with grey coping"
      />

      <section ref={root} className="bg-paper text-ink" aria-label="Project photos">
        <div className="mx-auto max-w-[1680px] px-5 py-14 md:px-14 md:py-20">
          <div role="group" aria-label="Filter photos by type of work" className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const count = c.id === 'all' ? photos.length : photos.filter((p) => p.cat === c.id).length;
              const on = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(c.id)}
                  className={`caps min-h-11 border px-5 transition-colors ${on ? 'border-ink bg-ink text-white' : 'border-ink/25 hover:border-ink'}`}
                >
                  {c.label} <span className={on ? 'text-gold' : 'text-ink/50'}>{count}</span>
                </button>
              );
            })}
          </div>

          <ul key={filter} className="mt-10 columns-1 gap-3 sm:columns-2 lg:columns-3 xl:columns-4">
            {list.map((p, i) => (
              <li key={p.src} data-reveal className="mb-3 break-inside-avoid" style={{'--d': `${Math.min(i, 8) * 0.04}s`} as CSSProperties}>
                <button type="button" onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden bg-sand" aria-label={`Open photo: ${p.alt}`}>
                  <img src={media(p.src)} alt="" loading="lazy" className="w-full transition-transform duration-700 ease-silk group-hover:scale-[1.04]" />
                  <span className="caps absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgb(23_16_13/0.8),transparent)] px-4 pt-10 pb-3 text-left text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {categories.find((c) => c.id === p.cat)?.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {open >= 0 && <Lightbox list={list} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}
      <CallBand />
    </>
  );
}
