/**
 * All copy, contact details and photo lists live here. Edit this file to
 * change what the site says; the components only lay it out.
 */

export const media = (f: string) => `${import.meta.env.BASE_URL}media/${f}`;

/** A link to one of the site's own pages. Goes through BASE_URL so the site
    also works when hosted in a sub-folder (GitHub Pages: /repo-name/). */
export const url = (p = '') => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;

export const brand = {
  name: 'Fairvalue',
  full: 'Fairvalue Renovations & Projects',
  legal: 'Fairvalue Renovations and Projects (Pty) Ltd',
  reg: '2017/464854/07',
};

export const contact = {
  phones: [
    {label: '084 020 7846', tel: '+27840207846'},
    {label: '074 042 3533', tel: '+27740423533'},
  ],
  /** WhatsApp goes to the main number. */
  whatsapp: '27840207846',
  emails: ['info@fairvalueprojectsotto.co.za', 'fairvalueotto21@gmail.com'],
  /** Quote requests sent by email go here. */
  quoteEmail: 'info@fairvalueprojectsotto.co.za',
  address: ['426 Gen. De Wet Street', 'Pretoria North', '0182'],
  maps: 'https://www.google.com/maps/search/?api=1&query=426+Gen+De+Wet+Street+Pretoria+North+0182',
  /** Google Maps embed for the Contact page (no API key needed). */
  mapEmbed: 'https://maps.google.com/maps?q=426+Generaal+De+Wet+St,+Pretoria+North,+0182&z=16&output=embed',
  facebook: 'https://www.facebook.com/p/Fairvalue-Renovations-and-Projects-100077483002222/',
};

export type PageId = 'home' | 'services' | 'projects' | 'about' | 'contact';

export const nav: {id: PageId; label: string; href: string}[] = [
  {id: 'home', label: 'Home', href: url()},
  {id: 'services', label: 'Services', href: url('services/')},
  {id: 'projects', label: 'Projects', href: url('projects/')},
  {id: 'about', label: 'About us', href: url('about/')},
  {id: 'contact', label: 'Get a quote', href: url('contact/')},
];

/** Headline lines; `i` lines are set in italic. */
export type Line = {t: string; i?: boolean};

export const home = {
  lines: [{t: 'Built with'}, {t: 'Care.', i: true}, {t: 'Priced at fair'}, {t: 'Value', i: true}] as Line[],
  body: 'A full-service general contractor for homes and businesses across Pretoria. From the first trench to the final tile, your next project starts here.',
  /** Hero slideshow: high-resolution free stock photos (Unsplash licence), 2400px wide.
      Fairvalue's own site photos are shown on the Projects page. */
  slides: [
    {src: 'hero-house.jpg', alt: 'A modern double-storey house with large windows and a swimming pool'},
    {src: 'hero-bricklaying.jpg', alt: 'A bricklayer spreading mortar on a block wall with a trowel'},
    {src: 'hero-pool.jpg', alt: 'A white modern home beside a swimming pool and paved deck'},
    {src: 'hero-plastering.jpg', alt: 'Hands smoothing fresh plaster onto a wall with trowels'},
    {src: 'hero-bathroom.jpg', alt: 'A modern bathroom with large-format tiles, a glass shower and a freestanding bath'},
  ],
  intro:
    'One team from foundations to finishes. We build, renovate and extend homes and commercial spaces — and handle the tiling, plumbing, electrical, paving and pools along the way.',
  facts: [
    ['2017', 'Registered company'],
    ['15+', 'Years in construction'],
    ['11', 'Services under one roof'],
    ['Pretoria', 'North, Gauteng'],
  ] as [string, string][],
  beforeAfter: {
    title: ['From green', 'To blue'],
    body: 'A tired, green pool brought back to life: cleaned, repaired and refinished.',
    before: {src: 'pool-before-green.jpg', alt: 'Before: a swimming pool with green water and stained coping'},
    after: {src: 'pool-after-blue.jpg', alt: 'After: the swimming pool refinished in light blue, empty and clean'},
  },
};

export type Panel = {
  id: string;
  name: [string, string];
  specs: [string, string][];
  src: string;
  alt: string;
  href: string;
};

