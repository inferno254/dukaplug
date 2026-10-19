'use client';

import { useLanguage } from '@/context/LanguageContext';

interface Props {
  fallback: string;
  children: React.ReactNode;
} 

export default function Transcript({ fallback }: Props) {
  const { t } = useLanguage();
  
  return <>{t('loading') || fallback}</>;
}