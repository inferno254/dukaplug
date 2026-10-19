'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAppContext } from '@/context/AppContext';
import Icon from '@/components/ui/Icon';
import Logo from '@/components/ui/Logo';

export default function AppStrip() {
  const { t } = useLanguage();

  return (
    <section className="app-strip">
      <div>
        <span className="kicker">{t('home.app.kicker')}</span>
        <h2>{t('home.app.title')}</h2>
        <p>{t('home.app.copy')}</p>
        <div className="store-badges">
          <button>Download on the<br /><b>App Store</b></button>
          <button>GET IT ON<br /><b>Google Play</b></button>
        </div>
      </div>
      <div className="app-phone">
        <Logo />
        <div className="app-greeting">{t('home.app.greeting')}</div>
        <div className="app-order">
          <span><Icon name="bike" /></span>
          <div>
            <b>{t('home.app.order')}</b>
            <small>{t('home.app.status')}</small>
          </div>
        </div>
      </div>
    </section>
  );
}