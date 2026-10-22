'use client';

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function FaviconSwitcher() {
  const { theme } = useTheme();

  useEffect(() => {
    const href = theme === 'dark' ? '/dukaplug-dark-transparent.png' : '/dukaplug-logo-light.jpg';
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = href;
  }, [theme]);

  return null;
}