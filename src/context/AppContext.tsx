'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Page = 'home' | 'shop' | 'checkout' | 'tracking' | 'vendor' | 'profile';
type BrowseType = 'food' | 'groceries' | 'shopping';

interface DeliveryLocation {
  name: string;
  detail: string;
}

interface AppContextType {
  page: Page;
  browseType: BrowseType;
  setBrowseType: (type: BrowseType) => void;
  cartCount: number;
  setCartCount: (count: number) => void;
  location: DeliveryLocation;
  setLocation: (loc: DeliveryLocation) => void;
  showLocation: boolean;
  sheet: boolean;
  deliveryAreas: DeliveryLocation[];
  go: (page: Page | string) => void;
  openCategory: (type: BrowseType) => void;
  openItem: () => void;
  closeSheet: () => void;
  addItem: () => void;
  openLocation: () => void;
  closeLocation: () => void;
  chooseLocation: (loc: DeliveryLocation) => void;
  selectedDeliveryFee: number;
  deliveryZoneName: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const pageFromPath = (pathname: string): Page => {
  if (pathname.startsWith('/shop')) return 'shop';
  if (pathname.startsWith('/checkout')) return 'checkout';
  if (pathname.startsWith('/tracking')) return 'tracking';
  if (pathname.startsWith('/vendor')) return 'vendor';
  if (pathname.startsWith('/profile')) return 'profile';
  return 'home';
};

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const page = pageFromPath(pathname);

  const [browseType, setBrowseType] = useState<BrowseType>('food');
  const [cartCount, setCartCount] = useState<number>(2);
  const [location, setLocation] = useState<DeliveryLocation>({ name: 'HQ · Kitui', detail: 'DukaPlug HQ, Top Notch, Kitui' });
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const [sheet, setSheet] = useState<boolean>(false);

  const go = useCallback(
    (p: Page | string) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (typeof p === 'string') {
        router.push(p);
      } else if (p === 'home') {
        router.push('/');
      } else {
        router.push(`/${p}`);
      }
    },
    [router]
  );

  const openCategory = useCallback(
    (t: BrowseType) => {
      setBrowseType(t);
      go('shop');
    },
    [go]
  );

  const openItem = () => setSheet(true);
  const closeSheet = () => setSheet(false);
  const addItem = () => {
    setCartCount((c) => c + 1);
    setSheet(false);
  };
  const openLocation = () => setShowLocation(true);
  const closeLocation = () => setShowLocation(false);
  const chooseLocation = (loc: DeliveryLocation) => {
    setLocation(loc);
    setShowLocation(false);
  };

  const selectedDeliveryFee = 0;
  const deliveryZoneName = location.name;

  return (
    <AppContext.Provider
      value={{
        page,
        browseType,
        setBrowseType,
        cartCount,
        setCartCount,
        location,
        setLocation,
        showLocation,
        sheet,
        deliveryAreas: [
          { name: 'HQ · Kitui', detail: 'DukaPlug HQ, Top Notch, Kitui' },
          { name: 'Kitui Town', detail: 'Central Business District, Kitui' },
          { name: 'Mwingi', detail: 'Mwingi Central, Kitui County' },
          { name: 'Mutomo', detail: 'Mutomo Market, Kitui County' },
          { name: 'Kibwezi', detail: 'Kibwezi Town, Makueni' },
          { name: 'Mombasa Road', detail: 'Athi River, Machakos' },
        ],
        go,
        openCategory,
        openItem,
        closeSheet,
        addItem,
        openLocation,
        closeLocation,
        chooseLocation,
        selectedDeliveryFee,
        deliveryZoneName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}