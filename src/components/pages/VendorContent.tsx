'use client';

import { useAppContext } from '@/context/AppContext';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

export default function VendorContent({ go }: { go: (p: string) => void }) {
  return (
    <main>
      <section className="vendor-hero">
        <div>
          <span className="eyebrow">DUKAPLUG FOR BUSINESS</span>
          <h1>Plug in<br />your shop.</h1>
          <p>More orders. More regulars. One simple dashboard built for how Kenya does business.</p>
          <div className="hero-actions">
            <Button variant="yellow" icon="arrow">Start selling</Button>
            <button className="text-link light">See how it works</button>
          </div>
          <div className="vendor-proof">
            <b>2,400+</b>
            <span>local businesses<br />already plugged in</span>
          </div>
        </div>
        <div className="dashboard">
          <div className="dash-side">
            <Logo compact />
            {["Overview", "Orders", "Menu & stock", "Earnings"].map((x, i) => (
              <span key={x} className={i === 0 ? "active" : ""}>
                {x}
              </span>
            ))}
          </div>
          <div className="dash-main">
            <div className="dash-head">
              <div>
                <small>KARIBU BACK</small>
                <h3>Mama Njeri's</h3>
              </div>
              <span className="open-dot">Open for orders</span>
            </div>
            <div className="metric-grid">
              <div>
                <small>TODAY'S SALES</small>
                <strong>KES 24,850</strong>
                <span>+18.2%</span>
              </div>
              <div>
                <small>NEW ORDERS</small>
                <strong>18</strong>
                <span>4 preparing</span>
              </div>
            </div>
            <div className="incoming">
              <span className="kicker">NEW ORDER · #2408</span>
              <b>2 items · KES 860</b>
              <div>
                <button>Decline</button>
                <Button variant="green">Accept order</Button>
              </div>
            </div>
            <div className="bars">
              {[45, 68, 42, 80, 62, 94, 70].map((x, i) => (
                <span key={i} style={{ height: `${x}%` }} />
              ))}
            </div>
          </div>
          <div className="order-phone">
            <span>NEW ORDER</span>
            <b>KES 1,240</b>
            <small>3 items · Rongai</small>
            <Button variant="green">Accept</Button>
          </div>
        </div>
      </section>
      <section className="section vendor-benefits">
        <div className="section-head">
          <div>
            <span className="kicker">BUILT FOR GROWTH</span>
            <h2>We bring the customers.<br />You bring the good stuff.</h2>
          </div>
        </div>
        <div className="benefit-grid">
          <div>
            <span>01</span>
            <h3>Simple setup</h3>
            <p>Your digital shop can be live in a few days.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Real-time control</h3>
            <p>Update stock, prices and hours instantly.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Reliable payouts</h3>
            <p>Clear earnings and daily settlements.</p>
          </div>
          <div>
            <span>04</span>
            <h3>Growth tools</h3>
            <p>Promos, loyalty and customer insights.</p>
          </div>
        </div>
      </section>
    </main>
  );
}