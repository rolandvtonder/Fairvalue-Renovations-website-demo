import {contact, url} from '../content';
import {onNavClick} from '../lib/nav';
import {useReveals} from '../hooks/useReveals';
import {ArrowIcon, ChatIcon, PhoneIcon} from './Icons';

/** The gold "tell us about your project" band that closes most pages. */
export function CallBand({quoteHref = url('contact/#quote')}: {quoteHref?: string}) {
  const root = useReveals<HTMLElement>();
  return (
    <section ref={root} className="bg-gold text-ink">
      <div className="mx-auto grid max-w-[1680px] gap-10 px-5 py-20 md:grid-cols-[1.3fr_1fr] md:items-end md:px-14 md:py-28">
        <h2 data-reveal className="display text-[clamp(44px,6vw,104px)]">
          <span className="block">Tell us about</span>
          <span className="it block">Your project</span>
        </h2>
        <div data-reveal className="flex flex-col gap-3">
          <a href={quoteHref} onClick={onNavClick} className="caps flex min-h-14 items-center justify-between bg-ink px-6 text-white transition-colors hover:bg-maroon">
            Request a free quote <ArrowIcon />
          </a>
          <a href={`tel:${contact.phones[0].tel}`} className="caps flex min-h-14 items-center justify-between border border-ink/40 px-6 transition-colors hover:bg-ink/10">
            Call {contact.phones[0].label} <PhoneIcon />
          </a>
          <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener" className="caps flex min-h-14 items-center justify-between border border-ink/40 px-6 transition-colors hover:bg-ink/10">
            WhatsApp us <ChatIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
