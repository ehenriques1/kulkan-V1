"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { Header } from "@/components/header"
import { FadeIn } from "@/components/transitions"
import Image from "next/image"

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

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus()
  }, [currentStep, messages.length])

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
    setMessages((prev) => [...prev, { role: "user", content: userResponse }])
    setAnswers((prev) => [...prev, userResponse])
    try {
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

  // Only show the current step's block (AI message + input or answer)
  const currentMessage = messages[messages.length - 1]
  const previousUserMessage = messages[messages.length - 2]

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: '#f7f8fa' }}>
      <div className="w-full">
        <Header />
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl px-4 md:px-8">
          <div className="pt-8 pb-2">
            <div className="w-full h-2 bg-[#d3d5db] rounded-full mb-2">
              <div
                className="h-2 bg-[#ebfc72] rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStep + 1) / 14) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1 ml-1">
              {currentStep + 1} of 14
            </div>
          </div>

          <div className="flex flex-col space-y-6 py-6 md:py-10">
            <AnimatePresence mode="wait" initial={false}>
              <FadeIn key={currentStep} duration={0.5}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {/* AI message with logo */}
                  {currentMessage && currentMessage.role === "assistant" && (
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-shrink-0">
                        <Image src="/images/kulkan-icon.jpeg" alt="Kulkan Logo" width={40} height={40} className="rounded-md" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-lg md:text-xl text-gray-800 mb-1">Hello, I'm Kulkan Ai.</div>
                        <div className="text-gray-700 text-base md:text-lg mb-4" style={{ lineHeight: 1.5 }}>
                          I am here to help you find out if your idea / Business / Service or Product must be built, pivoted or killed. Let's get started.
                        </div>
                        {/* Question, separated for clarity */}
                        <div className="font-semibold text-gray-800 text-base md:text-lg mt-4 mb-2">
                          {currentMessage.content}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* User answer (after submit) */}
                  {previousUserMessage && previousUserMessage.role === "user" && (
                    <div className="mb-4 text-right text-gray-700">
                      <ReactMarkdown>{previousUserMessage.content}</ReactMarkdown>
                    </div>
                  )}
                  {/* Text input (only if waiting for user) */}
                  {(!isLoading && (!previousUserMessage || currentMessage?.role === "assistant")) && (
                    <form onSubmit={handleSubmit}>
                      <textarea
                        ref={textareaRef}
                        value={userResponse}
                        onChange={(e) => setUserResponse(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        className="w-full bg-transparent focus:outline-none text-lg md:text-xl text-gray-800 placeholder-gray-400 resize-none overflow-hidden border-0 border-b-2 border-[#ebfc72] focus:border-[#ebfc72] transition-colors"
                        placeholder="Type your answer here..."
                        rows={1}
                        style={{ minHeight: '40px', height: 'auto' }}
                      />
                    </form>
                  )}
                </motion.div>
              </FadeIn>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
