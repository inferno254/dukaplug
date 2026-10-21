import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const userId = authHeader?.replace('Bearer ', '');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('rider_tracking')
    .select(`
      *,
      orders!inner(user_id, status, total, delivery_location)
    `)
    .eq('orders.user_id', userId)
    .in('orders.status', ['accepted', 'preparing', 'on_the_way'])
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}