'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import RootShell from '@/components/layout/AppShell';
import Hero from '@/components/Hero';
import ServiceTiles from '@/components/ServiceTiles';
import Categories from '@/components/Categories';
import Popular from '@/components/Popular';
import Deals from '@/components/Deals';
import HowItWorks from '@/components/HowItWorks';
import PartnerBanners from '@/components/PartnerBanners';
import AppStrip from '@/components/AppStrip';
import { menuItems } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useAppContext } from '@/context/AppContext';
import { useCartContext } from '@/context/CartContext';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const { go, openCategory } = useAppContext();
  const { addItem } = useCartContext();

  return (
    <LanguageProvider>
      <RootShell>
        <main className="relative font-sans overflow-x-hidden">
          <Hero go={go} />
          <div className="search-float">
            <Icon name="search" />
            <input placeholder="What are you craving?" aria-label="What are you craving?" />
            <Button onClick={() => openCategory('food')}>Find now</Button>
          </div>
          <ServiceTiles openCategory={openCategory} />
          <Categories openCategory={openCategory} />
          <Popular go={go} />
          <Deals />
          <section className="section">
            <div className="section-head">
              <div>
                <span className="kicker">AGAIN? GOOD CHOICE.</span>
                <h2>Quick reorder.</h2>
              </div>
            </div>
            <div className="product-grid">
              {menuItems.slice(0, 3).map((item) => (
                <ProductCard key={item.name} item={item} onAdd={() => addItem(item)} />
              ))}
            </div>
          </section>
          <HowItWorks />
          <PartnerBanners go={go} />
          <AppStrip />
        </main>
      </RootShell>
    </LanguageProvider>
  );
}