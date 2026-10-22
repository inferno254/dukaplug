'use client';

import { ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import LocationSheet from '@/components/LocationSheet';
import ItemSheet from '@/components/ItemSheet';
import AiAssistant from '@/components/AiAssistant';
import { useAppContext } from '@/context/AppContext';

export default function AppShell({ children }: { children: ReactNode }) {
  const {
    page,
    showLocation,
    sheet,
    location,
    closeLocation,
    chooseLocation,
    closeSheet,
    addItem,
  } = useAppContext();

  const showFooter = page !== 'tracking' && page !== 'checkout';

  return (
    <div className="app">
      {children}
      {showFooter && <Footer />}
      <BottomNav />
      <AiAssistant />
      {sheet && <ItemSheet close={closeSheet} add={addItem} />}
      {showLocation && (
        <LocationSheet
          current={location}
          close={closeLocation}
          select={chooseLocation}
        />
      )}
    </div>
  );
}