'use client';

import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import VendorContent from '@/components/pages/VendorContent';
import Header from '@/components/layout/Header';

export default function VendorPage() {
  const { go } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cream)]">
      <Header />
      <main className="flex-1 relative font-sans overflow-x-hidden">
        <VendorContent go={go} />
      </main>
    </div>
  );
}