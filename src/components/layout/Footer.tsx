'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAppContext } from '@/context/AppContext';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  const { t } = useLanguage();
  const { go } = useAppContext();
  const footer = t('footer');

  return (
    <footer>
      <div className="footer-top">
        <Logo />
        <h2>{footer.title}</h2>
      </div>
      <div className="footer-grid">
        <div>
          <p>{footer.copy}</p>
          <span>{footer.motto}</span>
        </div>
        <div>
          <b>Explore</b>
          <button onClick={() => go('shop')}>Food & shops</button>
          <button onClick={() => go('checkout')}>Checkout</button>
          <button onClick={() => go('tracking')}>Track order</button>
        </div>
        <div>
          <b>Partner</b>
          <button onClick={() => go('vendor')}>Sell on DukaPlug</button>
          <button>Become a rider</button>
          <button>Business support</button>
        </div>
        <div>
          <b>Need help?</b>
          <button>Help centre</button>
          <button>hello@dukaplug.co.ke</button>
          <button>+254 700 DUKA</button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{footer.copyright}</span>
        <span>{footer.madeBy}</span>
      </div>
    </footer>
  );
}