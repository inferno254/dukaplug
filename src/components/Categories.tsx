'use client';

import { useState } from 'react';
import { categoryGroups, categoryImages } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { useAppContext } from '@/context/AppContext';
import Icon from '@/components/ui/Icon';

export default function Categories({ openCategory }: { openCategory: (type: 'food' | 'groceries' | 'shopping') => void }) {
  const { t } = useLanguage();
  const [active, setActive] = useState<keyof typeof categoryGroups>("groceries");
  const labels = { food: "Food", groceries: "Fresh groceries", shopping: "Everyday shopping" };

  return (
    <section className="section category-section">
      <div className="section-head category-heading">
        <div>
          <span className="kicker">{t('home.categories.kicker')}</span>
          <h2>{t('home.categories.title')}</h2>
        </div>
        <p>{t('home.categories.copy')}</p>
      </div>
      <div className="category-tabs">
        {(Object.keys(categoryGroups) as (keyof typeof categoryGroups)[]).map((key) => (
          <button key={key} className={active === key ? "active" : ""} onClick={() => setActive(key)}>
            {labels[key]}
            <small>{categoryGroups[key].length} categories</small>
          </button>
        ))}
      </div>
      <div className="category-scroll">
        {categoryGroups[active].map(([label, type, price]) => (
          <button key={label} className="category-chip" onClick={() => openCategory(active)} aria-label={`Shop ${label}`}>
            <span className="category-photo">
              <img src={categoryImages[type as keyof typeof categoryImages] || '/placeholder.jpg'} alt="" />
            </span>
            <span>{label}</span>
            <small>{price}</small>
            <span className="category-arrow"><Icon name="arrow" size={14} /></span>
          </button>
        ))}
      </div>
      <p className="price-note">{t('home.categories.note')}</p>
    </section>
  );
}