'use client';

import { useState } from 'react';
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

// Subcategory data with images for food category
const FOOD_SUBCATEGORIES: Record<string, { 
  title: string; 
  subtitle: string;
  image: string;
  description: string;
}> = {
  Popular: {
    title: 'Popular',
    subtitle: 'Everyone\'s favourites',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Top-rated dishes loved by locals',
  },
  Meals: {
    title: 'Meals',
    subtitle: 'Complete dishes',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Hearty plates with protein, carbs & veg',
  },
  Grills: {
    title: 'Grills',
    subtitle: 'Flame-kissed perfection',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Nyama choma, kebabs & grilled specialties',
  },
  Sides: {
    title: 'Sides',
    subtitle: 'Perfect accompaniments',
    image: 'https://images.unsplash.com/photo-1573080496219-cb088bc8c2d7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Ugali, fries, salads & more',
  },
  Drinks: {
    title: 'Drinks',
    subtitle: 'Refresh & hydrate',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Sodas, juices, water & local brews',
  },
};

// Subcategory data with images for groceries category
const GROCERIES_SUBCATEGORIES: Record<string, { 
  title: string; 
  subtitle: string;
  image: string;
  description: string;
}> = {
  Vegetables: {
    title: 'Vegetables',
    subtitle: 'Fresh from the farm',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Sukuma, spinach, tomatoes, onions & more',
  },
  Fruit: {
    title: 'Fruit',
    subtitle: 'Nature\'s candy',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Mangoes, avocados, bananas, pineapples',
  },
  Dairy: {
    title: 'Dairy',
    subtitle: 'Rich & creamy',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Milk, mala, yoghurt, cheese & butter',
  },
  Eggs: {
    title: 'Eggs',
    subtitle: 'Farm-fresh daily',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Kienyeji & commercial eggs by the tray',
  },
  Bundles: {
    title: 'Bundles',
    subtitle: 'Save more, buy smart',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Curated combos for families & meal prep',
  },
};

// Subcategory data with images for shopping category
const SHOPPING_SUBCATEGORIES: Record<string, { 
  title: string; 
  subtitle: string;
  image: string;
  description: string;
}> = {
  Pantry: {
    title: 'Pantry',
    subtitle: 'Stock your shelves',
    image: 'https://images.unsplash.com/photo-1586201375761-83865011e356?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Rice, flour, oil, spices & dry goods',
  },
  Breakfast: {
    title: 'Breakfast',
    subtitle: 'Start your day right',
    image: 'https://images.unsplash.com/photo-1541596104398-8d0d80d6f1b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Bread, cereals, spreads, tea & coffee',
  },
  Cleaning: {
    title: 'Cleaning',
    subtitle: 'Spotless home',
    image: 'https://images.unsplash.com/photo-1584415608332-96e0c2b0a195?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Detergents, soaps, bleach & tools',
  },
  'Personal care': {
    title: 'Personal care',
    subtitle: 'Daily essentials',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'Toothpaste, soap, lotion, tissue & more',
  },
  Gas: {
    title: 'Gas',
    subtitle: 'Cook without limits',
    image: 'https://images.unsplash.com/photo-1581091215378-106c191d4e8f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=600',
    description: 'LPG refills & accessories delivered',
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

  const [activeTab, setActiveTab] = useState(0);

  const handleAdd = (product: any) => {
    addItem(product);
  };

  const handleOpenCategory = (type: 'food' | 'groceries' | 'shopping') => {
    openCategory(type);
  };

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  // Get subcategory info based on current category and tab
  const currentTabName = config.tabs[activeTab];
  let subcatInfo = null;
  if (category === 'food') {
    subcatInfo = FOOD_SUBCATEGORIES[currentTabName];
  } else if (category === 'groceries') {
    subcatInfo = GROCERIES_SUBCATEGORIES[currentTabName];
  } else if (category === 'shopping') {
    subcatInfo = SHOPPING_SUBCATEGORIES[currentTabName];
  }

  // Filter products by subcategory (mock filtering - in real app would use subcategory field)
  const filteredProducts = subcatInfo 
    ? categoryProducts.slice(0, 8) // Show subset for demo
    : categoryProducts;

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

      {/* Subcategory tabs with images for all categories */}
      <div className="subcat-tabs">
        {config.tabs.map((tab, i) => {
          let info = null;
          if (category === 'food') {
            info = FOOD_SUBCATEGORIES[tab];
          } else if (category === 'groceries') {
            info = GROCERIES_SUBCATEGORIES[tab];
          } else if (category === 'shopping') {
            info = SHOPPING_SUBCATEGORIES[tab];
          }
          
          return (
            <button
              key={tab}
              className={`subcat-tab ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
              style={{ backgroundImage: info ? `linear-gradient(rgba(21,26,20,0.15), rgba(21,26,20,0.15)), url(${info.image})` : undefined }}
            >
              <div className="subcat-tab-image" />
              <div className="subcat-tab-content">
                <span className="subcat-tab-title">{info?.title || tab}</span>
                <span className="subcat-tab-subtitle">{info?.subtitle || ''}</span>
              </div>
              {activeTab === i && <span className="subcat-tab-indicator" />}
            </button>
          );
        })}
      </div>

      <div className="menu-list">
        {filteredProducts.length === 0 ? (
          <p className="empty-state">No products available in this category yet.</p>
        ) : (
          filteredProducts.map((item) => (
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