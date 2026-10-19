'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppContext } from '@/context/AppContext';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import FoodGlyph from '@/components/FoodGlyph';
import Logo from '@/components/ui/Logo';

export default function Hero({ go }: { go: (p: string) => void }) {
  const [slide, setSlide] = useState(0);
  const { t } = useLanguage();
  const hero = t('hero');

  const slides = [
    { mode: "bag", eyebrow: hero.bag.eyebrow, title: hero.bag.title, copy: hero.bag.copy, cta: hero.bag.cta },
    { mode: "burst", eyebrow: hero.burst.eyebrow, title: hero.burst.title, copy: hero.burst.copy, cta: hero.burst.cta },
    { mode: "phone", eyebrow: hero.phone.eyebrow, title: hero.phone.title, copy: hero.phone.copy, cta: hero.phone.cta },
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
        <h1>{current.title}</h1>
        <p>{current.copy}</p>
        <div className="hero-actions">
          <Button variant="yellow" onClick={() => go('/shop')} icon="arrow">
            {current.cta}
          </Button>
          <span className="hero-note"><b>4.9</b><Icon name="star" size={16} /> {hero.loved}</span>
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
        <div className="float-item item-burger"><FoodGlyph type="burger" /></div>
        <div className="float-item item-tomato"><FoodGlyph type="tomato" /></div>
        <div className="float-item item-drink"><FoodGlyph type="bottle" /></div>
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
        <div className="hero-sticker">{hero.sticker}</div>
      </div>
    </section>
  );
}