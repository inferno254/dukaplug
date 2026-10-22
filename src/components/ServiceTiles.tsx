'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAppContext } from '@/context/AppContext';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

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
          <div className="service-art">
            <img 
              src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=800" 
              alt="Food delivery" 
              className="service-photo"
            />
          </div>
          <h3>{t('home.services.food.title')}</h3>
          <p>{t('home.services.food.copy')}</p>
          <span className="circle-arrow"><Icon name="arrow" /></span>
        </button>
        <button className="service-card grocery-card" onClick={() => openCategory("groceries")}>
          <span className="service-no">02</span>
          <div className="service-art">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=800" 
              alt="Fresh groceries" 
              className="service-photo"
            />
          </div>
          <h3>{t('home.services.groceries.title')}</h3>
          <p>{t('home.services.groceries.copy')}</p>
          <span className="circle-arrow"><Icon name="arrow" /></span>
        </button>
        <button className="service-card shopping-card" onClick={() => openCategory("shopping")}>
          <span className="service-no">03</span>
          <div className="service-art">
            <img 
              src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=800" 
              alt="Shopping essentials" 
              className="service-photo"
            />
          </div>
          <h3>{t('home.services.shopping.title')}</h3>
          <p>{t('home.services.shopping.copy')}</p>
          <span className="circle-arrow"><Icon name="arrow" /></span>
        </button>
      </div>
    </section>
  );
}