'use client';

import { useState } from 'react';
import { menuItems, groceryItems, shoppingItems } from '@/data/products';
import { useAppContext } from '@/context/AppContext';
import { useCartContext } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

export default function ShopPageContent({ go, cartCount }: { go: (p: string) => void; cartCount: number }) {
  const { browseType, openCategory } = useAppContext();
  const { addItem } = useCartContext();

  const configs = {
    food: { 
      kicker: "LOCAL FAVOURITE", 
      name: "Mama Njeri's Kitchen", 
      subtitle: "Kenyan comfort food · Rongai", 
      cover: "https://images.unsplash.com/photo-1726177974666-88e937fa8e59?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200", 
      alt: "A spread of Kenyan dishes", 
      heading: "Popular right now", 
      copy: "The dishes Rongai keeps coming back for.", 
      tabs: ["Popular", "Meals", "Grills", "Sides", "Drinks"], 
      items: menuItems 
    },
    groceries: { 
      kicker: "FRESH FROM THE MARKET", 
      name: "Fresh Basket Rongai", 
      subtitle: "Vegetables, fruit and dairy · Rongai", 
      cover: "https://images.unsplash.com/photo-1768119901638-75c6edd64c0b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200", 
      alt: "Fresh vegetables displayed in market crates", 
      heading: "Fresh picks today", 
      copy: "Market-fresh groceries at familiar local prices.", 
      tabs: ["Vegetables", "Fruit", "Dairy", "Eggs", "Bundles"], 
      items: groceryItems 
    },
    shopping: { 
      kicker: "DAILY ESSENTIALS", 
      name: "Duka Essentials", 
      subtitle: "Pantry and household · Rongai", 
      cover: "https://images.unsplash.com/photo-1722639096482-4e1a805f9b0b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200", 
      alt: "Everyday goods at a local shop", 
      heading: "Household favourites", 
      copy: "The everyday basics your home should never run out of.", 
      tabs: ["Pantry", "Breakfast", "Cleaning", "Personal care", "Gas"], 
      items: shoppingItems 
    },
  };

  const config = configs[browseType];

  const handleAdd = (item: typeof menuItems[number] | typeof groceryItems[number] | typeof shoppingItems[number]) => {
    addItem(item);
  };

  const handleOpenCategory = (type: 'food' | 'groceries' | 'shopping') => {
    openCategory(type);
  };

  return (
    <>
      <main className="page-shell">
        <div className="browse-switch">
          {(["food", "groceries", "shopping"] as const).map((item) => (
            <button 
              key={item} 
              className={browseType === item ? "active" : ""} 
              onClick={() => handleOpenCategory(item)}
            >
              {item === "food" ? "Food" : item === "groceries" ? "Groceries" : "Shopping"}
            </button>
          ))}
        </div>
        <section className="shop-cover">
          <img src={config.cover} alt={config.alt} />
          <button className="back-float" onClick={() => go('/')}>←</button>
          <span className="open-sticker">OPEN<br /><b>NOW</b></span>
        </section>
        <section className="shop-title">
          <div>
            <span className="kicker">{config.kicker}</span>
            <h1>{config.name}</h1>
            <p>{config.subtitle}</p>
            <div className="shop-stats">
              <span><Icon name="star" size={16} /> 4.9 (500+)</span>
              <span><Icon name="clock" size={16} /> 15–25 min</span>
              <span>Free delivery</span>
            </div>
          </div>
          <button className="heart big"><Icon name="heart" /></button>
        </section>
        <nav className="menu-tabs">
          {config.tabs.map((tab, i) => (
            <button 
              key={tab} 
              className={i === 0 ? "active" : ""} 
            >
              {tab}
            </button>
          ))}
        </nav>
        <section className="menu-layout">
          <div>
            <h2>{config.heading}</h2>
            <p>{config.copy}</p>
            <div className="menu-list">
              {config.items.map((item, i) => (
                <ProductCard 
                  key={item.name} 
                  item={item} 
                  onAdd={() => handleAdd(item)} 
                  quantity={i === 0 ? Math.max(1, cartCount - 1) : 0} 
                />
              ))}
            </div>
          </div>
          <aside className="desktop-cart">
            <span className="kicker">YOUR ORDER</span>
            <h2>Good choice.</h2>
            <div className="cart-line">
              <span>1× {config.items[0].name}</span>
              <b>KES {config.items[0].price}</b>
            </div>
            <div className="cart-line">
              <span>1× {config.items[1].name}</span>
              <b>KES {config.items[1].price}</b>
            </div>
            <hr />
            <div className="cart-line total">
              <span>Total</span>
              <b>KES {config.items[0].price + config.items[1].price}</b>
            </div>
            <Button variant="yellow" onClick={() => go('/checkout')}>
              Go to checkout
            </Button>
          </aside>
        </section>
        {cartCount > 0 && (
          <button 
            className="mobile-cart-bar" 
            onClick={() => go('/checkout')}
          >
            <span>{cartCount} items</span>
            <b>View cart · KES {cartCount * config.items[0].price}</b>
            <Icon name="arrow" />
          </button>
        )}
      </main>
    </>
  );
}