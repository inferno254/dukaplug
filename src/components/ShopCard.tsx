'use client';

import Icon from '@/components/ui/Icon';

interface ShopCardProps {
  shop: {
    name: string;
    type: string;
    time: string;
    fee: string;
    image: string;
    badge: string;
  };
  go: (p: string) => void;
}

export default function ShopCard({ shop, go }: ShopCardProps) {
  return (
    <button className="shop-card" onClick={() => go('/shop')}>
      <div className="shop-image">
        <img src={shop.image} alt="" />
        <span className="card-badge">{shop.badge}</span>
        <span className="heart"><Icon name="heart" /></span>
      </div>
      <div className="shop-info">
        <div>
          <h3>{shop.name}</h3>
          <p>{shop.type}</p>
        </div>
        <span className="rating"><Icon name="star" size={14} /> 4.8</span>
      </div>
      <div className="shop-meta">
        <span><Icon name="clock" size={16} />{shop.time}</span>
        <span>{shop.fee}</span>
      </div>
    </button>
  );
}