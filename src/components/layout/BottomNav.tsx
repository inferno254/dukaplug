'use client';

import { useAppContext } from '@/context/AppContext';
import Icon from '@/components/ui/Icon';

export default function BottomNav() {
  const { page, go, cartCount } = useAppContext();

  const items: Array<[string, string, string]> = [
    ['home', 'home', 'Home'],
    ['shop', 'grid', 'Browse'],
    ['checkout', 'cart', 'Cart'],
    ['tracking', 'receipt', 'Orders'],
    ['profile', 'user', 'Profile'],
  ];

  return (
    <nav className="bottom-nav">
      {items.map(([p, icon, label]) => (
        <button
          key={p}
          className={page === p ? "active" : ""}
          onClick={() => go(p as any)}
        >
          <span>
            <Icon name={icon} />
            {p === "checkout" && cartCount > 0 && <i>{cartCount}</i>}
          </span>
          <small>{label}</small>
        </button>
      ))}
    </nav>
  );
}