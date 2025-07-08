'use client';

import React from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { Header } from '@/components/organisms/Header';
import { ThemeProvider } from '@/theme/ThemeContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <Header />
        <main>{children}</main>
      </CartProvider>
    </ThemeProvider>
  );
}