'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle() {
  const { language, switchLanguage, isRTL } = useLanguage();

  return (
    <button
      className="language-toggle"
      onClick={switchLanguage}
      aria-label={language === 'en' ? 'Switch to Kiswahili' : 'Switch to English'}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <span className="lang-text">
        {language === 'en' ? 'SW' : 'EN'}
      </span>
    </button>
  );
}