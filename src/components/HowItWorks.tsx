'use client';

import { useLanguage } from '@/context/LanguageContext';
import Icon from '@/components/ui/Icon';

export default function HowItWorks() {
  const { t } = useLanguage();
  const how = t('home').how;

  return (
    <section className="section how">
      <div className="section-head">
        <div>
          <span className="kicker">{how.kicker}</span>
          <h2>{how.title}</h2>
        </div>
      </div>
      <div className="steps">
        <div>
          <span>1</span>
          <Icon name="grid" size={32} />
          <h3>{how.step1}</h3>
          <p>{how.desc1}</p>
        </div>
        <div>
          <span>2</span>
          <b className="mpesa">M</b>
          <h3>{how.step2}</h3>
          <p>{how.desc2}</p>
        </div>
        <div>
          <span>3</span>
          <Icon name="bike" size={36} />
          <h3>{how.step3}</h3>
          <p>{how.desc3}</p>
        </div>
      </div>
    </section>
  );
}