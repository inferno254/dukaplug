import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { Body } = body;
    const { stkCallback } = Body;

    if (!stkCallback) {
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
    }

    const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = stkCallback;
    const metadata = CallbackMetadata?.Item || [];
    const amount = metadata.find((item: { Name: string; Value: string | number }) => item.Name === 'Amount')?.Value;
    const mpesaReceiptNumber = metadata.find((item: { Name: string; Value: string | number }) => item.Name === 'MpesaReceiptNumber')?.Value;
    const phoneNumber = metadata.find((item: { Name: string; Value: string | number }) => item.Name === 'PhoneNumber')?.Value;
    const transactionDate = metadata.find((item: { Name: string; Value: string | number }) => item.Name === 'TransactionDate')?.Value;

    // Store payment transaction in database
    await supabaseAdmin.from('payment_transactions').insert({
      checkout_request_id: CheckoutRequestID,
      mpesa_receipt_number: mpesaReceiptNumber ? String(mpesaReceiptNumber) : null,
      amount: amount ? Number(amount) : null,
      phone_number: phoneNumber ? String(phoneNumber) : null,
      status: ResultCode === 0 ? 'success' : 'failed',
      result_code: String(ResultCode),
      result_desc: ResultDesc,
    });

    // Update order status if order exists
    if (CheckoutRequestID) {
      const { data: existingOrder } = await supabaseAdmin
        .from('orders')
        .select('id')
        .eq('mpesa_receipt', CheckoutRequestID)
        .maybeSingle();

      if (existingOrder) {
        await supabaseAdmin
          .from('orders')
          .update({
            status: ResultCode === 0 ? 'accepted' : 'cancelled',
            mpesa_receipt: mpesaReceiptNumber ? String(mpesaReceiptNumber) : null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingOrder.id);
      }
    }

    // Log to database (structured, no sensitive data)
    console.log('M-Pesa callback processed', {
      checkoutRequestId: CheckoutRequestID,
      success: ResultCode === 0,
    });

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  }
}