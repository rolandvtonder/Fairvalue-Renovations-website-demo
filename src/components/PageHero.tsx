import {media, type Line} from '../content';
import {Headline} from './Headline';
import {PullBack} from './PullBack';

/** The inner-page hero: one photo, the mixed headline, a short paragraph. */
export function PageHero({
  index,
  label,
  lines,
  body,
  src,
  alt,
}: {
  index: string;
  label: string;
  lines: Line[];
  body: string;
  src: string;
  alt: string;
}) {
  return (
    <PullBack className="h-[86svh] min-h-[560px]">
      <img src={media(src)} alt={alt} className="h-full w-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(23_16_13/0.5),transparent_22%),linear-gradient(90deg,rgb(23_16_13/0.72),rgb(23_16_13/0.25)_60%,transparent),linear-gradient(0deg,rgb(23_16_13/0.6),transparent_40%)]" />
      <div className="absolute inset-0 mx-auto flex max-w-[1680px] flex-col justify-end px-5 pb-[clamp(90px,14vh,150px)] md:px-14">
        <p className="caps mb-6 text-gold">
          {index} — {label}
        </p>
        <Headline lines={lines} className="text-[clamp(48px,7vw,124px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]" />
        <p className="lede mt-8 max-w-[440px] text-white/85 md:ml-[clamp(0px,16vw,280px)]">{body}</p>
      </div>
    </PullBack>
  );
}
