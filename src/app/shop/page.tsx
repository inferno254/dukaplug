'use client';

import ShopPageContent from '@/components/pages/ShopPageContent';
import { useAppContext } from '@/context/AppContext';
import AppShell from '@/components/layout/AppShell';

export default function ShopPage() {
  const { go } = useAppContext();

  return (
    <AppShell>
      <ShopPageContent go={go} />
    </AppShell>
  );
}
