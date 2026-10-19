'use client';

import { useLanguage } from '@/context/LanguageContext';
import Icon from '@/components/ui/Icon';

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="section how">
      <div className="section-head">
        <div>
          <span className="kicker">{t('home.how.kicker')}</span>
          <h2>{t('home.how.title')}</h2>
        </div>
      </div>
      <div className="steps">
        <div>
          <span>1</span>
          <Icon name="grid" size={32} />
          <h3>{t('home.how.step1')}</h3>
          <p>{t('home.how.desc1')}</p>
        </div>
        <div>
          <span>2</span>
          <b className="mpesa">M</b>
          <h3>{t('home.how.step2')}</h3>
          <p>{t('home.how.desc2')}</p>
        </div>
        <div>
          <span>3</span>
          <Icon name="bike" size={36} />
          <h3>{t('home.how.step3')}</h3>
          <p>{t('home.how.desc3')}</p>
        </div>
      </div>
    </section>
  );
}