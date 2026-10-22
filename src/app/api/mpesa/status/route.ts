import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const checkoutRequestId = searchParams.get('checkoutRequestId');

  if (!checkoutRequestId) {
    return NextResponse.json({ error: 'checkoutRequestId required' }, { status: 400 });
  }

  try {
    // Check payment_transactions table for the status
    const { data: payment, error } = await supabaseAdmin
      .from('payment_transactions')
      .select('*, orders(id)')
      .eq('checkout_request_id', checkoutRequestId)
      .maybeSingle();

    if (error) throw error;

    if (!payment) {
      return NextResponse.json({ status: 'pending' });
    }

    if (payment.status === 'success') {
      return NextResponse.json({
        status: 'success',
        orderId: payment.orders?.id,
        mpesaReceipt: payment.mpesa_receipt_number,
      });
    }

    if (payment.status === 'failed' || payment.status === 'cancelled') {
      return NextResponse.json({ status: 'failed', message: payment.result_desc });
    }

    return NextResponse.json({ status: 'pending' });
  } catch (err) {
    console.error('Status check error:', err);
    return NextResponse.json({ status: 'pending' });
  }
}