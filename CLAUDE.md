# CLAUDE.md — shrub-website

## Project Overview

Shrub Finance marketing and landing page. Static website for the Shrub ecosystem (DeFi lending protocol). Includes waitlist signup, team info, roadmap, and product sections.

## Tech Stack

- **React** 16.13.1 (class-like functional components, no hooks beyond useRef/useEffect/useState)
- **React Router** v5 (`react-router-dom` 5.1.2) — `Switch`/`Route` based routing
- **SCSS** (Sass 1.56) — Cruip framework-based theme system
- **Create React App** (react-scripts 5)
- **Yarn** as package manager
- **Axios** for HTTP requests
- **react-device-detect** for responsive layout branching (`isMobile`, `isDesktop`, `isMobileOnly`)
- **react-ga** for Google Analytics
- **classnames** for conditional CSS classes

## Commands

```bash
yarn install      # Install dependencies
yarn start        # Dev server (localhost:3000)
yarn build        # Production build
yarn test         # Run tests
```

## Directory Structure

```
src/
├── App.js                    # Router + Google Analytics setup
├── index.js                  # Entry point, renders <Router> with browser history
├── assets/
│   ├── images/               # Static images
│   ├── json/                 # JSON data files
│   └── scss/                 # SCSS framework (see SCSS Architecture below)
├── components/
│   ├── elements/             # Reusable UI primitives (Button, Input, Modal, Image, etc.)
│   ├── layout/               # Header, Footer, and layout partials
│   └── sections/             # Page sections (Hero, Team, Subscribe, Status, etc.)
├── layouts/                  # Page layout wrappers (Default, DefaultFull, DefaultSlim)
├── utils/
│   ├── AppRoute.js           # Route wrapper that injects layout around page component
│   ├── ScrollReveal.js       # Scroll-triggered reveal animations
│   └── SectionProps.js       # Shared PropTypes for section components (dividers, bg, invert)
└── views/                    # Page-level view components (Home, Main)

public/                       # Static assets, favicons, sitemap, robots.txt
vercel.json                   # Vercel deployment config (redirects + OpenSSL legacy flag)
```

## Routing

Routes are defined in `App.js` using the `AppRoute` utility which wraps each route with a layout component:

| Path              | Component | Layout            |
|-------------------|-----------|-------------------|
| `/`               | Main      | LayoutDefault     |
| `/waitlist`       | Main      | LayoutDefault     |
| `/main`           | Home      | LayoutDefaultFull |
| `/status`         | Status    | LayoutDefault     |
| `/roadmap`        | Main      | LayoutDefaultSlim |
| `/airdrop`        | Main      | LayoutDefaultSlim |
| `/paper-gardens`  | Main      | LayoutDefaultSlim |
| `/about`          | Main      | LayoutDefaultSlim |

External redirects are handled in `vercel.json` (`/paper-gardens` -> gardens.shrub.finance, `/roadmap` -> Medium article).

## SCSS Architecture

Based on the Cruip framework. Three-layer system imported via `src/assets/scss/style.scss`:

1. **`core/`** — Base styles, normalize, layout primitives, section patterns
2. **`settings/`** — Variables and configuration overrides
3. **`theme/`** — Theme-specific customizations layered on top

Each layer mirrors the same structure: `base/`, `elements/`, `layout/`, `patterns/`, `sections/`.

Uses `include-media` mixin library for responsive breakpoints.

## Key Patterns

### AppRoute
Wraps React Router `<Route>` to inject a layout component around the page component. Defined in `src/utils/AppRoute.js`.

### SectionProps
Shared PropTypes and defaults for section components. Three variants:
- `SectionProps` — base (dividers, bg color, invert)
- `SectionSplitProps` — adds `invertMobile`, `invertDesktop`, `alignTop`, `imageFill`
- `SectionTilesProps` — adds `pushLeft`

### ScrollReveal
Scroll-triggered animation utility. Initialized via ref in `App.js`, calls `childRef.current.init()` on route change.

### Responsive Detection
Uses `react-device-detect` (`isMobile`, `isDesktop`, `isMobileOnly`, `isTablet`) for conditional rendering — not CSS media queries — to show/hide content by device type.

## API Integration

- **Waitlist signup**: `POST https://submissions.shrub.finance/lend-waitlist` with `{ email }` payload (in `Hero.js`)

## Deployment

Deployed on **Vercel**. Build requires the OpenSSL legacy provider flag (configured in `vercel.json`):

```json
{ "build": { "env": { "NODE_OPTIONS": "--openssl-legacy-provider" } } }
```

## Environment Variables

- `REACT_APP_GA_CODE` — Google Analytics tracking ID (optional; falls back to test mode)
