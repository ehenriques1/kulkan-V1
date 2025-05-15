// force redeploy - test change
"use client" // test change

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/context/app-context"
import { useBucketContext } from "@/context/bucket-context"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { aiService } from "@/lib/ai-service"

export function ChatInterface() {
  const {
    messages,
    addMessage,
    currentQuestion,
    setCurrentQuestion,
    isLoading,
    setIsLoading,
    setCurrentStep,
    setAnalysisResult,
  } = useAppContext()

  const { activeBucketId, saveBucketResponse } = useBucketContext()

  const [userResponse, setUserResponse] = useState("")
  const [showQuestion, setShowQuestion] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const questions = aiService.getQuestions()

  // Focus input when question changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [currentQuestion, showQuestion])

  // Initialize with greeting message
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        role: "assistant",
        content: aiService.getGreeting(),
      })
    }
  }, [messages.length, addMessage])

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [userResponse])

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!userResponse.trim()) return

    // Start transition animation
    setShowQuestion(false)
    setIsLoading(true)

    // Save the user's response to both the AI service and the active bucket
    aiService.saveResponse(currentQuestion, userResponse)

    if (activeBucketId) {
      saveBucketResponse(activeBucketId, currentQuestion, userResponse)
    }

    // Add user's response to messages
    addMessage({ role: "user", content: userResponse })

    // Wait for animation to complete
    setTimeout(async () => {
      // Move to next question or complete
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)

        // Add the next question as a message
        const nextQuestion = aiService.getQuestion(currentQuestion + 1)
        if (nextQuestion) {
          addMessage({
            role: "assistant",
            content: nextQuestion.text,
          })
        }

        setShowQuestion(true)
      } else {
        // This is the last question, show completion message
        addMessage({ role: "assistant", content: aiService.getCompletion() })

        // Generate analysis
        try {
          const analysis = await aiService.generateAnalysis()
          setAnalysisResult(analysis)

          // Navigate to dashboard after questions
          setTimeout(() => {
            setCurrentStep("dashboard")
          }, 2000)
        } catch (error) {
          console.error("Error generating analysis:", error)
          addMessage({
            role: "assistant",
            content: "I'm sorry, there was an error generating your analysis. Please try again later.",
          })
        }
      }

      setIsLoading(false)
      setUserResponse("") // Clear input after sending
    }, 500) // Match this with animation duration
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Format the question number and text
  const getFormattedQuestion = () => {
    const currentQuestionObj = aiService.getQuestion(currentQuestion)
    if (!currentQuestionObj) return { number: "", text: "", optional: false }

    return {
      number: `Q${currentQuestion + 1}//`,
      text: currentQuestionObj.text,
      optional: currentQuestionObj.isOptional || false,
    }
  }

  const { number, text, optional } = getFormattedQuestion()

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header - full width, always at the top */}
      <Header />

      {/* Main content - centered, responsive container */}
      <div className="flex-1 bg-[#f5f5f5] flex flex-col items-center">
        <div className="w-full max-w-4xl">
          {/* Progress bar */}
          <div className="p-4 md:p-6 flex flex-col items-start">
            <div className="w-full h-2 bg-[#6b6b6b] rounded-full mb-2">
              <div
                className="h-2 bg-[#ebfc72] rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1 ml-1">
              {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          {/* Question and input area - moved higher */}
          <div className="flex flex-col justify-start items-center px-4 mt-8">
            <div className="w-full max-w-2xl">
              <AnimatePresence mode="wait">
                {showQuestion && (
                  <motion.div
                    key={`question-${currentQuestion}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    <div className="flex items-start mb-4">
                      <div className="bg-[#ebfc72] w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-black font-bold">k</span>
                      </div>
                      <div>
                        <div className="font-medium mb-2 text-xl md:text-2xl">
                          <span className="mr-2">{number}</span>
                          <span className="truncate-2">{text}</span>
                        </div>
                        {optional && (
                          <div className="text-xs md:text-sm text-gray-500 truncate-1">
                            (This is optional - you can type "I don't know" or "skip" if you prefer)
                          </div>
                        )}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="ml-[44px] md:ml-[52px]">
                      <textarea
                        ref={textareaRef}
                        value={userResponse}
                        onChange={(e) => setUserResponse(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        className="w-full p-2 border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#ebfc72] resize-none overflow-hidden"
                        placeholder="Type your answer here..."
                        rows={1}
                        style={{ minHeight: '40px', height: 'auto' }}
                      />
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
