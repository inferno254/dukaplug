-- Seed data for development

-- Insert vendors
INSERT INTO vendors (id, name, phone, email, location, is_verified, rating) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Mama Njeri''s Kitchen', '+254712345678', 'mama@njeris.com', 'Kitui', true, 4.9),
  ('22222222-2222-2222-2222-222222222222', 'Fresh Basket Kitui', '+254722345678', 'fresh@basket.com', 'Kitui', true, 4.8),
  ('33333333-3333-3333-3333-333333333333', 'The Daily Feast', '+254732345678', 'daily@feast.com', 'Kitui', true, 4.7),
  ('44444444-4444-4444-4444-444444444444', 'Duka Essentials', '+254742345678', 'essentials@duka.com', 'Kitui', true, 4.6)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  location = EXCLUDED.location,
  is_verified = EXCLUDED.is_verified,
  rating = EXCLUDED.rating;

-- Insert products for Mama Njeri's Kitchen (food)
INSERT INTO products (id, vendor_id, name, description, price, category, image_url, is_available) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Loaded nyama choma bowl', 'Charred beef, kachumbari, sukuma wiki and ugali with our house pili pili.', 680, 'food', 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200', true),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Mama''s kuku special', 'Quarter chicken, chips, slaw & house sauce', 590, 'food', 'https://images.unsplash.com/photo-1700966358519-9944f220e554?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'Chapati wrap', 'Soft chapati, spiced beef and fresh salsa', 360, 'food', 'https://images.unsplash.com/photo-1763951719372-966cd0b75672?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true)
ON CONFLICT (id) DO UPDATE SET
  vendor_id = EXCLUDED.vendor_id,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  is_available = EXCLUDED.is_available;

-- Insert products for Fresh Basket Rongai (groceries)
INSERT INTO products (id, vendor_id, name, description, price, category, image_url, is_available) VALUES
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'Tomatoes', 'Fresh ripe tomatoes per kg', 100, 'groceries', 'https://images.unsplash.com/photo-1589824491095-8af9ma5ec5c5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', 'Red onions', 'Fresh red onions per kg', 120, 'groceries', 'https://images.unsplash.com/photo-1683368982314-66b024dfe43d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222', 'Sukuma wiki', 'Fresh sukuma wiki per bunch', 30, 'groceries', 'https://images.unsplash.com/photo-1777353245982-c34b21fc5175?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true),
  ('11111111-2222-3333-4444-555555555555', '22222222-2222-2222-2222-222222222222', 'Potatoes', 'Fresh potatoes per kg', 120, 'groceries', 'https://images.unsplash.com/photo-1614213567040-66a96d804c5a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true),
  ('22222222-3333-4444-5555-666666666666', '22222222-2222-2222-2222-222222222222', 'Avocados', 'Fresh ripe avocados each', 30, 'groceries', 'https://images.unsplash.com/photo-1618842081054-86e86137613f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true),
  ('33333333-4444-5555-6666-777777777777', '22222222-2222-2222-2222-222222222222', 'Bananas', 'Fresh bananas per kg', 150, 'groceries', 'https://images.unsplash.com/photo-1526677818696-ee5b6d616546?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true),
  ('44444444-5555-6666-7777-888888888888', '22222222-2222-2222-2222-222222222222', 'Milk', 'Fresh milk 500ml', 65, 'groceries', 'https://images.unsplash.com/photo-1582984103225-99c4e2bb5155?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true),
  ('55555555-6666-7777-8888-999999999999', '22222222-2222-2222-2222-222222222222', 'Eggs', 'Fresh eggs per tray', 450, 'groceries', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true)
ON CONFLICT (id) DO UPDATE SET
  vendor_id = EXCLUDED.vendor_id,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  is_available = EXCLUDED.is_available;

-- Insert products for Duka Essentials (shopping)
INSERT INTO products (id, vendor_id, name, description, price, category, image_url, is_available) VALUES
  ('66666666-7777-8888-9999-000000000000', '44444444-4444-4444-4444-444444444444', 'Sugar 1kg', 'White sugar 1kg packet', 180, 'shopping', 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true),
  ('77777777-8888-9999-0000-111111111111', '44444444-4444-4444-4444-444444444444', 'Unga 2kg', 'Maize flour 2kg', 220, 'shopping', 'https://images.unsplash.com/photo-1683355739329-cea18ba93f02?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true),
  ('88888888-9999-0000-1111-222222222222', '44444444-4444-4444-4444-444444444444', 'Cooking oil 1L', 'Vegetable cooking oil 1L', 280, 'shopping', 'https://images.unsplash.com/photo-1777353245982-c34b21fc5175?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900', true)
ON CONFLICT (id) DO UPDATE SET
  vendor_id = EXCLUDED.vendor_id,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  is_available = EXCLUDED.is_available;