/** The three tall panels on the home page (the reference's "fleet"). */
export const panels: Panel[] = [
  {
    id: 'build',
    name: ['New', 'Builds'],
    specs: [['From', 'Foundations to roof'], ['For', 'Homes & businesses']],
    src: 'build-facade-c.jpg',
    alt: 'A double-storey house in the plaster stage, with stacked bricks in front',
    href: url('projects/#build'),
  },
  {
    id: 'pools',
    name: ['Swimming', 'Pools'],
    specs: [['New pools', 'Shell to tile'], ['Refurbs', 'Re-tile & coping']],
    src: 'pool-new-rect.jpg',
    alt: 'A new rectangular pool tiled in blue with a mosaic band, behind fresh white coping',
    href: url('projects/#pools'),
  },
  {
    id: 'bathrooms',
    name: ['Bathrooms', '& Tiling'],
    specs: [['Floors & walls', 'Porcelain & ceramic'], ['Fit-outs', 'Plumbing included']],
    src: 'bath-dark-finish.jpg',
    alt: 'A finished bathroom in charcoal wall tiles with a white bath and toilet',
    href: url('projects/#bathrooms'),
  },
];

export type Service = {id: string; name: string; body: string; src?: string; alt?: string};

export const services: Service[] = [
  {
    id: 'building',
    name: 'Building',
    body: 'New homes, double storeys and commercial structures — setting out, foundations, brickwork, plaster and roof, run as one job by one team.',
    src: 'build-facade-gate.jpg',
    alt: 'A double-storey home under construction',
  },
  {
    id: 'renovations',
    name: 'Renovations & extensions',
    body: 'Extra rooms, second storeys, open-plan conversions and full upgrades of tired homes and offices, planned around how you live and work.',
    src: 'interior-bulkhead-a.jpg',
    alt: 'A renovated interior with new bulkhead ceilings',
  },
  {
    id: 'tiling',
    name: 'Tiling',
    body: 'Floors, walls, bathrooms and kitchens in porcelain and ceramic, laid level and true with clean, straight grout lines.',
    src: 'tiling-floor-a.jpg',
    alt: 'A large-format tiled floor being laid in a new room',
  },
  {
    id: 'roofing',
    name: 'Roofing & carpentry',
    body: 'Roof structures, trusses, tiles and sheeting, ceilings and bulkheads, and built-in joinery for kitchens and bedrooms.',
    src: 'interior-bulkhead-c.jpg',
    alt: 'Plastered ceiling bulkheads in a new house',
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    body: 'Bathroom and kitchen fit-outs, supply and waste lines, and installing baths, showers, basins and toilets.',
    src: 'bath-white.jpg',
    alt: 'A new bathroom with a white bath, basin and toilet',
  },
  {
    id: 'electrical',
    name: 'Electrical installation',
    body: 'Wiring for new builds, extensions and renovations: lighting, plug points and distribution boards.',
  },
  {
    id: 'pools',
    name: 'Swimming pools',
    body: 'New pools built from the shell up, plus refurbishments: repairs, re-tiling, new coping and green pools brought back to blue.',
    src: 'pool-tiled-curve.jpg',
    alt: 'A curved pool newly tiled in blue',
  },
  {
    id: 'paving',
    name: 'Paving',
    body: 'Driveways, walkways and patios in interlocking pavers, on a properly compacted base that drains the right way.',
    src: 'paving-driveway-b.jpg',
    alt: 'A herringbone paved driveway being laid',
  },
  {
    id: 'stormwater',
    name: 'Storm water drainage',
    body: 'Channels, pipes and soakaways that lead water away from foundations, paving and boundary walls before it does damage.',
    src: 'build-trench.jpg',
    alt: 'A trench dug and lined with brick along a boundary',
  },
  {
    id: 'welding',
    name: 'Welding',
    body: 'Steel structures, roof frames, gates and burglar bars, fabricated and fitted on site.',
    src: 'build-steel-structure.jpg',
    alt: 'A large steel-framed structure being erected',
  },
  {
    id: 'epoxy',
    name: 'Epoxy flooring',
    body: 'Seamless, hard-wearing epoxy floors for garages, workshops, warehouses and commercial spaces.',
  },
];

