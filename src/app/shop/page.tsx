'use client';

import ShopPageContent from '@/components/pages/ShopPageContent';
import { useAppContext } from '@/context/AppContext';

export default function ShopPage() {
  const { go } = useAppContext();

  return (
    <ShopPageContent go={go} />
  );
}