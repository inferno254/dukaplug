'use client';

import { useAppContext } from '@/context/AppContext';
import CheckoutContent from '@/components/pages/CheckoutContent';
import Header from '@/components/layout/Header';

export default function CheckoutPage() {
  const { go } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cream)]">
      <Header />
      <main className="flex-1 relative font-sans overflow-x-hidden">
        <CheckoutContent go={go} />
      </main>
    </div>
  );
}