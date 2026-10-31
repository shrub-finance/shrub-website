# shrub.finance

Marketing landing page for Shrub Finance. Next.js static export, served by Cloudflare Pages.
Zero runtime third parties: fonts are vendored, no analytics, no external scripts.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # release gate -> next build -> release gate (out/)
```

`scripts/release-gate.js` runs inside `pnpm build` and fails the build on any new route,
third-party host in the CSP, unused dependency, or analytics/vendor reference in the bundle.
Headers and redirects ship from `public/_headers` and `public/_redirects`.

The pre-2026 Create React App site is preserved at git tag `cra-final`.
