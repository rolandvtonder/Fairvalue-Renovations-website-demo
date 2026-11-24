import type {Line} from '../content';

/** The big mixed upright/italic headline; which lines lean is data in content.ts. */
export function Headline({lines, className = '', as: Tag = 'h1'}: {lines: Line[]; className?: string; as?: 'h1' | 'h2'}) {
  return (
    <Tag className={`display ${className}`}>
      {lines.map((l, i) => (
        <span key={l.t} className={`block ${l.i ? 'it' : ''} ${i === 0 ? 'pl-[1.2em] max-sm:pl-[0.6em]' : ''}`}>
          {l.t}
        </span>
      ))}
    </Tag>
  );
}
