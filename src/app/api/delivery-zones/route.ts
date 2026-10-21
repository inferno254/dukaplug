import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  // Delivery zones stored in vendors table (location field)
  const { data, error } = await supabaseAdmin
    .from('vendors')
    .select('id, name, location, rating')
    .eq('is_verified', true)
    .order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map vendor locations to delivery zones
  const zones = (data || []).map((v) => ({
    id: v.id,
    name: v.location || v.name,
    detail: v.name,
  }));

  return NextResponse.json(zones);
}