import { NextRequest, NextResponse } from 'next/server';

const CEREBRAS_API_KEY = process.env.CEREBRAS_API_KEY || 'csk-965vecry4khrw8dyexrm3eep4knfmp892n8n6fc3kk5dr248';
const CEREBRAS_URL = 'https://api.cerebras.ai/v1/chat/completions';

export async function POST(request: NextRequest) {
  if (!CEREBRAS_API_KEY) {
    return NextResponse.json({ error: 'CEREBRAS_API_KEY not configured' }, { status: 500 });
  }

  const { message, context } = await request.json();

  const systemPrompt = `You are DukaPlug Assistant, a helpful shopping assistant for a Kenyan food, grocery, and household delivery app. 
The user is on a site that delivers from local vendors in Kitui County, Kenya.
Current location: ${context?.location || 'Top Notch, Kitui'}.
Current cart: ${context?.cartCount || 0} items.
Be concise, friendly, and helpful. Suggest products, answer questions about delivery, and help users find what they need.`;

  try {
    const res = await fetch(CEREBRAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CEREBRAS_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b',
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
      return NextResponse.json({ error: data.error?.message || `Cerebras error: ${res.status}` }, { status: res.status });
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