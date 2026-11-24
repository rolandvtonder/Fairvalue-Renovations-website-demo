import {useRef, useState, type FormEvent} from 'react';
import {brand, contact, contact_page, services} from '../content';
import {useReveals} from '../hooks/useReveals';
import {PageHero} from '../components/PageHero';
import {ChatIcon, MailIcon, PhoneIcon, PinIcon} from '../components/Icons';

type Fields = {name: string; phone: string; email: string; service: string; area: string; message: string};
type Errors = Partial<Record<keyof Fields, string>>;

const initialService = () => {
  const id = new URLSearchParams(location.search).get('service');
  return services.find((s) => s.id === id)?.name ?? '';
};

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please enter your name so we know who to ask for.';
  if (f.phone.replace(/\D/g, '').length < 9) e.phone = 'Please enter a phone number we can call you back on (at least 9 digits).';
  if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'That email address looks incomplete — check it, or leave it blank.';
  if (!f.message.trim()) e.message = 'Tell us a little about the job: what, where and roughly how big.';
  return e;
}

const summary = (f: Fields) => {
  const lines = [`Quote request — ${brand.full}`, '', `Name: ${f.name}`, `Phone: ${f.phone}`];
  if (f.email) lines.push(`Email: ${f.email}`);
  if (f.service) lines.push(`Service: ${f.service}`);
  if (f.area) lines.push(`Area: ${f.area}`);
  lines.push('', f.message.trim());
  return lines.join('\n');
};

