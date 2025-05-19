import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { feasibilityPrompt } from '@/prompts/feasibility';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { profile } = await req.json();

  if (!profile || typeof profile !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid profile data' }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      temperature: 0.3,
      messages: [
        { role: 'system', content: feasibilityPrompt },
        { role: 'user', content: profile },
      ],
    });

    const answer = response.choices[0]?.message?.content || 'No output from feasibility assistant.';
    return NextResponse.json({ result: answer });
  } catch (error: any) {
    console.error('Feasibility API Error:', error);
    return NextResponse.json({ error: 'Feasibility analysis failed.', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
} 