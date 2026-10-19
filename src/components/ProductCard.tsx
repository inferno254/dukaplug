'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

interface ProductCardProps {
  item: {
    name: string;
    desc: string;
    price: number;
    image: string;
  };
  onAdd: () => void;
  quantity?: number;
}

export default function ProductCard({ item, onAdd, quantity = 0 }: ProductCardProps) {
  return (
    <article className="product-card">
      <img src={item.image} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        <b>KES {item.price}</b>
      </div>
      {quantity > 0 ? (
        <div className="stepper">
          <button><Icon name="minus" size={16} /></button>
          <span>{quantity}</span>
          <button onClick={onAdd}><Icon name="plus" size={16} /></button>
        </div>
      ) : (
        <button className="add-button" onClick={onAdd}>
          <Icon name="plus" />
        </button>
      )}
    </article>
  );
}