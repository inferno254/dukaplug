// src/components/ui/Logo.tsx
'use client';

import { useTheme } from '@/context/ThemeContext';

interface LogoProps {
  compact?: boolean;
}

export default function Logo({ compact = false }: LogoProps) {
  const { theme } = useTheme();
  const src = theme === 'dark' ? '/dukaplug-logo.jpg' : '/dukaplug-logo-light.jpg';
  return (
    <div className={`logo ${compact ? 'logo-compact' : ''}`} aria-label="DukaPlug home">
      <img src={src} alt="DukaPlug" style={{ mixBlendMode: theme === 'dark' ? 'normal' : 'multiply' }} />
    </div>
  );
}