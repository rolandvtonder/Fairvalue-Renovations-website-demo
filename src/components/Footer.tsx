import type {CSSProperties} from 'react';
import {brand, contact, nav, type PageId} from '../content';
import {useFitText} from '../hooks/useFitText';
import {onNavClick} from '../lib/nav';
import {useReveals} from '../hooks/useReveals';

/** Contact columns, then the wordmark running edge to edge in gold. */
export function Footer({page}: {page: PageId}) {
  const word = useFitText<HTMLSpanElement>();
  const root = useReveals<HTMLElement>();

  return (
    <footer ref={root} className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto grid max-w-[1680px] gap-10 px-5 pt-20 pb-10 sm:grid-cols-2 md:px-14 lg:grid-cols-4">
        <div data-reveal>
          <p className="caps text-white/55">Call</p>
          {contact.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="lede block py-0.5 hover:text-gold">
              {p.label}
            </a>
          ))}
          <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener" className="lede block py-0.5 text-gold hover:underline">
            WhatsApp us
          </a>
        </div>
        <div data-reveal style={{'--d': '0.08s'} as CSSProperties}>
          <p className="caps text-white/55">Email</p>
          {contact.emails.map((e) => (
            <a key={e} href={`mailto:${e}`} className="lede block py-0.5 break-all hover:text-gold">
              {e}
            </a>
          ))}
        </div>
        <div data-reveal style={{'--d': '0.16s'} as CSSProperties}>
          <p className="caps text-white/55">Visit</p>
          <a href={contact.maps} target="_blank" rel="noopener" className="lede block hover:text-gold">
            {contact.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </a>
        </div>
        <nav data-reveal style={{'--d': '0.24s'} as CSSProperties} aria-label="Footer">
          <p className="caps text-white/55">Pages</p>
          <ul>
            {nav.map((n) => (
              <li key={n.id}>
                <a href={n.href} onClick={onNavClick} aria-current={n.id === page ? 'page' : undefined} className={`lede block py-0.5 hover:text-gold ${n.id === page ? 'text-gold' : ''}`}>
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href={contact.facebook} target="_blank" rel="noopener" className="lede block py-0.5 hover:text-gold">
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="px-5 md:px-14" aria-hidden>
        <span ref={word} className="display inline-block whitespace-nowrap text-gold">
          {brand.name}
        </span>
      </div>
      <p className="caps mx-auto max-w-[1680px] px-5 pt-4 pb-24 text-white/50 md:px-14">
        © {new Date().getFullYear()} {brand.legal} · Reg No {brand.reg}
      </p>
    </footer>
  );
}
