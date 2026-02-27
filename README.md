# giannisCKS.github.io

Personal portfolio website of **Giannis Tsiamakis** — Software Developer & Engineer.

Live at: [giannisCKS.github.io](https://giannisCKS.github.io)

## Tech Stack

- **Next.js 16** (static export — `output: 'export'`)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Inter** (Google Fonts)

## Features

- 🎨 Modern dark design with violet/fuchsia/cyan gradient accents
- ⌨️ Typing animation in the hero section
- 🎞️ Scroll-triggered reveal animations (Intersection Observer)
- 📱 Fully responsive (mobile, tablet, desktop)
- 🧭 Sticky navbar with backdrop blur
- 🚀 Deployed to GitHub Pages via GitHub Actions

## Development

```bash
npm install
npm run dev        # start dev server
npm run build      # build static export to out/
npm run lint       # run ESLint
```

## Deployment

The site is deployed automatically to GitHub Pages on every push to `master` via the workflow at `.github/workflows/deploy.yml`.

It uses the official `actions/upload-pages-artifact` and `actions/deploy-pages` actions to publish the `out/` directory produced by `next build`.

## Project Structure

```
src/app/
  page.tsx      ← main portfolio page
  layout.tsx    ← root layout with font & metadata
  globals.css   ← global styles & animations
.github/
  workflows/
    deploy.yml  ← GitHub Actions deployment workflow
```

