// src/components/Providers.tsx
"use client";

import { ThemeProvider } from '@/context/ThemeContext';
import { AppProvider } from '@/context/AppContext';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </AppProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}