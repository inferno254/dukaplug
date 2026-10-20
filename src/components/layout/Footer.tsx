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
        <h2 dangerouslySetInnerHTML={{ __html: t('footer.title') }} />
      </div>
      <div className="footer-grid">
        <div>
          <p dangerouslySetInnerHTML={{ __html: t('footer.copy') }} />
          <span dangerouslySetInnerHTML={{ __html: t('footer.motto') }} />
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
        <span dangerouslySetInnerHTML={{ __html: t('footer.madeBy') }} />
      </div>
    </footer>
  );
}