'use client';

import { useState, useEffect, useRef } from 'react';
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

  const [stage, setStage] = useState<'details' | 'paying' | 'polling' | 'success' | 'failed'>('details');
  const [tip, setTip] = useState(0);
  const [phone, setPhone] = useState(user?.phone || '');
  const [processing, setProcessing] = useState(false);

  const formatPhone = (p: string) => {
    const cleaned = p.replace(/[\s+\-()]/g, '');
    if (cleaned.startsWith('0')) return `254${cleaned.slice(1)}`;
    if (cleaned.startsWith('254')) return cleaned;
    if (cleaned.length === 9) return `254${cleaned}`;
    return cleaned;
  };
  const [orderId, setOrderId] = useState<string | null>(null);
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const pollInterval = useRef<NodeJS.Timeout | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal + tip;

  const pollPaymentStatus = async (checkoutId: string) => {
    try {
      const res = await fetch(`/api/mpesa/status?checkoutRequestId=${checkoutId}`);
      const data = await res.json();
      if (data.status === 'success') {
        stopPolling();
        setStage('success');
        clearCart();
        // Trigger email receipt (will be handled by API)
        fetch('/api/orders/receipt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: data.orderId, email: user?.email }),
        });
      } else if (data.status === 'failed' || data.status === 'cancelled') {
        stopPolling();
        setStage('failed');
        setErrorMsg(data.message || 'Payment failed or was cancelled');
      }
    } catch (err) {
      console.error('Poll error:', err);
    }
  };

  const startPolling = (checkoutId: string) => {
    setStage('polling');
    pollInterval.current = setInterval(() => pollPaymentStatus(checkoutId), 3000);
  };

  const stopPolling = () => {
    if (pollInterval.current) {
      clearInterval(pollInterval.current);
      pollInterval.current = null;
    }
  };

  useEffect(() => () => stopPolling(), []);

  const handlePay = async () => {
    if (items.length === 0) return;
    setProcessing(true);
    setErrorMsg(null);
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
          phone: formatPhone(phone),
          total,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.id) {
        throw new Error(orderData.error || 'Failed to create order');
      }
      setOrderId(orderData.id);

      // Initiate STK Push
      const formattedPhone = formatPhone(phone);
      const stkRes = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formattedPhone, amount: total, orderId: orderData.id }),
      });

      const stkData = await stkRes.json();
      if (!stkRes.ok || !stkData.checkoutRequestId) {
        throw new Error(stkData.error || 'STK Push failed');
      }

      setCheckoutRequestId(stkData.checkoutRequestId);
      startPolling(stkData.checkoutRequestId);

    } catch (err: any) {
      console.error('Payment error:', err);
      setErrorMsg(err.message || 'Payment failed. Please try again.');
      setStage('failed');
      setProcessing(false);
    }
  };

  // Success stage with real order details
  if (stage === 'success') {
    return (
      <main className="success-page">
        <div className="spark">✦</div>
        <div className="success-plug">
          <Icon name="check" size={56} />
        </div>
        <span className="kicker">PLUGGED IN!</span>
        <h1>Order confirmed.</h1>
        <p>Your order has been paid and confirmed. The vendor is preparing it.</p>
        <div className="order-number">
          <span>Order #{orderId?.slice(0, 8).toUpperCase()}</span>
          <b>Check email for receipt</b>
        </div>
        <div className="receipt-box">
          <h4>Receipt</h4>
          <p>M-Pesa payment confirmed</p>
          <p>Total: KES {total}</p>
          <p>Delivery: {location.name}</p>
        </div>
        <Button onClick={() => go('/tracking')} icon="arrow">
          Track my order
        </Button>
        <Button variant="ghost" onClick={() => go('/')}>
          Back home
        </Button>
      </main>
    );
  }

  if (stage === 'failed') {
    return (
      <main className="checkout-page">
        <div className="checkout-grid">
          <section>
            <span className="kicker">PAYMENT FAILED</span>
            <h1>Something went wrong.</h1>
            <p className="error-text">{errorMsg}</p>
            <Button variant="yellow" onClick={() => setStage('details')}>
              Try again
            </Button>
            <Button variant="ghost" onClick={() => go('/shop')}>
              Back to menu
            </Button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <button className="plain-back" onClick={() => go('/shop')}>
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
            <button className="address-card" onClick={openLocation}>
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
              <input type="radio" defaultChecked name="pay" />
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
                placeholder="712 345 678"
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
                  <img src={item.product.image_url || 'https://images.unsplash.com/photo-1726177974666-88e937fa8e59?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200'} alt={item.product.name} />
                  <span>
                    <b>{item.product.name}</b>
                    <small>{item.quantity} × KES {item.product.price}</small>
                  </span>
                  <div className="qty-controls">
                    <button aria-label="Decrease" onClick={() => updateQuantity(item.product, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button aria-label="Increase" onClick={() => updateQuantity(item.product, item.quantity + 1)}>+</button>
                  </div>
                </div>
              ))}
            </>
          )}
          <label className="promo"><input placeholder="Promo code" /><button>Apply</button></label>
          <div className="tip-row">
            <span>Rider tip</span>
            {[0, 50, 100].map((n) => (
              <button key={n} className={tip === n ? 'active' : ''} onClick={() => setTip(n)}>KES {n}</button>
            ))}
          </div>
          <div className="totals">
            <p><span>Subtotal</span><b>KES {subtotal}</b></p>
            <p><span>Delivery</span><b className="free">FREE</b></p>
            <p className="grand"><span>Total</span><b>KES {total}</b></p>
          </div>
          <Button variant="yellow" disabled={items.length === 0 || processing} onClick={handlePay}>
            {stage === 'paying' ? 'Sending STK Push...' : stage === 'polling' ? 'Waiting for payment...' : `Pay KES ${total}`}
          </Button>
          {(stage === 'paying' || stage === 'polling') && (
            <div className="waiting">
              <span className="spinner" />
              <p>{stage === 'paying' ? 'Sending STK push to your phone...' : 'Waiting for you to enter M-Pesa PIN...'}</p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}