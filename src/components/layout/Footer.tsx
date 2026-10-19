'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAppContext } from '@/context/AppContext';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  const { t } = useLanguage();
  const { go } = useAppContext();

  return (
    <footer>
      <div className="footer-top">
        <Logo />
        <h2>{t('footer.title')}</h2>
      </div>
      <div className="footer-grid">
        <div>
          <p>{t('footer.copy')}</p>
          <span>{t('footer.motto')}</span>
        </div>
        <div>
          <b>{t('footer.explore')}</b>
          <button onClick={() => go('shop')}>{t('footer.foodShops')}</button>
          <button onClick={() => go('checkout')}>{t('footer.checkoutLink')}</button>
          <button onClick={() => go('tracking')}>{t('footer.trackOrder')}</button>
        </div>
        <div>
          <b>{t('footer.partner')}</b>
          <button onClick={() => go('vendor')}>{t('footer.sellOn')}</button>
          <button>{t('footer.becomeRider')}</button>
          <button>{t('footer.businessSupport')}</button>
        </div>
        <div>
          <b>{t('footer.help')}</b>
          <button>{t('footer.helpCenter')}</button>
          <button>{t('footer.email')}</button>
          <button>{t('footer.phone')}</button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t('footer.copyright')}</span>
        <span>{t('footer.madeBy')}</span>
      </div>
    </footer>
  );
}