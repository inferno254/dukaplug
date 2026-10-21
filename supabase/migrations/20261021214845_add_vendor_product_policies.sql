-- Add RLS policies for public read access to vendors and products

ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view verified vendors" ON vendors FOR SELECT USING (is_verified = true);
CREATE POLICY "Public can view available products" ON products FOR SELECT USING (is_available = true);