'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

interface LogoProps {
  compact?: boolean;
}

export default function Logo({ compact = false }: LogoProps) {
  return (
    <div className={`logo ${compact ? "logo-compact" : ""}`} aria-label="DukaPlug home">
      <img src="/dukaplug-logo.jpg" alt="DukaPlug" />
    </div>
  );
}