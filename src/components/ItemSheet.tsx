'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

interface ItemSheetProps {
  close: () => void;
  add: () => void;
  product?: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
  };
}

export default function ItemSheet({ close, add, product }: ItemSheetProps) {
  const [quantity, setQuantity] = useState(1);

  const name = product?.name || 'Loaded nyama choma bowl';
  const desc = product?.description || 'Charred beef, kachumbari, sukuma wiki and ugali with our house pili pili.';
  const image = product?.image_url || 'https://images.unsplash.com/photo-1726177974666-88e937fa8e59?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200';
  const price = product?.price || 680;

  return (
    <div className="sheet-backdrop" onClick={close}>
      <section className="item-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="sheet-close" onClick={close}>×</button>
        <img src={image} alt={name} />
        <div className="sheet-content">
          <span className="kicker">MAMA'S FAVOURITE</span>
          <h2>{name}</h2>
          <p>{desc}</p>
          <h3>Choose your size <small>Required</small></h3>
          <div className="size-options">
            <label>
              <input
                type="radio"
                name="size"
                defaultChecked
              />
              Regular <b>KES {price}</b>
            </label>
            <label>
              <input type="radio" name="size" />
              Plug-size <b>+ KES 180</b>
            </label>
          </div>
          <h3>Add something extra</h3>
          <div className="checkbox-options">
            <label>
              <input type="checkbox" />
              Avocado <b>+ KES 80</b>
            </label>
            <label>
              <input type="checkbox" />
              Extra kachumbari <b>+ KES 50</b>
            </label>
          </div>
          <div className="sheet-footer">
            <div className="stepper">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Icon name="minus" />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>
                <Icon name="plus" />
              </button>
            </div>
            <Button variant="yellow" onClick={add}>
              Add to cart · KES {quantity * price}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}