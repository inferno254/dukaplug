'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/data/translations';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  switchLanguage: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return '';
    }
  }
  return typeof current === 'string' ? current : '';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const isRTL = false;

  const t = (key: string): string => {
    if (!key.includes('.')) {
      const value = translations[language][key as keyof typeof translations.en];
      return typeof value === 'string' ? value : '';
    }
    return getNestedValue(translations[language] as Record<string, unknown>, key);
  };

  const switchLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'sw' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, t, switchLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}