// src/components/Hero.tsx
'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppContext } from '@/context/AppContext';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Logo from '@/components/ui/Logo';

export default function Hero({ go }: { go: (p: string) => void }) {
  const [slide, setSlide] = useState(0);
  const { t } = useLanguage();

  const slides = [
    { mode: "bag", eyebrow: t('hero.bag.eyebrow'), title: t('hero.bag.title'), copy: t('hero.bag.copy'), cta: t('hero.bag.cta') },
    { mode: "burst", eyebrow: t('hero.burst.eyebrow'), title: t('hero.burst.title'), copy: t('hero.burst.copy'), cta: t('hero.burst.cta') },
    { mode: "phone", eyebrow: t('hero.phone.eyebrow'), title: t('hero.phone.title'), copy: t('hero.phone.copy'), cta: t('hero.phone.cta') },
  ];

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % slides.length), 5500);
    return () => window.clearInterval(id);
  }, []);

  const current = slides[slide];

  return (
    <section className={`hero hero-${current.mode}`}>
      <div className="hero-copy">
        <span className="eyebrow">{current.eyebrow}</span>
        <h1 dangerouslySetInnerHTML={{ __html: current.title }} />
        <p>{current.copy}</p>
        <div className="hero-actions">
          <Button variant="yellow" onClick={() => go('/shop')} icon="arrow">
            {current.cta}
          </Button>
          <span className="hero-note"><b>4.9</b><Icon name="star" size={16} /> {t('hero.loved')}</span>
        </div>
        <div className="slide-dots">
          {slides.map((_, i) => (
            <button key={i} className={slide === i ? "active" : ""} onClick={() => setSlide(i)} aria-label={`Show slide ${i + 1}`} />
          ))}
        </div>
      </div>
      <div className="hero-visual">
        <span className="doodle d1">✦</span><span className="doodle d2">~</span>
        <div className="price-tag t1">KES 180</div><div className="price-tag t2">KES 95</div>
        <div className="float-item item-burger">
          <img 
            src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=400" 
            alt="Food" 
            className="float-photo"
          />
        </div>
        <div className="float-item item-tomato">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=400" 
            alt="Groceries" 
            className="float-photo"
          />
        </div>
        <div className="float-item item-drink">
          <img 
            src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=400" 
            alt="Shopping" 
            className="float-photo"
          />
        </div>
        <div className="delivery-bag">
          <div className="bag-handle" />
          <Logo compact />
          <strong>delivered.</strong>
        </div>
        <div className="phone-card">
          <span className="phone-notch" />
          <Logo />
          <div className="mini-check"><Icon name="check" size={30} /></div>
          <b>Order confirmed!</b>
          <small>Your plug is on the way.</small>
        </div>
        <div className="hero-sticker">{t('hero.sticker')}</div>
      </div>
    </section>
  );
}