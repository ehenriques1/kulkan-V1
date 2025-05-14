import { mockQuestions, mockResponses } from "@/lib/mock-openai-responses"

// Types for our AI service
export type ValidationQuestion = {
  id: number
  text: string
  isOptional?: boolean
}

export type ValidationResponse = {
  id: string
  content: string
  role: "assistant" | "user"
}

export type AnalysisResult = {
  marketFit: {
    score: number
    analysis: string
    conditional: string
  }
  idealCustomer: {
    score: number
    analysis: string
  }
  productMarketFit: {
    score: number
    analysis: string
    conditional: string
  }
}

// This is a mock implementation that would be replaced with actual OpenAI API calls
export class AIValidationService {
  private static instance: AIValidationService
  private userResponses: Map<number, string> = new Map()

  private constructor() {}

  public static getInstance(): AIValidationService {
    if (!AIValidationService.instance) {
      AIValidationService.instance = new AIValidationService()
    }
    return AIValidationService.instance
  }

  // Get all validation questions
  public getQuestions(): ValidationQuestion[] {
    return mockQuestions.map((text, index) => ({
      id: index,
      text,
      isOptional: index === 1, // Make the second question optional as per the design
    }))
  }

  // Get a specific question
  public getQuestion(id: number): ValidationQuestion | null {
    if (id < 0 || id >= mockQuestions.length) return null

    return {
      id,
      text: mockQuestions[id],
      isOptional: id === 1, // Make the second question optional as per the design
    }
  }

  // Save a user response to a question
  public saveResponse(questionId: number, response: string): void {
    this.userResponses.set(questionId, response)
  }

  // Get the greeting message
  public getGreeting(): string {
    return mockResponses.greeting
  }

  // Get the follow-up message
  public getFollowUp(): string {
    return mockResponses.followUp
  }

  // Get the completion message
  public getCompletion(): string {
    return mockResponses.completion
  }

  // Generate analysis based on user responses
  public async generateAnalysis(): Promise<AnalysisResult> {
    // In a real implementation, this would send the user responses to an AI model
    // and get back a detailed analysis

    // For now, we'll return a mock analysis
    return {
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
  }

  // Get all user responses
  public getAllResponses(): Map<number, string> {
    return new Map(this.userResponses)
  }

  // Clear all user responses
  public clearResponses(): void {
    this.userResponses.clear()
  }
}

// Export a singleton instance
export const aiService = AIValidationService.getInstance()
