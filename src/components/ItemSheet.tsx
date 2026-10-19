'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { photos } from '@/data/products';

interface ItemSheetProps {
  close: () => void;
  add: () => void;
}

export default function ItemSheet({ close, add }: ItemSheetProps) {
  const [quantity, setQuantity] = useState(1);

  const handleSize = (size: string) => {
    // In a real app, this would update selected size
    console.log(`Selected size: ${size}`);
  };

  return (
    <div className="sheet-backdrop" onClick={close}>
      <section className="item-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="sheet-close" onClick={close}>×</button>
        <img src={photos.local} alt="Loaded nyama choma bowl" />
        <div className="sheet-content">
          <span className="kicker">MAMA'S FAVOURITE</span>
          <h2>Loaded nyama choma bowl</h2>
          <p>Charred beef, kachumbari, sukuma wiki and ugali with our house pili pili.</p>
          <h3>Choose your size <small>Required</small></h3>
          <div className="size-options">
            <label>
              <input 
                type="radio" 
                name="size" 
                defaultChecked 
                onChange={() => handleSize('Regular')}
              />
              Regular <b>KES 680</b>
            </label>
            <label>
              <input 
                type="radio" 
                name="size" 
                onChange={() => handleSize('Plug-size')}
              />
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
              Add to cart · KES {quantity * 680}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}