export function Contact() {
  const root = useReveals<HTMLElement>();
  const form = useRef<HTMLFormElement>(null);
  const [f, setF] = useState<Fields>({name: '', phone: '', email: '', service: initialService(), area: '', message: ''});
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<'' | 'whatsapp' | 'email'>('');

  const set = (k: keyof Fields) => (e: {target: {value: string}}) => {
    setF((o) => ({...o, [k]: e.target.value}));
    if (errors[k]) setErrors((o) => ({...o, [k]: undefined}));
  };
  // Re-check a field when the visitor leaves it, not on every keystroke.
  const blur = (k: keyof Fields) => () => {
    const msg = validate(f)[k];
    setErrors((o) => ({...o, [k]: msg}));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === 'email' ? 'email' : 'whatsapp';
    const errs = validate(f);
    setErrors(errs);
    const firstBad = (Object.keys(errs) as (keyof Fields)[]).find((k) => errs[k]);
    if (firstBad) {
      form.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    const text = summary(f);
    if (via === 'whatsapp') {
      window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    } else {
      const subject = `Quote request: ${f.service || 'new project'} — ${f.name}`;
      location.href = `mailto:${contact.quoteEmail}?cc=${contact.emails[1]}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
    setSent(via);
  };

  const field = (k: keyof Fields, label: string, opts: {type?: string; required?: boolean; auto?: string; hint?: string} = {}) => (
    <div>
      <label htmlFor={`f-${k}`} className="caps block text-ink/70">
        {label} {opts.required ? <span className="text-maroon" aria-hidden>*</span> : <span className="normal-case tracking-normal text-ink/50">(optional)</span>}
      </label>
      <input
        id={`f-${k}`}
        name={k}
        type={opts.type ?? 'text'}
        autoComplete={opts.auto}
        required={opts.required}
        value={f[k]}
        onChange={set(k)}
        onBlur={blur(k)}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        className="field"
      />
      {errors[k] && (
        <p id={`e-${k}`} role="alert" className="mt-2 text-[14px] text-[#b42318]">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <>
      <PageHero
        index="05"
        label="Get a quote"
        lines={contact_page.lines}
        body={contact_page.body}
        src="build-facade-c.jpg"
        alt="A double-storey house in the plaster stage, with stacked bricks in front"
      />

      <section ref={root} className="bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-16 px-5 py-20 md:px-14 md:py-28 lg:grid-cols-[1fr_1.4fr]">
          {/* Direct contact */}
          <div className="space-y-10">
            <div data-reveal>
              <p className="caps flex items-center gap-2 text-maroon">
                <PhoneIcon /> Call
              </p>
              {contact.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="display mt-2 block text-[clamp(36px,3.4vw,56px)] hover:text-maroon">
                  {p.label}
                </a>
              ))}
            </div>
            <div data-reveal>
              <p className="caps flex items-center gap-2 text-maroon">
                <ChatIcon /> WhatsApp
              </p>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener" className="lede mt-2 inline-block border-b border-ink pb-0.5 hover:text-maroon">
                Chat with us on WhatsApp
              </a>
            </div>
            <div data-reveal>
              <p className="caps flex items-center gap-2 text-maroon">
                <MailIcon /> Email
              </p>
              {contact.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="lede mt-1 block break-all hover:text-maroon">
                  {e}
                </a>
              ))}
            </div>
            <div data-reveal>
              <p className="caps flex items-center gap-2 text-maroon">
                <PinIcon /> Office
              </p>
              <address className="lede mt-1 not-italic">
                {contact.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a href={contact.maps} target="_blank" rel="noopener" className="caps mt-3 inline-flex min-h-11 items-center border-b border-ink pb-0.5 hover:text-maroon">
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Quote form */}
          <form ref={form} id="quote" onSubmit={submit} noValidate className="scroll-mt-24 bg-white p-6 shadow-[0_30px_80px_-40px_rgb(23_16_13/0.35)] md:p-12" aria-labelledby="quote-h">
            <h2 id="quote-h" className="display text-[clamp(40px,4vw,68px)]">
              <span className="block">Request a</span>
              <span className="it block text-maroon">Free quote</span>
            </h2>
            <p className="lede mt-4 text-ink/75">
              Fill this in and choose how to send it. WhatsApp or your email app opens with everything written out — just press send.
            </p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {field('name', 'Your name', {required: true, auto: 'name'})}
              {field('phone', 'Phone number', {type: 'tel', required: true, auto: 'tel'})}
              {field('email', 'Email', {type: 'email', auto: 'email'})}
              {field('area', 'Suburb / area', {auto: 'address-level2'})}
              <div className="sm:col-span-2">
                <label htmlFor="f-service" className="caps block text-ink/70">
                  Type of work <span className="normal-case tracking-normal text-ink/50">(optional)</span>
                </label>
                <select id="f-service" name="service" value={f.service} onChange={set('service')} className="field">
                  <option value="">Not sure yet / several</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-message" className="caps block text-ink/70">
                  About the job <span className="text-maroon" aria-hidden>*</span>
                </label>
                <textarea
                  id="f-message"
                  name="message"
                  rows={5}
                  required
                  value={f.message}
                  onChange={set('message')}
                  onBlur={blur('message')}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? 'e-message' : 'h-message'}
                  className="field resize-y"
                />
                {errors.message ? (
                  <p id="e-message" role="alert" className="mt-2 text-[14px] text-[#b42318]">
                    {errors.message}
                  </p>
                ) : (
                  <p id="h-message" className="mt-2 text-[14px] text-ink/60">
                    For example: “Retile a 3×2 m bathroom and replace the bath” or “New paved driveway, about 60 m².”
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button type="submit" value="whatsapp" className="caps flex min-h-14 flex-1 items-center justify-center gap-3 bg-ink px-6 text-white transition-colors hover:bg-maroon">
                <ChatIcon /> Send on WhatsApp
              </button>
              <button type="submit" value="email" className="caps flex min-h-14 flex-1 items-center justify-center gap-3 border border-ink px-6 transition-colors hover:bg-ink hover:text-white">
                <MailIcon /> Send by email
              </button>
            </div>
            <p className="mt-4 text-[14px] text-ink/60" aria-live="polite">
              {sent === 'whatsapp' && 'WhatsApp has opened with your request — press send there and we’ll reply as soon as we can.'}
              {sent === 'email' && 'Your email app has opened with your request — press send there and we’ll reply as soon as we can.'}
              {!sent && <><span className="text-maroon">*</span> Required</>}
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
