# CLAUDE.md — shrub-website

Static landing page for shrub.finance. Next.js 15 (`output: 'export'`), React 18, TypeScript, plain CSS.
Deployed by Cloudflare Pages from this repo (build `pnpm build`, output `out/`). pnpm only.

- Zero runtime third parties: no analytics, no external scripts/fonts/RPC. Adding one needs a necessity case
  and a `public/_headers` CSP change, verified in a browser.
- `scripts/release-gate.js` is wired into `pnpm build`; a new page or dependency means updating it in the same commit.
- Copy on the landing page is brand copy: port, do not rewrite, without an explicit ask.
- Supply chain: `minimumReleaseAge` quarantine in `pnpm-workspace.yaml`; install scripts denied. Do not lower or bypass.
- The maintainer commits and pushes. Do not run `git commit`/`git push` here.
- History: the previous Create React App site is tagged `cra-final`.
