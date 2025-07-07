import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/styled-components-registry';
import { Providers } from '@/components/providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fake Store - Modern E-commerce',
  description: 'A modern e-commerce application built with Next.js, TypeScript, and Styled Components',
  keywords: 'e-commerce, shopping, online store, fake store',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Fake Store - Modern E-commerce',
    description: 'A modern e-commerce application built with Next.js',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}