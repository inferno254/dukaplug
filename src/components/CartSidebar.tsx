'use client';

import { useAppContext } from '@/context/AppContext';
import { useCartContext } from '@/context/CartContext';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { usePathname, useRouter } from 'next/navigation';

export default function CartSidebar() {
  const { 
    items, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart 
  } = useCartContext();
  
  const { 
    selectedDeliveryFee, 
    deliveryZoneName,
    go 
  } = useAppContext();
  
  const pathname = usePathname();
  const router = useRouter();
  
  const isOpen = pathname.includes('/checkout') || 
                 pathname === '/cart' ||
                 (typeof window !== 'undefined' && 
                  localStorage.getItem('cart-open') === 'true');
  
  const handleOpenCart = () => {
    localStorage.setItem('cart-open', 'true');
    router.push('/cart');
  };

  const handleCloseCart = () => {
    localStorage.setItem('cart-open', 'false');
    if (pathname.includes('/cart')) {
      router.push('/');
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = selectedDeliveryFee;
  const total = subtotal + deliveryFee;

  return (
    <aside 
      className={`cart-drawer ${isOpen ? 'open' : ''}`}
      onClick={handleCloseCart}
    >
      <div className="cart-drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>Your Order</h2>
          <button className="close-btn" onClick={handleCloseCart}>
            <Icon name="chevron" size={24} />
          </button>
        </div>
        
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              {items.map((item, index) => (
                <div key={index} className="cart-item">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.product.name}</h3>
                    <p className="cart-item-price">KES {item.product.price}</p>
                    <div className="cart-item-controls">
                      <button 
                        onClick={() => updateQuantity(item.product, Math.max(1, item.quantity - 1))}
                        className="qty-btn"
                      >
                        <Icon name="minus" size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product, item.quantity + 1)}
                        className="qty-btn"
                      >
                        <Icon name="plus" size={16} />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.product)}
                    className="remove-item"
                  >
                    <Icon name="check" size={16} />
                  </button>
                </div>
              ))}
              
              <div className="cart-divider" />
              
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>KES {subtotal}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="summary-row">
                    <span>Delivery</span>
                    <span>KES {deliveryFee}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total</span>
                  <span>KES {total}</span>
                </div>
              </div>
              
              <div className="cart-actions">
                <Button 
                  variant="yellow" 
                  onClick={handleOpenCart}
                  className="w-full"
                >
                  View Cart
                </Button>
                {totalItems > 0 && (
                  <Button 
                    variant="yellow" 
                    onClick={() => go('checkout')}
                    className="w-full mt-2"
                  >
                    Proceed to Checkout
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}