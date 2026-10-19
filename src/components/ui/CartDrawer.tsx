'use client';

import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatKES } from '@/lib/utils';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  selectedDeliveryFee: number;
  deliveryZoneName: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  selectedDeliveryFee,
  deliveryZoneName,
}: CartDrawerProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hostelRoom, setHostelRoom] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  const subtotal = items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const grandTotal = subtotal > 0 ? subtotal + selectedDeliveryFee : 0;

  const handleMpesaPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !hostelRoom) return;

    setIsPaying(true);
    // Simulate Daraja STK Push prompt experience
    setTimeout(() => {
      setIsPaying(false);
      setPaySuccess(true);
      setTimeout(() => {
        onClearCart();
        setPaySuccess(false);
        onClose();
      }, 3500);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0E150D] border-l border-[#1E2B1A] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#1E2B1A] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#4CA82E]/20 text-[#4CA82E]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-[#F6F4EC]">Your Duka Bag</h2>
                <p className="text-xs text-[#8A9C86]">
                  {items.length} {items.length === 1 ? 'item' : 'items'} • Delivering to {deliveryZoneName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {paySuccess ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#4CA82E]/20 text-[#4CA82E] flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-[#F6F4EC]">M-Pesa STK Prompt Sent!</h3>
                <p className="text-sm text-neutral-300 max-w-xs">
                  Check your phone <span className="font-bold text-[#FFC400]">{phoneNumber}</span> and enter your M-Pesa PIN for {formatKES(grandTotal)}.
                </p>
                <div className="p-4 rounded-xl bg-[#142012] border border-[#2F7A1F]/40 text-xs text-[#A8BEA3] space-y-1">
                  <p>📍 Delivering to: <strong className="text-white">{hostelRoom}</strong></p>
                  <p>⚡ Dispatch rider assigned in {deliveryZoneName}</p>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-neutral-600 stroke-[1.5]" />
                <p className="text-base font-bold text-neutral-300">Your bag is empty!</p>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Add sizzling Kuku Fry, fresh Sukuma Wiki from Rongai, or campus essentials to get started.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-[#131C11] border border-[#1E2B1A]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-900"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-neutral-100 truncate">{item.product.name}</h4>
                    <p className="text-xs text-[#FFC400] font-semibold">{formatKES(item.product.price)}</p>
                    {item.product.cookTimeMinutes && (
                      <span className="text-[10px] text-emerald-400 font-medium">
                        ⏱ {item.product.cookTimeMinutes} mins prep
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="w-7 h-7 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-xs font-bold hover:bg-white/10"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="w-7 h-7 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-xs font-bold hover:bg-white/10"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-neutral-500 hover:text-red-400 p-1 ml-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Form */}
          {items.length > 0 && !paySuccess && (
            <div className="p-6 border-t border-[#1E2B1A] bg-[#0B0F0A] space-y-4">
              <div className="space-y-1.5 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{formatKES(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery ({deliveryZoneName})</span>
                  <span className="font-bold text-[#FFC400]">{formatKES(selectedDeliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-[#1E2B1A]">
                  <span>Total Amount</span>
                  <span className="text-[#4CA82E]">{formatKES(grandTotal)}</span>
                </div>
              </div>

              <form onSubmit={handleMpesaPay} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Hostel / Room / Delivery Point
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MMU Hall 3, Room 24B or Rongai Plaza"
                    value={hostelRoom}
                    onChange={(e) => setHostelRoom(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#131C11] border border-[#1E2B1A] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#4CA82E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    M-Pesa Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="07XX XXX XXX or 01XX XXX XXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#131C11] border border-[#1E2B1A] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#4CA82E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPaying}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2F7A1F] via-[#4CA82E] to-[#FFC400] text-black font-black text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-[0_0_20px_rgba(76,168,46,0.3)] disabled:opacity-50"
                >
                  {isPaying ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Triggering Daraja M-Pesa STK...
                    </span>
                  ) : (
                    <>
                      <span>Lipa na M-Pesa ({formatKES(grandTotal)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4CA82E]" />
                  Secure instant campus settlement • Powered by DukaPlug
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

