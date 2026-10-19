'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, TranslationKeys } from '@/data/translations';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  t: <K extends keyof TranslationKeys>(key: K) => TranslationKeys[K];
  switchLanguage: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const isRTL = false;

  const t = <K extends keyof TranslationKeys>(key: K): TranslationKeys[K] => {
    return translations[language][key];
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