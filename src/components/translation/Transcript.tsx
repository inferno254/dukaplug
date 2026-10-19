'use client';

import { useTranslation } from '@/context/LanguageContext';

interface Props {
  fallback: string;
  children: React.ReactNode;
} 

export default function Transcript({ fallback, children }: Props) {
  const { locale } = useTranslation();
  
  // Simple mapping - in real app would be more complex
  const dict = {
    'en': fallback,
    'sw': 'Translation not available yet'
  };
  
  return <>{dict[locale.code] || fallback}</>;
}