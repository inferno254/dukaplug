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
    <main className="shop-page-shell">
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
          <h1>{config.heading}</h1>
          <p>{config.copy}</p>
        </div>
      </section>
      <div className="menu-tabs">
        {config.tabs.map((tab, i) => (
          <button key={tab} className={i === 0 ? 'active' : ''}>
            {tab}
          </button>
        ))}
      </div>
      <div className="menu-list">
        {categoryProducts.length === 0 ? (
          <p className="empty-state">No products available in this category yet.</p>
        ) : (
          categoryProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={{
                id: item.id,
                name: item.name,
                desc: item.description || '',
                price: item.price,
                image: item.image_url || 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=800',
              }}
              onAdd={() => handleAdd(item)}
            />
          ))
        )}
      </div>
    </main>
  );
}