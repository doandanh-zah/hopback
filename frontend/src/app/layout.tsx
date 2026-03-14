import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '$hopback',
  description: 'Shopee affiliate workflow app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
