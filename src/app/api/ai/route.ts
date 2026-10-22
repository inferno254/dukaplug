import { NextRequest, NextResponse } from 'next/server';

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY || 'OIv0OboniqBPOsS13u8kWbICLa44FWSq';
const MISTRAL_URL = 'https://api.mistral.ai/v1/chat/completions';

export async function POST(request: NextRequest) {
  if (!MISTRAL_API_KEY) {
    return NextResponse.json({ error: 'MISTRAL_API_KEY not configured' }, { status: 500 });
  }

  const { message, context } = await request.json();

  const systemPrompt = `You are DukaPlug Assistant, a helpful shopping assistant for a Kenyan food, grocery, and household delivery app. 
The user is on a site that delivers from local vendors in Kitui County, Kenya.
Current location: ${context?.location || 'Top Notch, Kitui'}.
Current cart: ${context?.cartCount || 0} items.
Be concise, friendly, and helpful. Suggest products, answer questions about delivery, and help users find what they need.`;

  try {
    const res = await fetch(MISTRAL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || `Mistral error: ${res.status}` }, { status: res.status });
    }
    
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      return NextResponse.json({ error: 'Empty response from AI', details: data }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'AI request failed' }, { status: 500 });
  }
}