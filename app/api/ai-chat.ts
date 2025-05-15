import type { NextApiRequest, NextApiResponse } from 'next';

// Import OpenAI SDK (or use fetch if not installed)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Always use Step1-Onboarding assistant for all steps
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID_STEP1_ONBOARDING;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, step } = req.body;
  const assistantId = ASSISTANT_ID;

  if (!OPENAI_API_KEY || !assistantId) {
    return res.status(500).json({ error: 'Missing OpenAI API key or assistant ID' });
  }

  // Compose the OpenAI API call (using fetch for portability)
  try {
    const openaiRes = await fetch('https://api.openai.com/v1/assistants/' + assistantId + '/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }],
      }),
    });
    const data = await openaiRes.json();
    if (!openaiRes.ok) {
      return res.status(500).json({ error: data.error || 'OpenAI API error' });
    }
    // Return the assistant's reply
    return res.status(200).json({ reply: data.choices?.[0]?.message?.content || data });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to contact OpenAI API', details: error });
  }
} 