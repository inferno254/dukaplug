'use client';

import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import ProfileContent from '@/components/pages/ProfileContent';
import Header from '@/components/layout/Header';

export default function ProfilePage() {
  const { go } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cream)]">
      <Header />
      <main className="flex-1 relative font-sans overflow-x-hidden">
        <ProfileContent go={go} />
      </main>
    </div>
  );
}