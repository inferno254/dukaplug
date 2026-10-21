'use client';

import { useEffect } from 'react';
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
import ProductCard from '@/components/ProductCard';
import { useAppContext } from '@/context/AppContext';
import { useCartContext } from '@/context/CartContext';
import { useProducts } from '@/hooks/useProducts';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const { go, openCategory } = useAppContext();
  const { addItem } = useCartContext();
  const { products } = useProducts();

  const foodProducts = products.filter((p) => p.category === 'food');
  const quickReorder = foodProducts.slice(0, 3);

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
              {quickReorder.map((item) => (
                <ProductCard
                  key={item.id}
                  item={{
                    id: item.id,
                    name: item.name,
                    desc: item.description || '',
                    price: item.price,
                    image: item.image_url || 'https://images.unsplash.com/photo-1726177974666-88e937fa8e59?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200',
                  }}
                  onAdd={() => addItem(item)}
                />
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