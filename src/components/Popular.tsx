'use client';

import Icon from '@/components/ui/Icon';
import ShopCard from '@/components/ShopCard';
import { useLanguage } from '@/context/LanguageContext';
import { useAppContext } from '@/context/AppContext';

const shops = [
  { name: "Mama Njeri's Kitchen", type: "Kenyan · Local favourites", time: "15–25 min", fee: "Free delivery", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200", badge: "Top rated" },
  { name: "Fresh Basket Rongai", type: "Groceries · Fresh produce", time: "20–30 min", fee: "KES 49", image: "https://images.unsplash.com/photo-1768119901638-75c6edd64c0b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200", badge: "Open now" },
  { name: "The Daily Feast", type: "African · Grills · Bowls", time: "25–35 min", fee: "KES 69", image: "https://images.unsplash.com/photo-1738291422837-85761f82a10e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200", badge: "Popular" },
];

export default function Popular({ go }: { go: (p: string) => void }) {
  const { t } = useLanguage();

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
        {shops.map((shop) => (
          <ShopCard key={shop.name} shop={shop} go={go} />
        ))}
      </div>
    </section>
  );
}