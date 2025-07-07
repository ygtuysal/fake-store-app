'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/styles/global';
import { theme } from '@/styles/theme';
import { CartProvider } from '@/contexts/CartContext';
import { Header } from '@/components/organisms/Header';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CartProvider>
        <Header />
        <main>{children}</main>
      </CartProvider>
    </ThemeProvider>
  );
}