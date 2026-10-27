import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const userId = authHeader?.replace('Bearer ', '');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('orders')
    .select(`
      id,
      status,
      total,
      delivery_fee,
      delivery_address,
      delivery_location,
      payment_method,
      mpesa_receipt,
      created_at,
      vendors (id, name, rating, location)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const userId = authHeader?.replace('Bearer ', '');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Ensure user profile exists before creating order
  const { data: existingProfile } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle();

  if (!existingProfile) {
    // Auto-create profile if missing
    await supabaseAdmin.from('profiles').insert({
      id: userId,
      name: 'Customer',
      email: null,
      phone: null,
      location: 'HQ · Kitui',
      location_detail: 'DukaPlug HQ, Top Notch, Kitui',
    });
  }

  const body = await request.json();
  const { items, vendorId, deliveryAddress, deliveryLocation, paymentMethod, phone, total } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Order must have items' }, { status: 400 });
  }

  // Create order
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({
      user_id: userId,
      vendor_id: vendorId,
      total,
      delivery_fee: 0,
      delivery_address: deliveryAddress,
      delivery_location: deliveryLocation,
      payment_method: paymentMethod || 'mpesa',
    })
    .select()
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  // Create order items
  const orderItems = items.map((item: any) => ({
    order_id: order.id,
    product_id: item.product.id,
    product_name: item.product.name,
    quantity: item.quantity,
    unit_price: item.product.price,
    total_price: item.product.price * item.quantity,
  }));

  const { error: itemsError } = await supabaseAdmin
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    await supabaseAdmin.from('orders').delete().eq('id', order.id);
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ id: order.id, ...order }, { status: 201 });
}