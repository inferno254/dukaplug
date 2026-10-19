'use client';

import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import ProfileContent from '@/components/pages/ProfileContent';

export default function ProfilePage() {
  const { go } = useAppContext();

  return (
    <main className="relative font-sans overflow-x-hidden">
      <ProfileContent go={go} />
    </main>
  );
}