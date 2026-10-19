'use client';

import { useAppContext } from '@/context/AppContext';
import CheckoutContent from '@/components/pages/CheckoutContent';

export default function CheckoutPage() {
  const { go } = useAppContext();

  return (
    <main className="relative font-sans overflow-x-hidden">
      <CheckoutContent go={go} />
    </main>
  );
}