# Fairvalue Renovations & Projects — website demo

Five-page site (Home, Services, Projects, About us, Get a quote) built with
Vite, React, TypeScript, Tailwind CSS v4 and Lenis.

- All copy, contact details and photo lists: `src/content.ts`
- Photos: `public/media/` (`hero-*.jpg` are free Unsplash photos; the rest are Fairvalue's own)

```
npm install
npm run dev      # local preview
npm run build    # production files in dist/
```

Every push to `main` is published to GitHub Pages by `.github/workflows/deploy.yml`.
