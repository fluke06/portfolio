import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Noto_Sans_Tagalog } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const notoTagalog = Noto_Sans_Tagalog({
  subsets: ['tagalog'],
  weight: ['400'],
  variable: '--font-baybayin',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Christian Dizon | Full-Stack Developer',
  description: 'Full-stack developer with 8 years shipping web apps end-to-end, from architecture to AWS infrastructure.',
  authors: [{ name: 'Christian Dizon' }],
  openGraph: {
    siteName: 'Christian Dizon',
    locale: 'en_PH',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${notoTagalog.variable}`}>
      <body style={{ background: 'var(--color-bg)', overflowX: 'clip' }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:text-white focus:text-sm focus:font-inter"
          style={{ background: 'var(--color-accent)' }}
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
