'use client';

import { useProducts } from '@/hooks/useProducts';
import { useAppContext } from '@/context/AppContext';
import { useCartContext } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

const CATEGORY_CONFIG: Record<string, { kicker: string; heading: string; copy: string; tabs: string[] }> = {
  food: {
    kicker: 'LOCAL FAVOURITE',
    heading: 'Popular right now',
    copy: 'The dishes Rongai keeps coming back for.',
    tabs: ['Popular', 'Meals', 'Grills', 'Sides', 'Drinks'],
  },
  groceries: {
    kicker: 'FRESH FROM THE MARKET',
    heading: 'Fresh picks today',
    copy: 'Market-fresh groceries at familiar local prices.',
    tabs: ['Vegetables', 'Fruit', 'Dairy', 'Eggs', 'Bundles'],
  },
  shopping: {
    kicker: 'DAILY ESSENTIALS',
    heading: 'Household favourites',
    copy: 'The everyday basics your home should never run out of.',
    tabs: ['Pantry', 'Breakfast', 'Cleaning', 'Personal care', 'Gas'],
  },
};

export default function ShopPageContent({ go }: { go: (p: string) => void }) {
  const { browseType, openCategory } = useAppContext();
  const { addItem, items } = useCartContext();
  const { products, loading, error } = useProducts();

  const category = browseType === 'food' ? 'food' : browseType === 'groceries' ? 'groceries' : 'shopping';
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.food;
  const categoryProducts = products.filter(
    (p) => p.category?.toLowerCase() === category
  );

  const handleAdd = (product: any) => {
    addItem(product);
  };

  const handleOpenCategory = (type: 'food' | 'groceries' | 'shopping') => {
    openCategory(type);
  };

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  if (loading) {
    return (
      <main className="page-shell">
        <div className="browse-switch">
          {(['food', 'groceries', 'shopping'] as const).map((item) => (
            <button key={item} disabled>
              {item === 'food' ? 'Food' : item === 'groceries' ? 'Groceries' : 'Shopping'}
            </button>
          ))}
        </div>
        <div className="loading-state">
          <p>Loading products...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-shell">
        <div className="error-state">
          <p>Failed to load products: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="browse-switch">
        {(['food', 'groceries', 'shopping'] as const).map((item) => (
          <button
            key={item}
            className={browseType === item ? 'active' : ''}
            onClick={() => handleOpenCategory(item)}
          >
            {item === 'food' ? 'Food' : item === 'groceries' ? 'Groceries' : 'Shopping'}
          </button>
        ))}
      </div>
      <section className="shop-title">
        <div>
          <span className="kicker">{config.kicker}</span>
          <h1>{categoryProducts[0]?.vendor?.name || 'Shop'}</h1>
          <p>{categoryProducts[0]?.vendor?.location || 'Local'}</p>
          <div className="shop-stats">
            <span><Icon name="star" size={16} /> {categoryProducts[0]?.vendor?.rating || 4.9} ({categoryProducts.length}+)</span>
            <span><Icon name="clock" size={16} /> 15–25 min</span>
            <span>Free delivery</span>
          </div>
        </div>
        <button className="heart big"><Icon name="heart" /></button>
      </section>
      <nav className="menu-tabs">
        {config.tabs.map((tab, i) => (
          <button key={tab} className={i === 0 ? 'active' : ''}>
            {tab}
          </button>
        ))}
      </nav>
      <section className="menu-layout">
        <div>
          <h2>{config.heading}</h2>
          <p>{config.copy}</p>
          <div className="menu-list">
            {categoryProducts.length === 0 ? (
              <p className="empty-state">No products available in this category yet.</p>
            ) : (
              categoryProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  item={{
                    name: item.name,
                    desc: item.description || '',
                    price: item.price,
                    image: item.image_url || 'https://images.unsplash.com/photo-1726177974666-88e937fa8e59?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200',
                  }}
                  onAdd={() => handleAdd(item)}
                />
              ))
            )}
          </div>
        </div>
        <aside className="desktop-cart">
          <span className="kicker">YOUR ORDER</span>
          <h2>{cartCount > 0 ? 'Good choice.' : 'Your cart is empty'}</h2>
          {items.length === 0 ? (
            <p className="empty-cart-hint">Add items from the menu to get started.</p>
          ) : (
            <>
              {items.map((item) => (
                <div className="cart-line" key={item.product.id}>
                  <span>{item.quantity}× {item.product.name}</span>
                  <b>KES {item.product.price * item.quantity}</b>
                </div>
              ))}
              <hr />
              <div className="cart-line total">
                <span>Total</span>
                <b>KES {cartTotal}</b>
              </div>
              <Button variant="yellow" onClick={() => go('/checkout')}>
                Go to checkout
              </Button>
            </>
          )}
        </aside>
      </section>
      {cartCount > 0 && (
        <button
          className="mobile-cart-bar"
          onClick={() => go('/checkout')}
        >
          <span>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
          <b>View cart · KES {cartTotal}</b>
          <Icon name="arrow" />
        </button>
      )}
    </main>
  );
}