export type Category = 'build' | 'pools' | 'paving' | 'bathrooms' | 'interiors';

export const categories: {id: Category | 'all'; label: string}[] = [
  {id: 'all', label: 'All work'},
  {id: 'build', label: 'New builds'},
  {id: 'pools', label: 'Pools'},
  {id: 'paving', label: 'Paving'},
  {id: 'bathrooms', label: 'Bathrooms & tiling'},
  {id: 'interiors', label: 'Interiors'},
];

export type Photo = {src: string; cat: Category; alt: string; tall?: boolean};

/** Gallery order: strongest finished work first within each trade. */
export const photos: Photo[] = [
  {src: 'build-double-storey-wide.jpg', cat: 'build', alt: 'Newly plastered double-storey house with a tiled roof'},
  {src: 'build-facade-gate.jpg', cat: 'build', alt: 'Double-storey home under construction behind a steel gate', tall: true},
  {src: 'pool-tiled-curve.jpg', cat: 'pools', alt: 'Curved pool freshly tiled in blue with grey coping'},
  {src: 'bath-dark-finish.jpg', cat: 'bathrooms', alt: 'Bathroom finished in charcoal tiles with a white bath and toilet', tall: true},
  {src: 'paving-driveway-a.jpg', cat: 'paving', alt: 'Herringbone paved driveway being laid between two houses', tall: true},
  {src: 'interior-bulkhead-b.jpg', cat: 'interiors', alt: 'Bright interior with new bulkhead ceilings and tiled floors', tall: true},
  {src: 'pool-new-rect.jpg', cat: 'pools', alt: 'New rectangular pool tiled in blue with a mosaic band', tall: true},
  {src: 'build-facade-c.jpg', cat: 'build', alt: 'Double-storey house in the plaster stage', tall: true},
  {src: 'interior-kitchen.jpg', cat: 'interiors', alt: 'New kitchen with wood-finish cabinets and a tiled floor', tall: true},
  {src: 'bath-white.jpg', cat: 'bathrooms', alt: 'New bathroom with white bath, basin and toilet and a decorative tile border', tall: true},
  {src: 'build-steel-structure.jpg', cat: 'build', alt: 'Large steel-framed structure being erected on site'},
  {src: 'paving-driveway-b.jpg', cat: 'paving', alt: 'Team laying grey and charcoal pavers on a driveway', tall: true},
  {src: 'bath-shower.jpg', cat: 'bathrooms', alt: 'Tiled shower with a rain shower head and a mosaic band', tall: true},
  {src: 'pool-before-green.jpg', cat: 'pools', alt: 'Pool before refurbishment, with green water', tall: true},
  {src: 'pool-after-blue.jpg', cat: 'pools', alt: 'The same pool after refurbishment, refinished in blue', tall: true},
  {src: 'build-brick-double.jpg', cat: 'build', alt: 'Face-brick double storey going up, with scaffolding', tall: true},
  {src: 'interior-bulkhead-a.jpg', cat: 'interiors', alt: 'Open-plan interior with polished floor tiles and bulkheads', tall: true},
  {src: 'tiling-floor-a.jpg', cat: 'bathrooms', alt: 'Large-format floor tiles being laid in a new room', tall: true},
  {src: 'pool-shell-curve.jpg', cat: 'pools', alt: 'Curved pool shell plastered and ready for finishing', tall: true},
  {src: 'build-facade-b.jpg', cat: 'build', alt: 'Plastered house front with a balcony above the entrance', tall: true},
  {src: 'bath-dark-tile.jpg', cat: 'bathrooms', alt: 'Bath set into a surround of charcoal wall tiles', tall: true},
  {src: 'paving-driveway-c.jpg', cat: 'paving', alt: 'Paved driveway almost complete along a boundary wall', tall: true},
  {src: 'interior-cabinets.jpg', cat: 'interiors', alt: 'Carpenter fitting white built-in cupboards', tall: true},
  {src: 'build-brickwork-b.jpg', cat: 'build', alt: 'Brickwork for a new room and chimney', tall: true},
  {src: 'pool-steps-a.jpg', cat: 'pools', alt: 'Builders shaping the steps of a new pool shell', tall: true},
  {src: 'bath-border.jpg', cat: 'bathrooms', alt: 'White wall tiles with a patterned border above a basin and toilet', tall: true},
  {src: 'tiling-wall-work.jpg', cat: 'bathrooms', alt: 'Tiler fitting large wall tiles in a bathroom', tall: true},
  {src: 'interior-bulkhead-c.jpg', cat: 'interiors', alt: 'Plastered ceiling bulkheads stepping down a passage'},
  {src: 'build-scaffold.jpg', cat: 'build', alt: 'Scaffolding up the side of a plastered double storey', tall: true},
  {src: 'pool-shell-rect.jpg', cat: 'pools', alt: 'Rectangular pool shell plastered in concrete', tall: true},
  {src: 'tiling-floor-c.jpg', cat: 'bathrooms', alt: 'Glossy white floor tiles in an empty room', tall: true},
  {src: 'build-foundation-mesh-b.jpg', cat: 'build', alt: 'Reinforcing mesh laid over plastic on a new foundation slab', tall: true},
  {src: 'exterior-painting.jpg', cat: 'build', alt: 'Painter on a ladder finishing a white exterior wall', tall: true},
  {src: 'tiling-kitchen-floor.jpg', cat: 'interiors', alt: 'Kitchen floor being tiled in large white tiles', tall: true},
  {src: 'build-plastering.jpg', cat: 'build', alt: 'Two plasterers on scaffolding plastering a new wall', tall: true},
  {src: 'bath-tiling-work.jpg', cat: 'bathrooms', alt: 'Tiler building the surround of a bath', tall: true},
  {src: 'build-brickwork-d.jpg', cat: 'build', alt: 'Bricklayers raising a chimney on scaffolding', tall: true},
  {src: 'build-team-site.jpg', cat: 'build', alt: 'The team at work on a building site'},
];

