'use client';

interface FoodGlyphProps {
  type: string;
}

export default function FoodGlyph({ type }: FoodGlyphProps) {
  const labels: Record<string, string> = {
    burger: "BGR", drumstick: "CHK", pizza: "PZA", chapati: "LOCAL", bottle: "DRK", gift: "SNK",
    tomato: "TOM", onion: "ONI", greens: "SUK", potato: "POT", avocado: "AVO", banana: "BAN",
    milk: "MILK", eggs: "EGG", sugar: "SUGAR", flour: "UNGA", rice: "RICE", oil: "OIL",
    bread: "BREAD", tissue: "TISS", soap: "SOAP", flame: "GAS", basket: "SHOP",
  };
  
  return <span className={`food-glyph glyph-${type}`}>{labels[type]}</span>;
}