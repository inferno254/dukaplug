import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const { orderId, email } = await request.json();

  if (!orderId || !email) {
    return NextResponse.json({ error: 'orderId and email required' }, { status: 400 });
  }

  try {
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*, products(name, price)), payment_transactions(*)')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Generate HTML receipt
    const itemsHtml = order.order_items.map((item: any) =>
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #e5e5e5;">${item.products?.name || item.product_name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e5e5; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e5e5; text-align: right;">KES ${item.unit_price}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e5e5; text-align: right;">KES ${item.total_price}</td>
      </tr>`
    ).join('');

    const payment = order.payment_transactions?.[0];
    const receiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0b7a43; color: white; padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">DukaPlug</h1>
          <p style="margin: 8px 0 0; opacity: 0.9;">Your Receipt</p>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 16px 16px;">
          <div style="background: #f0f9f4; border: 1px solid #0b7a43; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0 0 8px; color: #0b7a43; font-size: 18px;">Payment Confirmed ✓</h2>
            <p style="margin: 0; color: #333;">Your M-Pesa payment has been processed successfully.</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <thead>
              <tr style="background: #f0f9f4;">
                <th style="padding: 12px 8px; text-align: left; border-bottom: 2px solid #0b7a43;">Item</th>
                <th style="padding: 12px 8px; text-align: center; border-bottom: 2px solid #0b7a43;">Qty</th>
                <th style="padding: 12px 8px; text-align: right; border-bottom: 2px solid #0b7a43;">Price</th>
                <th style="padding: 12px 8px; text-align: right; border-bottom: 2px solid #0b7a43;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div style="border-top: 2px solid #0b7a43; padding-top: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Subtotal</span>
              <span>KES ${order.total - (order.delivery_fee || 0) - (order.rider_tip || 0)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Delivery Fee</span>
              <span>KES ${order.delivery_fee || 0}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Rider Tip</span>
              <span>KES ${order.rider_tip || 0}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; color: #0b7a43;">
              <span>Total Paid</span>
              <span>KES ${order.total}</span>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
            <h3 style="margin: 0 0 12px; color: #333;">Order Details</h3>
            <p style="margin: 4px 0;"><strong>Order ID:</strong> ${order.id.slice(0, 8).toUpperCase()}</p>
            <p style="margin: 4px 0;"><strong>Date:</strong> ${new Date(order.created_at).toLocaleString()}</p>
            <p style="margin: 4px 0;"><strong>M-Pesa Receipt:</strong> ${payment?.mpesa_receipt_number || 'N/A'}</p>
            <p style="margin: 4px 0;"><strong>Delivery to:</strong> ${order.delivery_address}</p>
            <p style="margin: 4px 0;"><strong>Phone:</strong> ${payment?.phone_number || 'N/A'}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #f0f9f4; border-radius: 12px; text-align: center;">
            <p style="margin: 0 0 8px; color: #0b7a43; font-weight: 600;">Thank you for ordering with DukaPlug!</p>
            <p style="margin: 0; font-size: 14px; color: #666;">Track your order at <a href="https://dukaplug.vercel.app/tracking" style="color: #0b7a43;">dukaplug.vercel.app/tracking</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email sending via Resend (if configured) or fallback to logging
    const resendKey = process.env.RESEND_API_KEY;
    
    if (resendKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'DukaPlug <receipts@dukaplug.com>',
            to: email,
            subject: `Receipt for Order #${order.id.slice(0, 8).toUpperCase()} - DukaPlug`,
            html: receiptHtml,
          }),
        });

        if (resendResponse.ok) {
          return NextResponse.json({ success: true, message: 'Receipt sent via email' });
        } else {
          console.error('Resend API error:', await resendResponse.text());
        }
      } catch (emailError) {
        console.error('Email send error:', emailError);
      }
    }

    // Fallback: log receipt for development
    console.log('📧 RECEIPT EMAIL TO:', email);
    console.log('📧 RECEIPT HTML:', receiptHtml);
    
    return NextResponse.json({ success: true, message: 'Receipt generated (logged to console for demo)' });
  } catch (err) {
    console.error('Receipt generation error:', err);
    return NextResponse.json({ error: 'Failed to generate receipt' }, { status: 500 });
  }
}