import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'BanCay - Bán Cây Online',
  description: 'Cửa hàng bán cây cảnh, cây ăn quả, cây xanh online',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <main className="container py-2">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
