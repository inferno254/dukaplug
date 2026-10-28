import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('Fetching products...');
    const { data, error } = await supabaseAdmin
      .from('products')
      .select(`
        id,
        name,
        description,
        price,
        category,
        subcategory,
        image_url,
        is_available,
        vendors (id, name, rating, location)
      `)
      .eq('is_available', true)
      .order('created_at', { ascending: false });

    if (error) {
      // If subcategory column doesn't exist, retry without it
      if (error.code === '42703' || error.message?.includes('subcategory')) {
        console.log('Subcategory column not found, retrying without it...');
        const { data: fallbackData, error: fallbackError } = await supabaseAdmin
          .from('products')
          .select(`
            id,
            name,
            description,
            price,
            category,
            image_url,
            is_available,
            vendors (id, name, rating, location)
          `)
          .eq('is_available', true)
          .order('created_at', { ascending: false });
        
        if (fallbackError) {
          console.error('Supabase products error:', JSON.stringify(fallbackError, null, 2));
          return NextResponse.json({ error: fallbackError.message, code: fallbackError.code, details: fallbackError }, { status: 500 });
        }
        
        console.log('Products fetched (fallback):', fallbackData?.length || 0);
        return NextResponse.json(fallbackData || []);
      }
      
      console.error('Supabase products error:', JSON.stringify(error, null, 2));
      return NextResponse.json({ error: error.message, code: error.code, details: error }, { status: 500 });
    }

    console.log('Products fetched:', data?.length || 0);
    return NextResponse.json(data || []);
  } catch (err) {
    console.error('Products API error:', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}