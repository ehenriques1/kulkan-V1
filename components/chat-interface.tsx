// force redeploy - test change
"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"

// Helper to call the AI API route
async function fetchAIReply(message: string, step: number) {
  const res = await fetch("/api/ai-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, step }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "AI error")
  return data.reply
}

export function ChatInterface() {
  const [messages, setMessages] = useState<{ role: "assistant" | "user"; content: string }[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [userResponse, setUserResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [answers, setAnswers] = useState<string[]>([])

  // On mount, get the welcome message from the AI
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const reply = await fetchAIReply("", 0)
        setMessages([{ role: "assistant", content: reply }])
      } catch (e) {
        setMessages([{ role: "assistant", content: "Sorry, failed to load welcome message." }])
      }
      setIsLoading(false)
    })()
  }, [])

  // Focus input when question changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [currentStep, messages.length])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [userResponse])

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!userResponse.trim()) return
    setIsLoading(true)
    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userResponse }])
    setAnswers((prev) => [...prev, userResponse])
    try {
      // Get next question from AI
      const reply = await fetchAIReply(userResponse, currentStep + 1)
      setMessages((prev) => [...prev, { role: "assistant", content: reply }])
      setCurrentStep((prev) => prev + 1)
      setUserResponse("")
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, failed to get next question." }])
    }
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-black">
      {/* Header - full width, always at the top */}
      <div className="w-full">
        <Header />
      </div>
      {/* Main content - full width grey background */}
      <div className="flex-1 w-full bg-[#f5f5f5] flex flex-col items-center">
        <div className="w-full max-w-4xl">
          {/* Progress bar */}
          <div className="p-4 md:p-6 flex flex-col items-start">
            <div className="w-full h-2 bg-[#6b6b6b] rounded-full mb-2">
              <div
                className="h-2 bg-[#ebfc72] rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStep + 1) / 5) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1 ml-1">
              {currentStep + 1} of 5
            </div>
          </div>
          {/* Chat messages */}
          <div className="flex flex-col justify-start items-center px-4 mt-8">
            <div className="w-full max-w-2xl">
              {messages.map((msg, idx) => (
                <div key={idx} className={`mb-4 ${msg.role === "assistant" ? "text-left" : "text-right"}`}>
                  <div className={msg.role === "assistant" ? "text-black font-medium text-xl md:text-2xl" : "text-gray-700"}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {/* User input */}
              <form onSubmit={handleSubmit} className="ml-0">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
