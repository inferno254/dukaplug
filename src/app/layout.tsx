import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import './globals.css';
import Providers from '@/components/Providers';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'DukaPlug | Food, Groceries & Shopping Delivery',
  description: 'Fast delivery of meals, groceries and essentials across Kenya. M-Pesa payments, live tracking.',
  keywords: ['DukaPlug', 'Kenya Delivery', 'Food Delivery', 'Grocery Delivery', 'M-Pesa'],
  openGraph: {
    title: 'DukaPlug - On-Demand Meals, Groceries & Shopping',
    description: 'Hot meals cooked fresh, farm-crisp greens, and household essentials delivered fast.',
    images: ['/dukaplug-logo-light.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable}`}>
      <head>
        <Script
          id="favicon-switcher"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getTheme() {
                  var html = document.documentElement;
                  if (html.classList.contains('dark')) return 'dark';
                  var stored = localStorage.getItem('theme');
                  if (stored === 'dark' || stored === 'light') return stored;
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                function setFavicon(theme) {
                  var href = theme === 'dark' ? '/dukaplug-dark-transparent.png' : '/dukaplug-logo-light.jpg';
                  var link = document.querySelector("link[rel~='icon']");
                  if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    document.head.appendChild(link);
                  }
                  link.href = href;
                }
                var theme = getTheme();
                setFavicon(theme);
                var observer = new MutationObserver(function() {
                  setFavicon(getTheme());
                });
                observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
                var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                mediaQuery.addEventListener('change', function() {
                  if (!localStorage.getItem('theme')) {
                    setFavicon(getTheme());
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}