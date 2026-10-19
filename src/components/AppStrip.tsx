'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAppContext } from '@/context/AppContext';
import Icon from '@/components/ui/Icon';
import Logo from '@/components/ui/Logo';

export default function AppStrip() {
  const { t } = useLanguage();
  const app = t('home').app;

  return (
    <section className="app-strip">
      <div>
        <span className="kicker">{app.kicker}</span>
        <h2>{app.title}</h2>
        <p>{app.copy}</p>
        <div className="store-badges">
          <button>Download on the<br /><b>App Store</b></button>
          <button>GET IT ON<br /><b>Google Play</b></button>
        </div>
      </div>
      <div className="app-phone">
        <Logo />
        <div className="app-greeting">{app.greeting}</div>
        <div className="app-order">
          <span><Icon name="bike" /></span>
          <div>
            <b>{app.order}</b>
            <small>{app.status}</small>
          </div>
        </div>
      </div>
    </section>
  );
}