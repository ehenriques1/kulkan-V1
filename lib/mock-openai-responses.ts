// Mock OpenAI responses for development and testing

export const sampleAnalysis = {
  marketFit: {
    score: 6.5,
    analysis:
      "Your idea shows potential in the current market landscape, but there are some areas that need refinement.",
    conditional: "Conditional Go",
  },
  idealCustomer: {
    score: 3,
    analysis: "We've identified several customer segments that would benefit from your solution.",
  },
  productMarketFit: {
    score: 6,
    analysis: "Your product has a reasonable fit with the market, but some adjustments could improve adoption.",
    conditional: "Conditional Go",
  },
}

export const mockQuestions = [
  "What is the name of your business?",
  "Do you have a website **you can share**?",
  "Tell me about your business idea in a few sentences.",
  "Who is your target customer?",
  "What problem does your product or service solve?",
  "Who are your main competitors?",
  "What makes your solution unique?",
  "How do you plan to make money?",
  "What is your go-to-market strategy?",
  "What resources do you need to get started?",
  "What are the biggest risks to your business?",
  "What milestones have you achieved so far?",
]

export const mockResponses = {
  greeting:
    "Hello, I'm Kulkan AI. I am here to help you find out if your idea / Business / Service or Product must be built, pivoted or killed. Let's get started.",
  followUp: "Thanks for sharing that. Let's dig a bit deeper.",
  completion:
    "Thank you for answering all my questions. I'm now analyzing your responses to provide you with a comprehensive validation report. This will take just a moment...",
}

// Sample user responses for testing
export const sampleUserResponses = [
  "Kulkan AI",
  "Not yet, we're in the early stages.",
  "Kulkan is an AI-powered validation assistant for entrepreneurs to test their business ideas quickly and affordably.",
  "Early-stage founders who need to validate their business ideas before investing significant time and resources.",
  "The high failure rate of startups due to lack of proper validation before building products.",
  "Traditional consultants, market research firms, and DIY validation methods.",
  "Our AI-driven approach provides faster, more affordable, and more comprehensive validation than alternatives.",
  "Freemium model with basic validation free and premium features for paying subscribers.",
  "Direct to founder marketing through startup communities, accelerators, and content marketing.",
  "AI expertise, validation frameworks, and startup ecosystem connections.",
  "Market adoption and building trust in AI-generated validation insights.",
  "Built MVP, conducted user interviews with 50+ founders, and secured initial seed funding.",
]
