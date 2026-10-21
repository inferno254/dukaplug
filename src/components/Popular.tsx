'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/Icon';
import ShopCard from '@/components/ShopCard';
import { useLanguage } from '@/context/LanguageContext';

interface Vendor {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  location: string | null;
  is_verified: boolean;
  rating: number;
  created_at: string;
}

export default function Popular({ go }: { go: (p: string) => void }) {
  const { t } = useLanguage();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/vendors')
      .then((r) => r.json())
      .then((data) => {
        setVendors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="section-head">
          <div>
            <span className="kicker">{t('home.popular.kicker')}</span>
            <h2>{t('home.popular.title')}</h2>
          </div>
        </div>
        <div className="shop-grid">
          <p>Loading vendors...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <span className="kicker">{t('home.popular.kicker')}</span>
          <h2>{t('home.popular.title')}</h2>
        </div>
        <button className="text-link" onClick={() => go('/shop')}>
          {t('home.popular.seeAll')} <Icon name="arrow" />
        </button>
      </div>
      <div className="shop-grid">
        {vendors.map((vendor) => (
          <ShopCard
            key={vendor.id}
            shop={{
              name: vendor.name,
              type: vendor.location || 'Local',
              time: '15–25 min',
              fee: 'Free delivery',
              image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200',
              badge: vendor.rating >= 4.8 ? 'Top rated' : 'Popular',
            }}
            go={go}
          />
        ))}
      </div>
    </section>
  );
}