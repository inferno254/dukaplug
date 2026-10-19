'use client';

import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import TrackingContent from '@/components/pages/TrackingContent';

export default function TrackingPage() {
  const { go } = useAppContext();

  return (
    <main className="relative font-sans overflow-x-hidden">
      <TrackingContent go={go} />
    </main>
  );
}