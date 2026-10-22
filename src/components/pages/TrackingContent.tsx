'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import FoodGlyph from '@/components/FoodGlyph';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

interface RiderTracking {
  id: string;
  order_id: string;
  rider_name: string | null;
  rider_phone: string | null;
  rider_rating: number | null;
  current_lat: number | null;
  current_lng: number | null;
  eta_minutes: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function TrackingContent({ go }: { go: (p: string) => void }) {
  const { user } = useAuth();
  const [tracking, setTracking] = useState<RiderTracking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchTracking = () => {
      fetch('/api/orders/active', {
        headers: user?.id ? { Authorization: `Bearer ${user.id}` } : {},
      })
        .then((r) => r.json())
        .then((data) => {
          setTracking(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchTracking();

    // Poll for updates every 5 seconds
    const interval = setInterval(fetchTracking, 5000);
    return () => clearInterval(interval);
  }, [user]);

  if (loading) {
    return (
      <main className="tracking-page">
        <p>Loading tracking...</p>
      </main>
    );
  }

  if (!tracking) {
    return (
      <main className="tracking-page">
        <div className="empty-state">
          <p>No active orders to track.</p>
          <Button variant="yellow" onClick={() => go('/')}>
            Browse shops
          </Button>
        </div>
      </main>
    );
  }

  const eta = tracking.eta_minutes || 24;
  const riderName = tracking.rider_name || 'John M.';
  const riderRating = tracking.rider_rating || 4.9;
  const status = tracking.status;

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
        <button className="back-float" onClick={() => go('/')}>←</button>
      </section>
      <aside className="tracking-panel">
        <span className="live-pill"><i /> LIVE ORDER</span>
        <h1>{eta} <small>min</small></h1>
        <p>Estimated arrival · {new Date(Date.now() + eta * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <div className="progress-list">
          <div className="done">
            <span><Icon name="check" size={15} /></span>
            <div>
              <b>Order accepted</b>
              <small>12:58 PM</small>
            </div>
          </div>
          <div className={status === 'preparing' ? 'done' : 'done'}>
            <span><Icon name="check" size={15} /></span>
            <div>
              <b>Preparing your order</b>
              <small>Mama Njeri's is cooking</small>
            </div>
          </div>
          <div className={status === 'on_the_way' || status === 'accepted' ? 'active' : 'done'}>
            <span><Icon name="bike" size={17} /></span>
            <div>
              <b>On the way</b>
              <small>{riderName} picked up your order</small>
            </div>
          </div>
          <div className={status === 'delivered' ? 'done' : ''}>
            <span />
            <div>
              <b>Delivered</b>
              <small>Almost there</small>
            </div>
          </div>
        </div>
        <div className="rider-card">
          <div className="avatar">{riderName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}</div>
          <span>
            <b>{riderName}</b>
            <small>{riderRating} rating · 320 deliveries</small>
          </span>
          <button><Icon name="phone" /></button>
          <button><Icon name="chat" /></button>
        </div>
        <div className="tracking-order">
          <span>Order #{tracking.order_id.slice(0, 8).toUpperCase()}</span>
          <button>View receipt</button>
        </div>
      </aside>
    </main>
  );
}