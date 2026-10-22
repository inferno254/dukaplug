import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(request: NextRequest) {
  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: 'GROQ_API_KEY not configured' }, { status: 500 });
  }

  const { message, context } = await request.json();

  const systemPrompt = `You are DukaPlug Assistant, a helpful shopping assistant for a Kenyan food, grocery, and household delivery app. 
The user is on a site that delivers from local vendors in Kitui County, Kenya.
Current location: ${context?.location || 'Top Notch, Kitui'}.
Current cart: ${context?.cartCount || 0} items.
Be concise, friendly, and helpful. Suggest products, answer questions about delivery, and help users find what they need.`;

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || 'Sorry, I could not process that.';

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}