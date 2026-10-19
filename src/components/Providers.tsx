// src/components/Providers.tsx
"use client";

import { ThemeProvider } from '@/context/ThemeContext';
import { AppProvider } from '@/context/AppContext';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AppProvider>
        <CartProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </CartProvider>
      </AppProvider>
    </ThemeProvider>
  );
}