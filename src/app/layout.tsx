import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Fonts are vendored and self-hosted (next/font/local): the page never calls Google Fonts.
const inter = localFont({
  src: '../fonts/inter-latin-400.woff2',
  weight: '400',
  display: 'swap',
  variable: '--font-inter',
});
const plexMono = localFont({
  src: [
    { path: '../fonts/ibm-plex-mono-latin-400.woff2', weight: '400' },
    { path: '../fonts/ibm-plex-mono-latin-500.woff2', weight: '500' },
    { path: '../fonts/ibm-plex-mono-latin-600.woff2', weight: '600' },
  ],
  display: 'swap',
  variable: '--font-plex-mono',
});

const TITLE = 'Shrub - Making Lending Accessible';

export const metadata: Metadata = {
  metadataBase: new URL('https://shrub.finance'),
  title: TITLE,
  description: TITLE,
  applicationName: 'Shrub',
  appleWebApp: { title: 'Shrub' },
  alternates: { canonical: '/' },
  manifest: '/manifest.json?v=3',
  icons: {
    icon: [
      { url: '/favicon.ico?v=3' },
      { url: '/favicon-32x32.png?v=3', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=3', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=3', sizes: '180x180' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' }],
  },
  openGraph: {
    type: 'website',
    url: 'https://shrub.finance/',
    siteName: 'Shrub Finance',
    title: TITLE,
    description: TITLE,
    images: ['/social-card.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shrubfinance',
    title: TITLE,
    description: TITLE,
    images: ['/social-card.png'],
  },
  other: { 'msapplication-TileColor': '#da532c' },
};

export const viewport: Viewport = {
  themeColor: '#090d0b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
