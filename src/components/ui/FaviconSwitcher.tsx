'use client';

import { useEffect } from 'react';

function getTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const html = document.documentElement;
  if (html.classList.contains('dark')) return 'dark';
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setFavicon(theme: 'light' | 'dark') {
  const href = theme === 'dark' ? '/dukaplug-dark-transparent.png' : '/dukaplug-logo-light.jpg';
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = href;
}

export default function FaviconSwitcher() {
  useEffect(() => {
    const theme = getTheme();
    setFavicon(theme);

    const observer = new MutationObserver(() => {
      setFavicon(getTheme());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!localStorage.getItem('theme')) {
        setFavicon(getTheme());
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return null;
}