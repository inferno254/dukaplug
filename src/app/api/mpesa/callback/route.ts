import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('M-Pesa Callback:', JSON.stringify(body, null, 2));

    const { Body } = body;
    const { stkCallback } = Body;

    if (!stkCallback) {
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
    }

    const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = stkCallback;

    if (ResultCode === 0) {
      const metadata = CallbackMetadata?.Item || [];
      const amount = metadata.find((item: { Name: string; Value: string | number }) => item.Name === 'Amount')?.Value;
      const mpesaReceiptNumber = metadata.find((item: { Name: string; Value: string | number }) => item.Name === 'MpesaReceiptNumber')?.Value;
      const phoneNumber = metadata.find((item: { Name: string; Value: string | number }) => item.Name === 'PhoneNumber')?.Value;
      const transactionDate = metadata.find((item: { Name: string; Value: string | number }) => item.Name === 'TransactionDate')?.Value;

      console.log('Payment successful:', {
        CheckoutRequestID,
        Amount: amount,
        MpesaReceiptNumber: mpesaReceiptNumber,
        PhoneNumber: phoneNumber,
        TransactionDate: transactionDate,
      });

      // TODO: Update order status in database (Supabase)
      // await updateOrderStatus(CheckoutRequestID, 'paid', { mpesaReceiptNumber, amount, phoneNumber });
    } else {
      console.log('Payment failed:', { CheckoutRequestID, ResultCode, ResultDesc });
      // TODO: Update order status in database (Supabase)
      // await updateOrderStatus(CheckoutRequestID, 'failed', { ResultCode, ResultDesc });
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  }
}