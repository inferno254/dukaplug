'use client';

import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import TrackingContent from '@/components/pages/TrackingContent';
import Header from '@/components/layout/Header';

export default function TrackingPage() {
  const { go } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--mint)]">
      <Header />
      <main className="flex-1 relative font-sans overflow-x-hidden">
        <TrackingContent go={go} />
      </main>
    </div>
  );
}