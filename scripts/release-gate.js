#!/usr/bin/env node
/**
 * Release gate for shrub.finance. Wired into `pnpm build` (pre + post) so a miss fails the build.
 *
 *   node scripts/release-gate.js pre    # source-level checks, before `next build`
 *   node scripts/release-gate.js post   # checks on the static export in out/, after `next build`
 *
 * Ported from the app's gate (2026-10-30). This site is simpler and the bar is stricter: a landing
 * page needs NO third party at runtime, so any external host in the CSP or the bundle is a failure.
 * Plain Node, no dependencies, cross-platform.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'out');

/** Every public route, on purpose. Adding a page means adding it here, in the same commit. */
const ALLOWED_ROUTES = ['/'];
/** Files Cloudflare Pages must receive with the export. */
const MUST_SHIP = ['_headers', '_redirects', 'robots.txt', 'sitemap.xml', 'favicon.ico', 'social-card.png'];
/** Anything matching these must never appear in shipped JS/HTML. */
const BUNDLE_FORBIDDEN = [
  [/fonts\.googleapis\.com|fonts\.gstatic\.com/, 'runtime Google Fonts request (fonts are vendored under src/fonts)'],
  [/googletagmanager|google-analytics\.com|clarity\.ms|plausible\.io|posthog\.com|react-ga|gtag\(/, 'analytics in the bundle'],
  [/<script[^>]+src="https?:\/\//, 'external <script src> in exported HTML'],
  [/mainnet\.base\.org|infura\.io|alchemy\.com/, 'RPC host in the bundle (the landing page makes no chain calls)'],
];

const failures = [];
const fail = (msg) => failures.push(msg);
const walk = (dir, out = []) => { for (const n of fs.readdirSync(dir)) { const p = path.join(dir, n); if (fs.statSync(p).isDirectory()) walk(p, out); else out.push(p); } return out; };
const read = (p) => fs.readFileSync(p, 'utf8');

function routesFromSource() {
  return walk(path.join(SRC, 'app')).filter((p) => /[\\/]page\.tsx$/.test(p))
    .map((p) => path.dirname(path.relative(path.join(SRC, 'app'), p)).split(path.sep).join('/'))
    .map((r) => (r === '.' ? '/' : '/' + r)).sort();
}
function routesFromExport() {
  return walk(OUT).filter((p) => p.endsWith('.html') && !p.includes(`${path.sep}_next${path.sep}`))
    .map((p) => path.relative(OUT, p).split(path.sep).join('/').replace(/\.html$/, ''))
    .filter((r) => r !== '404').map((r) => (r === 'index' ? '/' : '/' + r)).sort();
}
function checkRoutes(routes, where) {
  for (const r of routes) if (!ALLOWED_ROUTES.includes(r)) fail(`${where}: route ${r} is not in ALLOWED_ROUTES (scripts/release-gate.js). Public page? Add it deliberately. Dev page? Delete it.`);
}
function checkHeaders(file) {
  if (!fs.existsSync(file)) return fail(`${file} missing`);
  const h = read(file);
  const csp = (h.match(/Content-Security-Policy:\s*([^\n]+)/) || [])[1];
  if (!csp) return fail('_headers: no Content-Security-Policy');
  const hosts = csp.match(/(https?|wss?):\/\/[^\s;]+|(?:^|\s)(https|http|wss|ws):(?=\s|;|$)/g) || [];
  if (hosts.length) fail(`_headers: CSP names external hosts or bare schemes: ${hosts.map((s) => s.trim()).join(' ')}. This site has no third party.`);
  for (const k of ["'unsafe-eval'", "'wasm-unsafe-eval'"]) if (csp.includes(k)) fail(`_headers: CSP contains ${k}`);
  for (const must of ["frame-ancestors 'none'", "object-src 'none'", "base-uri 'self'"]) if (!csp.includes(must)) fail(`_headers: CSP is missing "${must}"`);
}
function checkDeps() {
  const pkg = JSON.parse(read(path.join(ROOT, 'package.json')));
  const srcText = walk(SRC).filter((p) => /\.(ts|tsx|css)$/.test(p)).map(read).join('\n');
  for (const dep of Object.keys(pkg.dependencies || {})) {
    if (dep === 'react' || dep === 'react-dom') continue; // framework runtime, always used
    if (dep === 'next') continue; // consumed by next.config.js and the app router
    const re = new RegExp(`(from\\s+|require\\(\\s*|import\\(\\s*)['"]${dep.replace(/[/@.-]/g, '\\$&')}(/|['"])`);
    if (!re.test(srcText)) fail(`package.json: dependency "${dep}" is never imported from src/. Remove it; every shipped package is supply-chain surface.`);
  }
}
function checkSourceFetches() {
  for (const f of walk(SRC).filter((p) => /\.(ts|tsx)$/.test(p))) {
    const t = read(f);
    if (/\bfetch\(|XMLHttpRequest|navigator\.sendBeacon/.test(t)) fail(`${path.relative(ROOT, f)}: network call in a page that must make none (connect-src is 'self' only)`);
  }
}
function checkBundle() {
  if (!fs.existsSync(OUT)) return fail('out/ missing: run after `next build`');
  for (const f of walk(OUT).filter((p) => /\.(js|html|txt|json|css)$/.test(p))) {
    const t = read(f);
    for (const [re, why] of BUNDLE_FORBIDDEN) { const m = t.match(re); if (m) fail(`${path.relative(ROOT, f)}: ${why} (${m[0].slice(0, 60)})`); }
  }
  for (const must of MUST_SHIP) if (!fs.existsSync(path.join(OUT, must))) fail(`out/${must} missing: public/${must} did not ship`);
}

const mode = process.argv[2];
if (mode === 'pre') {
  checkRoutes(routesFromSource(), 'src/app');
  checkHeaders(path.join(ROOT, 'public', '_headers'));
  checkDeps();
  checkSourceFetches();
} else if (mode === 'post') {
  checkRoutes(routesFromExport(), 'out/');
  checkHeaders(path.join(OUT, '_headers'));
  checkBundle();
} else {
  console.error('usage: release-gate.js pre|post'); process.exit(2);
}
if (failures.length) { console.error(`\nRELEASE GATE (${mode}) FAILED:\n` + failures.map((f) => '  ✗ ' + f).join('\n') + '\n'); process.exit(1); }
console.log(`release gate (${mode}): ok`);
