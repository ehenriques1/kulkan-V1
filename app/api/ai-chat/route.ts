// app/api/ai-chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { onboardingPrompt, onboardingQuestions } from "@/app/prompts/onboarding";

// Initialize OpenAI SDK
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  console.log("🔥 /api/ai-chat called");

  try {
    const { message, step } = await req.json();
    console.log("🧾 Message:", message);
    console.log("🔢 Step:", step);

    // Tech vertical validation (simple heuristic)
    const nonTechKeywords = [
      "restaurant", "retail", "fashion", "food", "construction", "manufacturing", "real estate", "agriculture", "logistics", "transport", "travel", "hotel", "hospitality"
    ];
    if (nonTechKeywords.some((kw) => message?.toLowerCase().includes(kw))) {
      return NextResponse.json({
        reply:
          "Thanks for your interest! Kulkan currently focuses on tech startups only. We're working hard to expand into more industries soon. In the meantime, you can email us at sales@kulkan.co and one of our advisors will follow up with personalized help."
      });
    }

    // If first message is blank or #start, send welcome and Q1
    if (!message?.trim() || message.trim() === "#start" || step === 0) {
      return NextResponse.json({
        reply:
          "Hi! I'm Kulkan — your strategic co-pilot for validating startup ideas. I'll ask a few quick questions to build your company profile.  \n**What's the name of your startup?**"
      });
    }

    // If step is within question range, send next question
    if (step < onboardingQuestions.length) {
      return NextResponse.json({
        reply: onboardingQuestions[step]
      });
    }

    // If all questions answered, thank the user
    if (step >= onboardingQuestions.length) {
      return NextResponse.json({
        reply: "Thank you for completing the onboarding! Our team will review your answers and follow up soon."
      });
    }
  } catch (error: any) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: 'API call failed', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
