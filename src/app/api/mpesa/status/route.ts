import { NextRequest, NextResponse } from 'next/server';

const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE || '174379';
const MPESA_PASSKEY = process.env.MPESA_PASSKEY;
const MPESA_ENV = process.env.MPESA_ENV || 'sandbox';
const MPESA_BASE_URL = MPESA_ENV === 'production' 
  ? 'https://api.safaricom.co.ke' 
  : 'https://sandbox.safaricom.co.ke';

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
  const response = await fetch(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    method: 'GET',
    headers: { 'Authorization': `Basic ${auth}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error_message || 'Failed to get access token');
  return data.access_token;
}

function generateTimestamp(): string {
  const now = new Date();
  return (
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0') +
    String(now.getHours()).padStart(2, '0') +
    String(now.getMinutes()).padStart(2, '0') +
    String(now.getSeconds()).padStart(2, '0')
  );
}

function generatePassword(timestamp: string): string {
  const str = `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`;
  return Buffer.from(str).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const { checkoutRequestId } = await request.json();

    if (!checkoutRequestId) {
      return NextResponse.json({ error: 'CheckoutRequestID is required' }, { status: 400 });
    }

    const timestamp = generateTimestamp();
    const password = generatePassword(timestamp);
    const accessToken = await getAccessToken();

    const queryPayload = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    };

    const response = await fetch(`${MPESA_BASE_URL}/mpesa/stkpushquery/v1/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.errorMessage || 'Query failed' }, { status: 500 });
    }

    return NextResponse.json({
      ResultCode: data.ResultCode,
      ResultDesc: data.ResultDesc,
      CheckoutRequestID: data.CheckoutRequestID,
      MerchantRequestID: data.MerchantRequestID,
    });
  } catch (error) {
    console.error('M-Pesa status query error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}