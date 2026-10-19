'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Deals() {
  const { t } = useLanguage();

  return (
    <section className="deals">
      <div>
        <span className="kicker dark-kicker">{t('home.deals.kicker')}</span>
        <h2>{t('home.deals.title')}</h2>
      </div>
      <div className="ticket">
        <span>{t('home.deals.off')}</span>
        <b>{t('home.deals.first')}</b>
        <small>Use code: <strong>DUKA20</strong></small>
      </div>
      <div className="ticket alt">
        <span>{t('home.deals.free')}</span>
        <b>{t('home.deals.lunch')}</b>
        <small>12–2pm · Selected spots</small>
      </div>
    </section>
  );
}