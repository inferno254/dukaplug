'use client';

import ShopPageContent from '@/components/pages/ShopPageContent';
import { useAppContext } from '@/context/AppContext';
import { useCartContext } from '@/context/CartContext';

export default function ShopPage() {
  const { go } = useAppContext();
  const { cartCount } = useCartContext();

  return (
    <ShopPageContent go={go} cartCount={cartCount} />
  );
}