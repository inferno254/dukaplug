import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('Fetching vendors...');
    const { data, error } = await supabaseAdmin
      .from('vendors')
      .select('*')
      .eq('is_verified', true)
      .order('rating', { ascending: false });

    if (error) {
      console.error('Supabase vendors error:', JSON.stringify(error, null, 2));
      return NextResponse.json({ error: error.message, code: error.code, details: error }, { status: 500 });
    }

    console.log('Vendors fetched:', data?.length || 0);
    return NextResponse.json(data || []);
  } catch (err) {
    console.error('Vendors API error:', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}