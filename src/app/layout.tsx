import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
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
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  openGraph: {
    title: 'DukaPlug - On-Demand Meals, Groceries & Shopping',
    description: 'Hot meals cooked fresh, farm-crisp greens, and household essentials delivered fast.',
    images: ['/dukaplug-logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}