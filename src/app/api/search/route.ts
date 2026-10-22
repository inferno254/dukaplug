import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('id, name, description, price, category, image_url, vendor:vendors(name, location)')
      .ilike('name', `%${q}%`)
      .eq('is_available', true)
      .limit(10);

    if (error) throw error;

    return NextResponse.json({ results: data || [] });
  } catch {
    return NextResponse.json({ results: [] });
  }
}