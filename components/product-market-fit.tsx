"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { InfoModal } from "@/components/ui/info-modal"
import { LeftSidebar } from "@/components/left-sidebar"
import Link from "next/link"
import { useClientMount } from "@/hooks/use-client-mount"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export function ProductMarketFitPage() {
  const isMounted = useClientMount()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isReportExpanded, setIsReportExpanded] = useState(false)
  const [isFollowUpExpanded, setIsFollowUpExpanded] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Count user messages for follow-up questions counter
  const followUpCount = messages.filter((m) => m.sender === "user").length

  // About this report content
  const aboutReportContent = (
    <div className="space-y-4">
      <div className="flex items-start">
        <div className="w-10 h-10 bg-[#ebfc72] rounded-md flex-shrink-0 mr-3"></div>
        <div className="flex-1">
          <p className="text-sm">
            The Product Market Fit (PMF) analysis evaluates how well your product or service meets the needs of your
            target market. This report examines the alignment between your solution and customer problems, market
            demand, and competitive landscape.
          </p>
          <p className="text-sm mt-4">
            Achieving product-market fit is a critical milestone for any business. This analysis will help you
            understand if your current offering has achieved PMF or what adjustments might be needed to get there.
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-2">How to use this report:</h4>
        <ul className="text-sm space-y-2">
          <li className="flex items-start">
            <span className="text-[#ebfc72] font-bold mr-2">•</span>
            <span>Review the PMF score to understand your current position</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ebfc72] font-bold mr-2">•</span>
            <span>Expand the full report to see detailed analysis of each PMF component</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ebfc72] font-bold mr-2">•</span>
            <span>Use the follow-up area to ask questions about specific findings</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ebfc72] font-bold mr-2">•</span>
            <span>Run additional analyses (Market Fit, ICP) for a complete picture</span>
          </li>
        </ul>
      </div>
    </div>
  )

  // Sample report data
  const reportData = {
    date: "05/08/2025",
    version: "001",
    followUpQuestions: `${followUpCount} out of 10`,
    score: 6,
    maxScore: 10,
    conditional: "Conditional Go",
    businessSnapshot: {
      title: "PMF",
      description:
        "Based on your responses, Kulkan shows promising signs of product-market fit with some areas that need refinement. The analysis indicates strong problem-solution alignment but potential challenges in scaling and monetization.",
    },
    recommendation: {
      summary:
        "Your product shows a 'Conditional Go' status with a PMF score of 6/10. This indicates that while there is good alignment between your solution and market needs, some adjustments are recommended before scaling.",
      details:
        "The strongest aspects of your PMF are the clear problem identification and the unique approach to solving it. Customer feedback indicates strong interest in the core value proposition.\n\nHowever, there are concerns about the current pricing model and the scalability of the solution for larger enterprises. We recommend focusing on these areas before significant expansion.",
    },
    sections: [
      {
        title: "Problem-Solution Fit",
        content:
          "Score: 8/10\n\nStrengths:\n• The problem of business idea validation is well-defined and widespread\n• Your solution addresses a clear pain point experienced by early-stage founders\n• Initial user feedback confirms the problem is worth solving\n\nAreas for Improvement:\n• The solution could be more comprehensive in addressing all aspects of validation\n• Some users may need more guidance on how to interpret and act on the results\n• Consider expanding the solution to cover post-validation steps",
      },
      {
        title: "Market Demand",
        content:
          "Score: 7/10\n\nStrengths:\n• Growing market of new startups and entrepreneurs seeking validation tools\n• Increasing awareness of the importance of validation before significant investment\n• Willingness to pay for tools that reduce startup failure risk\n\nAreas for Improvement:\n• Market education is still needed on the value of AI-driven validation\n• Seasonal fluctuations in startup formation may affect demand\n• Geographic variations in entrepreneurial ecosystems require targeted approaches",
      },
      {
        title: "Competitive Advantage",
        content:
          "Score: 6/10\n\nStrengths:\n• Proprietary AI algorithms provide unique insights not available from competitors\n• Speed of analysis is superior to traditional consulting approaches\n• Integration of multiple validation frameworks creates comprehensive results\n\nAreas for Improvement:\n• Some competitors offer more established brand recognition\n• Potential for larger players to enter the market with significant resources\n• Need for continuous innovation to maintain technological advantage",
      },
      {
        title: "Business Model Viability",
        content:
          "Score: 5/10\n\nStrengths:\n• Freemium model allows for wide top-of-funnel acquisition\n• Subscription approach provides recurring revenue potential\n• Low marginal cost for serving additional customers\n\nAreas for Improvement:\n• Conversion rates from free to paid need optimization\n• Current pricing may be too low for long-term sustainability\n• Customer acquisition costs could increase as market matures",
      },
      {
        title: "Growth Potential",
        content:
          "Score: 4/10\n\nStrengths:\n• Strong potential for word-of-mouth growth in startup communities\n• Opportunity for expansion into adjacent services (fundraising, team building)\n• International scalability with minimal localization required\n\nAreas for Improvement:\n• Customer retention beyond initial validation needs strengthening\n• Limited upsell and cross-sell opportunities in current model\n• Dependency on startup ecosystem health poses some risk",
      },
    ],
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thank you for your question about Product Market Fit. Your current PMF score is 6/10, indicating a 'Conditional Go' status. Your strongest area is Problem-Solution Fit (8/10), while Growth Potential (4/10) needs the most improvement. Would you like me to suggest specific strategies to improve your PMF score?",
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])

      // Scroll to bottom of messages
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleReportExpansion = () => {
    setIsReportExpanded(!isReportExpanded)
  }

  const toggleFollowUpExpansion = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setIsFollowUpExpanded(!isFollowUpExpanded)

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 500) // Match this with the CSS transition duration
  }

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // If not mounted yet, show a simple loading state
  if (!isMounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#ebfc72] border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Loading product market fit analysis...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Left sidebar */}
      <LeftSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* No header */}

        <div className="flex-1 flex overflow-hidden">
          {/* Report content */}
          <div
            className="flex-1 overflow-auto p-4 transition-all duration-500 ease-in-out"
            style={{
              flexGrow: isFollowUpExpanded ? 1 : 5, // More dramatic growth when sidebar is collapsed
            }}
          >
            <div className="max-w-4xl mx-auto">
              {/* Header tabs */}
              <div className="flex mb-4 text-sm">
                <button className="bg-[#ebfc72] text-black px-3 py-1 rounded-md mr-2">Idea 1</button>
                <Link href="/" className="px-3 py-1 rounded-md mr-2 bg-[#f0f0f0] text-black hover:bg-gray-200">
                  Idea Vs. Market (Feasibility study)
                </Link>
                <Link
                  href="/ideal-customer-profile"
                  className="px-3 py-1 rounded-md mr-2 bg-[#f0f0f0] text-black hover:bg-gray-200"
                >
                  Ideal Customer Profile (ICP)
                </Link>
                <Link href="/product-market-fit" className="px-3 py-1 rounded-md bg-[#ebfc72] text-black">
                  Product Market Fit (PMF)
                </Link>
              </div>

              {/* Business Snapshot with info icon next to title */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold">{reportData.businessSnapshot.title}</h1>
                    <div className="ml-2">
                      <InfoModal title="About this Report">{aboutReportContent}</InfoModal>
                    </div>
                  </div>
                  <button
                    onClick={toggleReportExpansion}
                    className="flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {isReportExpanded ? (
                      <>
                        <span className="mr-1">Collapse Report</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span className="mr-1">Expand to read Full Report</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  Date: {reportData.date} | Version: {reportData.version} | Follow up Questions: {followUpCount} out of
                  10
                </div>

                {/* PMF Score Visualization */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Product Market Fit Score</h2>
                    <div className="flex items-center">
                      <div className="bg-[#ebfc72] px-4 py-2 rounded-md">
                        <span className="font-bold">{reportData.conditional}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall PMF Score</span>
                      <span className="text-sm font-bold">
                        {reportData.score}/{reportData.maxScore}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#ebfc72] h-2.5 rounded-full"
                        style={{ width: `${(reportData.score / reportData.maxScore) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Problem-Solution Fit</span>
                        <span className="text-sm font-medium">8/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#ebfc72] h-2 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Market Demand</span>
                        <span className="text-sm font-medium">7/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#ebfc72] h-2 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Competitive Advantage</span>
                        <span className="text-sm font-medium">6/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#ebfc72] h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Business Model Viability</span>
                        <span className="text-sm font-medium">5/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#ebfc72] h-2 rounded-full" style={{ width: "50%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Growth Potential</span>
                        <span className="text-sm font-medium">4/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#ff6b6b] h-2 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Next buttons */}
                <div className="flex mb-6">
                  <div className="bg-[#ebfc72] px-6 py-3 rounded-md mr-4">
                    <span className="font-bold">STATUS // {reportData.conditional}</span>
                  </div>
                  <Link href="/" className="bg-white border border-gray-200 px-6 py-3 rounded-md hover:bg-gray-50">
                    NEXT: Run new analysis
                  </Link>
                </div>
              </div>

              {/* PMF recommendation - always visible */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <p className="mb-4">{reportData.recommendation.summary}</p>
                <p className="whitespace-pre-line truncate-3">{reportData.recommendation.details}</p>
              </div>

              {/* Expanded report content */}
              {isReportExpanded && (
                <>
                  {/* Report sections */}
                  {reportData.sections.map((section, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6 mb-6">
                      <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                      <p className="whitespace-pre-line truncate-4">{section.content}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Collapsed follow-up toggle button (visible when collapsed) */}
          {!isFollowUpExpanded && (
            <div
              className="w-12 bg-white border-l border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all duration-500 ease-in-out shadow-md"
              onClick={toggleFollowUpExpansion}
            >
              <div className="rotate-90 transform origin-center whitespace-nowrap text-xs text-gray-500 mb-2">
                Follow up area
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 animate-pulse" />
            </div>
          )}

          {/* Right sidebar for chat/questions */}
          <div
            ref={drawerRef}
            className={`bg-white border-l border-gray-200 flex flex-col transition-all duration-500 ease-in-out transform ${
              isFollowUpExpanded ? "translate-x-0 opacity-100 w-80" : "translate-x-full opacity-0 w-0 overflow-hidden"
            }`}
            style={{
              willChange: "transform, opacity, width",
              transitionProperty: "transform, opacity, width",
            }}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold">
                Follow up area <span className="text-sm font-normal text-gray-500">({followUpCount} of 10)</span>
              </h3>
              <button
                onClick={toggleFollowUpExpansion}
                className="text-gray-400 hover:text-gray-600 transition-transform duration-300 ease-in-out transform hover:scale-110"
                aria-label="Collapse follow-up area"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-auto p-4">
              <div className="mb-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-3 w-10 h-10 bg-[#ebfc72] rounded-md flex items-center justify-center overflow-hidden">
                    <div className="w-7 h-7 overflow-hidden">
                      <Image
                        src="/images/kulkan-logo.svg"
                        alt="Kulkan Logo"
                        width={30}
                        height={10}
                        className="object-contain object-left"
                      />
                    </div>
                  </div>
                  <p className="text-sm">What are the key factors affecting your Product Market Fit score?</p>
                </div>

                <div className="flex items-start justify-end">
                  <p className="text-sm bg-gray-100 p-2 rounded-md max-w-[80%]">
                    I'm concerned about our business model viability and growth potential scores. What can we do to
                    improve these areas?
                  </p>
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0 ml-3 overflow-hidden">
                    <Image src="/diverse-user-avatars.png" alt="User" width={32} height={32} />
                  </div>
                </div>
              </div>

              {messages.length > 0 && (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "assistant" && (
                        <div className="flex-shrink-0 mr-3 w-10 h-10 bg-[#ebfc72] rounded-md flex items-center justify-center overflow-hidden">
                          <div className="w-7 h-7 overflow-hidden">
                            <Image
                              src="/images/kulkan-logo.svg"
                              alt="Kulkan Logo"
                              width={30}
                              height={10}
                              className="object-contain object-left"
                            />
                          </div>
                        </div>
                      )}

                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-gray-100 text-black"
                            : "bg-white border border-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-sm truncate-3">{message.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>

                      {message.sender === "user" && (
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0 ml-3 overflow-hidden">
                          <Image src="/diverse-user-avatars.png" alt="User" width={32} height={32} />
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your follow up"
                  className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-kulkan-yellow"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-[#ebfc72] text-black py-2 px-4 rounded-r-md hover:bg-opacity-90"
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
