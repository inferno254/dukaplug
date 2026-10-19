'use client';

import { useAppContext } from '@/context/AppContext';
import FoodGlyph from '@/components/FoodGlyph';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

export default function TrackingContent({ go }: { go: (p: string) => void }) {
  return (
    <main className="tracking-page">
      <section className="map">
        <div className="map-road r1" />
        <div className="map-road r2" />
        <div className="map-road r3" />
        <span className="map-label l1">Magadi Rd</span>
        <span className="map-label l2">Maasai Lodge</span>
        <div className="route" />
        <div className="map-pin restaurant-pin">
          <FoodGlyph type="burger" />
        </div>
        <div className="map-pin home-pin">
          <Icon name="home" />
        </div>
        <div className="rider-dot">
          <Icon name="bike" />
        </div>
        <button className="back-float" onClick={() => go('/')} >←</button>
      </section>
      <aside className="tracking-panel">
        <span className="live-pill"><i /> LIVE ORDER</span>
        <h1>24 <small>min</small></h1>
        <p>Estimated arrival · 1:42 PM</p>
        <div className="progress-list">
          <div className="done">
            <span><Icon name="check" size={15} /></span>
            <div>
              <b>Order accepted</b>
              <small>12:58 PM</small>
            </div>
          </div>
          <div className="done">
            <span><Icon name="check" size={15} /></span>
            <div>
              <b>Preparing your order</b>
              <small>Mama Njeri's is cooking</small>
            </div>
          </div>
          <div className="active">
            <span><Icon name="bike" size={17} /></span>
            <div>
              <b>On the way</b>
              <small>John picked up your order</small>
            </div>
          </div>
          <div>
            <span />
            <div>
              <b>Delivered</b>
              <small>Almost there</small>
            </div>
          </div>
        </div>
        <div className="rider-card">
          <div className="avatar">JM</div>
          <span>
            <b>John M.</b>
            <small>4.9 rating · 320 deliveries</small>
          </span>
          <button><Icon name="phone" /></button>
          <button><Icon name="chat" /></button>
        </div>
        <div className="tracking-order">
          <span>Order #DP2408</span>
          <button>View receipt</button>
        </div>
      </aside>
    </main>
  );
}