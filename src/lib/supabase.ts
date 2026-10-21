import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Supabase environment variables not set. Supabase client will not work.');
  }
}

if (!supabaseServiceKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not set. Admin client will not work.');
  }
}

// Client-side Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Server-side Supabase client with service role key
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Database types
export type Profile = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
};

export type Vendor = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  location: string | null;
  is_verified: boolean;
  rating: number;
  created_at: string;
};

export type Product = {
  id: string;
  vendor_id: string | null;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
};

export type Order = {
  id: string;
  user_id: string | null;
  vendor_id: string | null;
  status: 'pending' | 'accepted' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  total: number;
  delivery_fee: number;
  delivery_address: string;
  delivery_location: string | null;
  payment_method: string;
  mpesa_receipt: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

export type CartItem = {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
};

export type PaymentTransaction = {
  id: string;
  order_id: string | null;
  checkout_request_id: string | null;
  merchant_request_id: string | null;
  mpesa_receipt_number: string | null;
  amount: number | null;
  phone_number: string | null;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  result_code: string | null;
  result_desc: string | null;
  created_at: string;
  updated_at: string;
};

export type RiderTracking = {
  id: string;
  order_id: string;
  rider_name: string | null;
  rider_phone: string | null;
  rider_rating: number | null;
  current_lat: number | null;
  current_lng: number | null;
  eta_minutes: number | null;
  status: string;
  created_at: string;
  updated_at: string;
};