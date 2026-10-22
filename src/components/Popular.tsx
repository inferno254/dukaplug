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

// Map vendor IDs to specific restaurant images (Kenya-appropriate)
const vendorImages: Record<string, string> = {
  '11111111-1111-1111-1111-111111111111': 'https://images.unsplash.com/photo-1622051579890-c5a2e8e5e1b1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200', // Kenyan nyama choma place
  '22222222-2222-2222-2222-222222222222': 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200', // African market produce stall
  '33333333-3333-3333-3333-333333333333': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200', // Kenyan daily meals
  '44444444-4444-4444-4444-444444444444': 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200', // Duka Essentials - household shopping
};

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
              image: vendorImages[vendor.id] || 'https://images.unsplash.com/photo-1600891964092-4316c288032e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200',
              badge: vendor.rating >= 4.8 ? 'Top rated' : 'Popular',
            }}
            go={go}
          />
        ))}
      </div>
    </section>
  );
}