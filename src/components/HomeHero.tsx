import {useEffect, useState} from 'react';
import {home, media} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {Headline} from './Headline';
import {PullBack} from './PullBack';

const HOLD = 6000; // ms each photo shows before the next fades in

/**
 * The home hero: Fairvalue's own site photos crossfading with a slow push-in,
 * so the stills move like the reference's looping film. It pauses when
 * scrolled away and never auto-advances for reduced motion.
 */
export function HomeHero() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);
  const running = !reduced && visible;
  const n = home.slides.length;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setI((k) => (k + 1) % n), HOLD);
    return () => window.clearInterval(id);
  }, [running, n]);

  return (
    <PullBack className="h-svh min-h-[620px]" onVisible={setVisible}>
      <div className={`slideshow absolute inset-0 ${running ? '' : 'paused'}`}>
        {home.slides.map((s, k) => (
          <div key={s.src} className={`slide absolute inset-0 overflow-hidden ${k === i ? 'on' : ''}`} aria-hidden={k !== i}>
            <img
              src={media(s.src)}
              alt={s.alt}
              className="h-full w-full object-cover"
              fetchPriority={k === 0 ? 'high' : 'low'}
              loading={k === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(23_16_13/0.5),transparent_22%),linear-gradient(90deg,rgb(23_16_13/0.7),rgb(23_16_13/0.2)_60%,transparent),linear-gradient(0deg,rgb(23_16_13/0.55),transparent_35%)]" />

      <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(110px,15vh,160px)] md:px-14">
        <Headline lines={home.lines} className="text-[clamp(52px,7.6vw,138px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]" />
        <p className="lede mt-10 max-w-[400px] text-white/90 md:ml-[clamp(0px,19vw,330px)]">{home.body}</p>
      </div>
    </PullBack>
  );
}
