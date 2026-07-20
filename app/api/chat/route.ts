import { NextRequest, NextResponse } from 'next/server';
import brainFile from '@/lib/brain.json';

const SYSTEM_PROMPT = `You are the AI assistant for Imperial Care Internal Medicine, a primary care practice led by Dr. Sumbul Islam, MD, serving adults in Anna, TX and Sherman, TX.

YOUR ROLE:
- Answer questions about the practice, services, locations, hours, and staff
- Help patients understand what services are offered
- Guide patients on how to schedule appointments
- Provide general information about Semaglutide and B12 injections (NOT medical advice)

CRITICAL RULES:
1. NEVER provide medical advice, diagnosis, or treatment recommendations
2. ALWAYS direct medical questions to: "Please call us at (903) 957-0417 or schedule an appointment with Dr. Islam for personalized medical advice."
3. For emergencies, ALWAYS say: "If this is a medical emergency, please call 911 immediately."
4. Keep responses friendly, professional, and under 150 words
5. Use ONLY the clinic data provided — do not make up information
6. If you don't know something, say: "I'd recommend calling us at (903) 957-0417 for the most up-to-date information."
7. Protect patient privacy — remind users not to share personal health information (PHI) in chat
8. Do not discuss pricing or insurance specifics — direct to phone call
9. Be empathetic but maintain professional boundaries

CLINIC DATA:`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] } = body;

    // Validate
    if (!message || typeof message !== 'string' || message.length > 500) {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    // Sanitize
    const sanitizedMessage = message.replace(/[<>]/g, '').trim();

    // Check if GROK_API_KEY is configured
    const apiKey = process.env.GROK_API_KEY;
    if (!apiKey || apiKey === 'your_grok_api_key_here') {
      // Intelligent fallback answer based on brain.json if API key is not yet set
      const lower = sanitizedMessage.toLowerCase();
      let fallbackReply = "Thank you for reaching out to Imperial Care Internal Medicine! We serve patients in Anna, TX (450 N Standridge Blvd #104) and Sherman, TX (1700 N Travis St). For appointments or inquiries, please call us at (903) 957-0417.";

      if (lower.includes("hour") || lower.includes("open") || lower.includes("time")) {
        fallbackReply = "Our clinic hours are Monday through Thursday from 8:00 AM to 5:00 PM. Fridays are reserved for telephone appointments upon request. We are closed Saturday & Sunday. Please call (903) 957-0417 to schedule!";
      } else if (lower.includes("weight") || lower.includes("semaglutide") || lower.includes("diet")) {
        fallbackReply = "We offer a physician-supervised Semaglutide Weight Loss Program! It is a 1x weekly subcutaneous injection designed to promote fat burning, lower A1C, and reduce BMI. Call us at (903) 957-0417 to schedule a consultation with Dr. Islam.";
      } else if (lower.includes("b12") || lower.includes("vitamin") || lower.includes("energy") || lower.includes("fatigue")) {
        fallbackReply = "We provide Vitamin B12 vitality injections to boost energy, red blood cell formation, and support brain/bone health. Perfect for older adults, Metformin users, and those with chronic fatigue. Call (903) 957-0417 to book!";
      } else if (lower.includes("location") || lower.includes("anna") || lower.includes("sherman") || lower.includes("address")) {
        fallbackReply = "We have two convenient locations: Anna Clinic in Collin County (450 N Standridge Blvd, Suite 104, Anna, TX 75409) and Sherman Clinic in Grayson County (1700 N Travis St, Sherman, TX 75092). Call (903) 957-0417 for directions or appointments.";
      } else if (lower.includes("emergency") || lower.includes("pain") || lower.includes("chest") || lower.includes("911")) {
        fallbackReply = "If this is a medical emergency, please call 911 immediately. For non-emergency care, please call our office at (903) 957-0417.";
      }

      return NextResponse.json({ reply: fallbackReply });
    }

    // Build messages
    const messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT + '\n\n' + JSON.stringify(brainFile, null, 2)
      },
      ...history.slice(-10).map((h: any) => ({
        role: h.role === 'user' ? 'user' : 'assistant',
        content: h.content
      })),
      { role: 'user', content: sanitizedMessage }
    ];

    // Call Grok API
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'grok-2',
        messages,
        max_tokens: 300,
        temperature: 0.3,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      throw new Error(`Grok API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 
      "I'm sorry, I couldn't process that. Please call us at (903) 957-0417.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        reply: "I'm sorry, I'm having trouble right now. Please call us at (903) 957-0417 for assistance." 
      },
      { status: 500 }
    );
  }
}
