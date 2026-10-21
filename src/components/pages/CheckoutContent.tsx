'use client';

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useCartContext } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

export default function CheckoutContent({ go }: { go: (p: string) => void }) {
  const { location, openLocation } = useAppContext();
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCartContext();
  const { user } = useAuth();

  const [stage, setStage] = useState<'details' | 'paying' | 'success'>('details');
  const [tip, setTip] = useState(0);
  const [phone, setPhone] = useState(user?.phone || '712 345 678');
  const [processing, setProcessing] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal + tip;

  const handlePay = async () => {
    if (items.length === 0) return;
    setProcessing(true);
    setStage('paying');

    try {
      // Create order in database
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.id && { 'Authorization': `Bearer ${user.id}` }),
        },
        body: JSON.stringify({
          items,
          vendorId: items[0]?.product?.vendor?.id,
          deliveryAddress: location.detail,
          deliveryLocation: location.name,
          paymentMethod: 'mpesa',
          phone,
          total,
        }),
      });

      if (!orderRes.ok) {
        console.error('Failed to create order');
      }

      // Initiate STK Push
      const stkRes = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount: total, orderId: orderRes.ok ? (await orderRes.json()).id : undefined }),
      });

      if (!stkRes.ok) {
        console.error('STK Push failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
    }

    // Simulate payment processing
    setTimeout(() => {
      setStage('success');
      setProcessing(false);
    }, 1800);
  };

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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-label="M-Pesa phone number"
                autoComplete="off"
                inputMode="numeric"
                data-1p-ignore
                data-lpignore
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
          {items.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <>
              {items.map((item) => (
                <div className="summary-item" key={item.product.id}>
                  <img
                    src={item.product.image_url || 'https://images.unsplash.com/photo-1726177974666-88e937fa8e59?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200'}
                    alt={item.product.name}
                  />
                  <span>
                    <b>{item.product.name}</b>
                    <small>
                      {item.quantity} × KES {item.product.price}
                    </small>
                  </span>
                  <div className="qty-controls">
                    <button
                      aria-label="Decrease"
                      onClick={() =>
                        updateQuantity(item.product, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label="Increase"
                      onClick={() =>
                        updateQuantity(item.product, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
          <label className="promo">
            <input placeholder="Promo code" />
            <button>Apply</button>
          </label>
          <div className="tip-row">
            <span>Rider tip</span>
            {[0, 50, 100].map((n) => (
              <button
                key={n}
                className={tip === n ? 'active' : ''}
                onClick={() => setTip(n)}
              >
                KES {n}
              </button>
            ))}
          </div>
          <div className="totals">
            <p>
              <span>Subtotal</span>
              <b>KES {subtotal}</b>
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
            disabled={items.length === 0 || processing}
            onClick={handlePay}
          >
            {stage === 'paying'
              ? 'Waiting for M-Pesa...'
              : `Pay KES ${total}`}
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