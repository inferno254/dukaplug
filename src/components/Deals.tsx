'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Deals() {
  const { t } = useLanguage();
  const deals = t('home').deals;

  return (
    <section className="deals">
      <div>
        <span className="kicker dark-kicker">{deals.kicker}</span>
        <h2>{deals.title}</h2>
      </div>
      <div className="ticket">
        <span>{deals.off}</span>
        <b>{deals.first}</b>
        <small>Use code: <strong>DUKA20</strong></small>
      </div>
      <div className="ticket alt">
        <span>{deals.free}</span>
        <b>{deals.lunch}</b>
        <small>12–2pm · Selected spots</small>
      </div>
    </section>
  );
}