'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAppContext } from '@/context/AppContext';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import FoodGlyph from '@/components/FoodGlyph';
import ProduceArt from '@/components/ProduceArt';
import PantryArt from '@/components/PantryArt';

export default function ServiceTiles({ openCategory }: { openCategory: (type: 'food' | 'groceries' | 'shopping') => void }) {
  const { t } = useLanguage();

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <span className="kicker">{t('home.pick')}</span>
          <h2>Pick your plug.</h2>
        </div>
        <p>Three ways to make today easier.</p>
      </div>
      <div className="service-grid">
        <button className="service-card food-card" onClick={() => openCategory("food")}>
          <span className="service-no">01</span>
          <div className="service-art"><FoodGlyph type="burger" /></div>
          <h3>{t('home.services.food.title')}</h3>
          <p>{t('home.services.food.copy')}</p>
          <span className="circle-arrow"><Icon name="arrow" /></span>
        </button>
        <button className="service-card grocery-card" onClick={() => openCategory("groceries")}>
          <span className="service-no">02</span>
          <div className="service-art"><ProduceArt /></div>
          <h3>{t('home.services.groceries.title')}</h3>
          <p>{t('home.services.groceries.copy')}</p>
          <span className="circle-arrow"><Icon name="arrow" /></span>
        </button>
        <button className="service-card shopping-card" onClick={() => openCategory("shopping")}>
          <span className="service-no">03</span>
          <div className="service-art"><PantryArt /></div>
          <h3>{t('home.services.shopping.title')}</h3>
          <p>{t('home.services.shopping.copy')}</p>
          <span className="circle-arrow"><Icon name="arrow" /></span>
        </button>
      </div>
    </section>
  );
}