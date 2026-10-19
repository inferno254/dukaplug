export const menuItems = [
  { name: "Loaded nyama choma bowl", desc: "Charred beef, kachumbari, greens & ugali", price: 680, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200" },
  { name: "Mama's kuku special", desc: "Quarter chicken, chips, slaw & house sauce", price: 590, image: "https://images.unsplash.com/photo-1781332150860-55b1eb6a38dd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900" },
  { name: "Chapati wrap", desc: "Soft chapati, spiced beef and fresh salsa", price: 360, image: "https://images.unsplash.com/photo-1763951719372-966cd0b75672?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900" },
  { name: "Fresh market combo", desc: "Tomatoes, avocado, sukuma and onions", price: 420, image: "https://images.unsplash.com/photo-1768119901638-75c6edd64c0b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200" },
];

export const groceryItems = [
  { name: "Fresh tomatoes", desc: "Ripe market tomatoes · sold by the kilo", price: 100, image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900" },
  { name: "Red onions", desc: "Fresh Kenyan onions · 1 kg pack", price: 120, image: "https://images.unsplash.com/photo-1683355739329-cea18ba93f02?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900" },
  { name: "Sukuma wiki bunch", desc: "Freshly picked leafy greens", price: 30, image: "https://images.unsplash.com/photo-1777353245982-c34b21fc5175?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900" },
  { name: "Market veg basket", desc: "Potatoes, avocado, onions and tomatoes", price: 480, image: "https://images.unsplash.com/photo-1597658939722-145d6439f1c5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900" },
];

export const shoppingItems = [
  { name: "White sugar · 1 kg", desc: "Everyday granulated white sugar", price: 180, image: "https://images.unsplash.com/photo-1634612831148-03a8550e1d52?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900" },
  { name: "Maize flour · 2 kg", desc: "Sifted unga for soft ugali", price: 170, image: "https://images.unsplash.com/photo-1772915516745-3da7cb6b7e52?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900" },
  { name: "Pishori rice · 1 kg", desc: "Aromatic Kenyan household staple", price: 220, image: "https://images.unsplash.com/photo-1704972269889-f0fdd7f0e7c3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900" },
  { name: "Cooking oil · 1 litre", desc: "Pure vegetable cooking oil", price: 340, image: "https://images.unsplash.com/photo-1552592074-ea7a91b851b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900" },
];

export const categoryGroups = {
  food: [
    ["Fast food", "burger", "From KES 250"], 
    ["Chicken", "drumstick", "From KES 350"],
    ["Pizza", "pizza", "From KES 650"], 
    ["Kenyan food", "chapati", "From KES 200"],
    ["Drinks", "bottle", "From KES 80"], 
    ["Cakes & snacks", "gift", "From KES 100"],
  ],
  groceries: [
    ["Tomatoes", "tomato", "KES 100 / kg"], 
    ["Red onions", "onion", "KES 120 / kg"],
    ["Sukuma wiki", "greens", "KES 30 / bunch"], 
    ["Potatoes", "potato", "KES 120 / kg"],
    ["Avocados", "avocado", "KES 30 each"], 
    ["Bananas", "banana", "KES 150 / kg"],
    ["Milk", "milk", "KES 65 / 500ml"], 
    ["Eggs", "eggs", "KES 450 / tray"],
  ],
  shopping: [
    ["Sugar", "sugar", "KES 180 / 1kg"], 
    ["Unga", "flour", "KES 170 / 2kg"],
    ["Rice", "rice", "KES 220 / 1kg"], 
    ["Cooking oil", "oil", "KES 340 / 1L"],
    ["Bread", "bread", "KES 65 / loaf"], 
    ["Tissue", "tissue", "KES 180 / 4 pack"],
    ["Bar soap", "soap", "KES 120 each"], 
    ["Gas refill", "flame", "KES 1,350 / 6kg"],
  ],
} as const;

export const categoryImages = {
  burger: "https://images.unsplash.com/photo-1576488446152-22e9a7ea2f1e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=300",
  drumstick: "https://images.unsplash.com/photo-1781332150860-55b1eb6a38dd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  pizza: "https://images.unsplash.com/photo-1662709627602-a6dbea256782?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=300",
  chapati: "https://images.unsplash.com/photo-1763951719372-966cd0b75672?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  bottle: "https://images.unsplash.com/photo-1643224149014-4d54eb49385d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=300",
  gift: "https://images.unsplash.com/photo-1628690570377-a8d5bd19768c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=300",
  tomato: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  onion: "https://images.unsplash.com/photo-1683355739329-cea18ba93f02?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  greens: "https://images.unsplash.com/photo-1777353245982-c34b21fc5175?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  avocado: "https://images.unsplash.com/photo-1597658939722-145d6439f1c5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  banana: "https://images.unsplash.com/photo-1617483557130-b2a6869275c0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  milk: "https://images.unsplash.com/photo-1550583724-b2692b85b150?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  eggs: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  sugar: "https://images.unsplash.com/photo-1634612831148-03a8550e1d52?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  flour: "https://images.unsplash.com/photo-1772915516745-3da7cb6b7e52?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  rice: "https://images.unsplash.com/photo-1704972269889-f0fdd7f0e7c3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  oil: "https://images.unsplash.com/photo-1552592074-ea7a91b851b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  tissue: "https://images.unsplash.com/photo-1584937247987-07276272d215?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  soap: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  flame: "https://images.unsplash.com/photo-1609795521515-e8f0bbfeace2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
} as const;

export const photos = {
  feast: "https://images.unsplash.com/photo-1738291422837-85761f82a10e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
  local: "https://images.unsplash.com/photo-1600891964092-4316c288032e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
  chicken: "https://images.unsplash.com/photo-1781332150860-55b1eb6a38dd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  chapati: "https://images.unsplash.com/photo-1763951719372-966cd0b75672?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  greens: "https://images.unsplash.com/photo-1446645681877-acde17e336a9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  market: "https://images.unsplash.com/photo-1768119901638-75c6edd64c0b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
  avocado: "https://images.unsplash.com/photo-1597658939722-145d6439f1c5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  spread: "https://images.unsplash.com/photo-1665400808116-f0e6339b7e9a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  shop: "https://images.unsplash.com/photo-1722639096482-4e1a805f9b0b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
  pantry: "https://images.unsplash.com/photo-1645355666875-4f675dacd648?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  shelves: "https://images.unsplash.com/photo-1738618141224-815f18b8e469?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  oil: "https://images.unsplash.com/photo-1545601445-4d6a0a0565f0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  tomato: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  onion: "https://images.unsplash.com/photo-1683355739329-cea18ba93f02?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  sukuma: "https://images.unsplash.com/photo-1777353245982-c34b21fc5175?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  sugar: "https://images.unsplash.com/photo-1634612831148-03a8550e1d52?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  unga: "https://images.unsplash.com/photo-1772915516745-3da7cb6b7e52?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  rice: "https://images.unsplash.com/photo-1704972269889-f0fdd7f0e7c3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
  cookingOil: "https://images.unsplash.com/photo-1552592074-ea7a91b851b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900",
};