export const about = {
  lines: [{t: 'Fifteen years'}, {t: 'On site.', i: true}, {t: 'One team you'}, {t: 'Can trust', i: true}] as Line[],
  body: 'Fairvalue Renovations and Projects is a full-service general contractor, serving residential and commercial clients in South Africa.',
  story: [
    'Fairvalue Renovations and Projects (Pty) Ltd was founded by Mrs Shumirai Maumba and Mr Titos Otto Charwa, and registered as a private company in 2017.',
    'Mr Charwa brings more than fifteen years of experience in the construction field. That experience is why we can take a project from setting out and foundations right through to tiling, plumbing and the final coat of paint — without handing you from one contractor to the next.',
    'We work on homes and commercial properties: new builds, additions and renovations, swimming pools, paving and everything in between.',
  ],
  founders: [
    {name: 'Mrs Shumirai Maumba', role: 'Co-founder'},
    {name: 'Mr Titos Otto Charwa', role: 'Co-founder · 15+ years in construction'},
  ],
  values: [
    ['Fair value', 'Honest quotes and fair prices — the reason for our name.'],
    ['Quality work', 'Level floors, straight lines, finishes that last.'],
    ['One contractor', 'Eleven trades handled by one team and one point of contact.'],
  ] as [string, string][],
};

export const services_page = {
  lines: [{t: 'Eleven trades'}, {t: 'One', i: true}, {t: 'Contractor', i: true}] as Line[],
  body: 'Whatever the job — a new home, a bathroom, a pool or a driveway — we plan it, price it and build it ourselves.',
};

export const projects_page = {
  lines: [{t: 'Work we are'}, {t: 'Proud of', i: true}] as Line[],
  body: 'Real photos from our sites: houses going up, pools coming back to life, bathrooms, paving and finishes.',
};

export const contact_page = {
  lines: [{t: 'Let’s build'}, {t: 'Something', i: true}, {t: 'Together', i: true}] as Line[],
  body: 'Tell us about your project and we’ll get back to you with a quote. Call, WhatsApp or send the form below.',
};
