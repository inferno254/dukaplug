'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAppContext } from '@/context/AppContext';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

export default function PartnerBanners({ go }: { go: (p: string) => void }) {
  const { t } = useLanguage();
  const partner = t('home').partner;

  return (
    <section className="section partner-grid">
      <div className="partner vendor-banner">
        <span className="kicker dark-kicker">{partner.vendor.kicker}</span>
        <h2>{partner.vendor.title}</h2>
        <p>{partner.vendor.copy}</p>
        <Button variant="yellow" onClick={() => go('/vendor')} icon="arrow">
          {partner.vendor.cta}
        </Button>
        <div className="dashboard-mini">
          <b>{partner.vendor.sales}</b>
          <strong>KES 24,850</strong>
          <span>+18.2% this week</span>
        </div>
      </div>
      <div className="partner rider-banner">
        <span className="kicker">{partner.rider.kicker}</span>
        <h2>{partner.rider.title}</h2>
        <p>{partner.rider.copy}</p>
        <Button variant="ink" icon="arrow">{partner.rider.cta}</Button>
        <div className="helmet"><Icon name="bike" size={64} /></div>
      </div>
    </section>
  );
}