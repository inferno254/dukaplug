'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useCartContext } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

export default function CheckoutContent({ go }: { go: (p: string) => void }) {
  const { location, openLocation } = useAppContext();
  const { 
    items, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart 
  } = useCartContext();

  const [stage, setStage] = useState<'details' | 'paying' | 'success'>('details');

  useEffect(() => {
    if (stage === 'paying') {
      const id = window.setTimeout(() => setStage('success'), 1800);
      return () => window.clearTimeout(id);
    }
  }, [stage]);

  if (stage === 'success') {
    return (
      <main className="success-page">
        <div className="spark">✦</div>
        <div className="success-plug">
          <Icon name="check" size={56} />
        </div>
        <span className="kicker">PLUGGED IN!</span>
        <h1>Order confirmed.</h1>
        <p>Mama Njeri's is preparing your food.<br />Your rider will be with you soon.</p>
        <div className="order-number">Order #DP2408 <b>ETA 24 min</b></div>
        <Button 
          onClick={() => go('/')} 
          icon="arrow"
        >
          Track my order
        </Button>
        <button className="text-link" onClick={() => go('/')}>
          Back home
        </button>
      </main>
    );
  }

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <main className="checkout-page">
      <button 
        className="plain-back" 
        onClick={() => go('/shop')}
      >
        ← Back to menu
      </button>
      <div className="checkout-grid">
        <section>
          <span className="kicker">CHECKOUT</span>
          <h1>Almost there.</h1>
          <div className="checkout-block">
            <div className="block-title">
              <span>1</span>
              <div>
                <h3>Delivery details</h3>
                <p>Where should we bring it?</p>
              </div>
            </div>
            <button 
              className="address-card" 
              onClick={openLocation}
            >
              <Icon name="pin" />
              <span>
                <b>{location.name}</b>
                <small>{location.detail}</small>
              </span>
              <Icon name="chevron" />
            </button>
            <div className="toggle">
              <button className="active">Delivery</button>
              <button>Pickup</button>
            </div>
          </div>
          <div className="checkout-block">
            <div className="block-title">
              <span>2</span>
              <div>
                <h3>Payment</h3>
                <p>Fast and secure.</p>
              </div>
            </div>
            <label className="payment-option selected">
              <input 
                type="radio" 
                defaultChecked 
                name="pay" 
              />
              <b className="mpesa">M</b>
              <span>
                <strong>M-Pesa</strong>
                <small>STK push to your phone</small>
              </span>
            </label>
            <label className="phone-input">
              <span>+254</span>
              <input 
                defaultValue="712 345 678"
                aria-label="M-Pesa phone number"
              />
            </label>
            <label className="payment-option">
              <input type="radio" name="pay" />
              <span className="card-icon">CARD</span>
              <span>
                <strong>Debit or credit card</strong>
                <small>Visa, Mastercard</small>
              </span>
            </label>
          </div>
        </section>
        <aside className="order-summary">
          <h2>Your order</h2>
          <small>Mama Njeri's Kitchen</small>
          <div className="summary-item">
            <img src={items[0]?.product?.image || 'https://images.unsplash.com/photo-1726177974666-88e937fa8e59?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200'} alt="" />
            <span>
              <b>{items[0]?.product?.name || 'Loaded nyama choma bowl'}</b>
              <small>1 × KES {items[0]?.product?.price || 680}</small>
            </span>
            <button>Edit</button>
          </div>
          {items.length > 1 && (
            <div className="summary-item">
              <img src={items[1]?.product?.image || 'https://images.unsplash.com/photo-1738291422837-85761f82a10e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200'} alt="" />
              <span>
                <b>{items[1]?.product?.name || 'Fresh passion juice'}</b>
                <small>1 × KES {items[1]?.product?.price || 180}</small>
              </span>
              <button>Edit</button>
            </div>
          )}
          <label className="promo">
            <input placeholder="Promo code" />
            <button>Apply</button>
          </label>
          <div className="tip-row">
            <span>Rider tip</span>
            {[0, 50, 100].map((n) => (
              <button key={n}>KES {n}</button>
            ))}
          </div>
          <div className="totals">
            <p>
              <span>Subtotal</span>
              <b>KES {total}</b>
            </p>
            <p>
              <span>Delivery</span>
              <b className="free">FREE</b>
            </p>
            <p className="grand">
              <span>Total</span>
              <b>KES {total}</b>
            </p>
          </div>
          <Button 
            variant="yellow" 
            onClick={() => setStage('paying')}
          >
            {stage === 'paying' ? "Waiting for M-Pesa..." : `Pay KES ${total}`}
          </Button>
          {stage === 'paying' && (
            <div className="waiting">
              <span />
              <p>Check your phone and enter your M-Pesa PIN.</p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}