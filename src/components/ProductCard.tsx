'use client';

import { useCartContext } from '@/context/CartContext';

interface ProductCardProps {
  item: {
    id?: string;
    name: string;
    desc?: string;
    price: number;
    image: string;
  };
  onAdd: () => void;
}

export default function ProductCard({ item, onAdd }: ProductCardProps) {
  const { items, updateQuantity } = useCartContext();
  const existing = items.find((i) => i.product.id === item.id || i.product.name === item.name);
  const quantity = existing?.quantity ?? 0;

  return (
    <article className="product-card">
      <img src={item.image} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        {item.desc && <p>{item.desc}</p>}
        <b>KES {item.price}</b>
      </div>
      {quantity > 0 ? (
        <div className="stepper">
          <button
            aria-label="Decrease"
            onClick={() => updateQuantity(item as any, quantity - 1)}
          >
            −
          </button>
          <span>{quantity}</span>
          <button onClick={onAdd}>+</button>
        </div>
      ) : (
        <button className="add-button" onClick={onAdd}>
          +
        </button>
      )}
    </article>
  );
}