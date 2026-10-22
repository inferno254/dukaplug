import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const userId = authHeader?.replace('Bearer ', '');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get latest active order (pending, confirmed, preparing, on_the_way)
  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .select(`
      id,
      status,
      created_at,
      user_id
    `)
    .eq('user_id', userId)
    .in('status', ['pending', 'confirmed', 'preparing', 'on_the_way'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!order) {
    return NextResponse.json(null);
  }

  // Fetch or mock tracking info
  const { data: tracking } = await supabaseAdmin
    .from('rider_tracking')
    .select('*')
    .eq('order_id', order.id)
    .maybeSingle();

  if (tracking) {
    return NextResponse.json(tracking);
  }

  // Fallback mock active order tracking if no specific rider assigned yet
  return NextResponse.json({
    id: `track_${order.id}`,
    order_id: order.id,
    rider_name: 'John M.',
    rider_phone: '0712345678',
    rider_rating: 4.9,
    current_lat: -1.286389,
    current_lng: 36.817223,
    eta_minutes: 20,
    status: order.status || 'preparing',
    created_at: order.created_at,
    updated_at: new Date().toISOString(),
  });
}
