import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rui Sousa - iOS & React Native Developer',
  description: 'iOS and React Native developer. 11 apps shipped. Available for consulting and freelance work.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
