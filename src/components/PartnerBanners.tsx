'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAppContext } from '@/context/AppContext';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

export default function PartnerBanners({ go }: { go: (p: string) => void }) {
  const { t } = useLanguage();

  return (
    <section className="section partner-grid">
      <div className="partner vendor-banner">
        <span className="kicker dark-kicker">{t('home.partner.vendor.kicker')}</span>
        <h2>{t('home.partner.vendor.title')}</h2>
        <p>{t('home.partner.vendor.copy')}</p>
        <Button variant="yellow" onClick={() => go('/vendor')} icon="arrow">
          {t('home.partner.vendor.cta')}
        </Button>
        <div className="dashboard-mini">
          <b>{t('home.partner.vendor.sales')}</b>
          <strong>KES 24,850</strong>
          <span>+18.2% this week</span>
        </div>
      </div>
      <div className="partner rider-banner">
        <span className="kicker">{t('home.partner.rider.kicker')}</span>
        <h2>{t('home.partner.rider.title')}</h2>
        <p>{t('home.partner.rider.copy')}</p>
        <Button variant="ink" icon="arrow">{t('home.partner.rider.cta')}</Button>
        <div className="helmet"><Icon name="bike" size={64} /></div>
      </div>
    </section>
  );
}