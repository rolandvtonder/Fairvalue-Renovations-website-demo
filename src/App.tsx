import {useCallback, useEffect, useRef, useState, type ReactElement} from 'react';
import {brand, media, url, type PageId} from './content';
import {lockScroll, startScroll} from './lib/scroll';
import {onNavClick} from './lib/nav';
import {useReducedMotion} from './hooks/useReducedMotion';
import {Menu} from './components/Menu';
import {Curtain} from './components/Curtain';
import {Footer} from './components/Footer';
import {Home} from './pages/Home';
import {Services} from './pages/Services';
import {Projects} from './pages/Projects';
import {About} from './pages/About';
import {Contact} from './pages/Contact';

const PAGES: Record<PageId, () => ReactElement> = {
  home: Home,
  services: Services,
  projects: Projects,
  about: About,
  contact: Contact,
};

export default function App({page}: {page: PageId}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => startScroll(reduced), [reduced]);
  useEffect(() => lockScroll(open), [open]);

  const close = useCallback(() => {
    setOpen((was) => {
      if (was) menuBtn.current?.focus({preventScroll: true});
      return false;
    });
  }, []);

  const Page = PAGES[page] ?? Home;

  return (
    <>
      <a href="#main" className="caps fixed top-3 left-3 z-[80] -translate-y-20 bg-gold px-4 py-3 text-ink focus:translate-y-0">
        Skip to content
      </a>

      {/* Logo: the gold mark stays gold; the wordmark inverts against whatever is behind it. */}
      <a href={url()} onClick={onNavClick} tabIndex={-1} aria-hidden className="fixed top-5 left-5 z-[55] md:top-7 md:left-14">
        <img src={media('fv-mark.png')} alt="" width={122} height={154} className="h-[38px] w-auto drop-shadow-[0_2px_10px_rgb(0_0_0/0.35)]" />
      </a>
      <a
        href={url()}
        onClick={onNavClick}
        aria-label={`${brand.full} — home`}
        className="fixed top-[26px] left-[62px] z-[55] text-white mix-blend-difference md:top-[34px] md:left-[92px]"
      >
        <span className="display block text-[22px] tracking-[0.2em]">{brand.name}</span>
        <span className="caps -mt-0.5 block text-[9px] tracking-[0.3em] max-sm:hidden">Renovations &amp; Projects</span>
      </a>

      <button
        ref={menuBtn}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`caps fixed top-5 right-5 z-[55] flex min-h-11 items-center gap-4 px-6 py-3 backdrop-blur-md transition-colors duration-500 md:top-7 md:right-8 ${
          open ? 'bg-ink text-white' : 'bg-ink/75 text-white hover:bg-ink'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[18px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <a
        href={page === 'contact' ? '#quote' : url('contact/#quote')}
        onClick={onNavClick}
        className={`caps fixed right-5 bottom-5 z-[55] px-7 py-4 text-ink shadow-[0_10px_30px_rgb(0_0_0/0.25)] transition-[background-color,opacity,translate] duration-500 md:right-8 md:bottom-7 ${
          open ? 'pointer-events-none translate-y-4 bg-gold opacity-0' : 'bg-gold hover:bg-gold-bright'
        }`}
      >
        Get a <em className="font-serif text-[15px] normal-case tracking-normal">quote</em>
      </a>

      <main id="main">
        <Page />
      </main>
      <Footer page={page} />

      <Menu open={open} page={page} onClose={close} />
      <Curtain reduced={reduced} />
      <div className="grain" aria-hidden />
    </>
  );
}
