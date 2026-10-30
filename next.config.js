/** @type {import('next').NextConfig} */
module.exports = {
  // Static export: plain files on Cloudflare Pages, no server. Headers live in public/_headers.
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};
