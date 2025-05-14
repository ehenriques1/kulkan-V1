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

export function IdealCustomerProfilePage() {
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
            The Ideal Customer Profile (ICP) analysis helps you identify and understand your most valuable potential
            customers. This report examines demographic, psychographic, and behavioral characteristics to create a
            detailed profile of who would benefit most from your solution.
          </p>
          <p className="text-sm mt-4">
            Understanding your ideal customer is crucial for effective marketing, product development, and overall
            business strategy. This analysis will help you focus your resources on the customers who are most likely to
            convert and remain loyal.
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-2">How to use this report:</h4>
        <ul className="text-sm space-y-2">
          <li className="flex items-start">
            <span className="text-[#ebfc72] font-bold mr-2">•</span>
            <span>Review the customer segments to understand your target audience</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ebfc72] font-bold mr-2">•</span>
            <span>Expand the full report to see detailed analysis of each customer type</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ebfc72] font-bold mr-2">•</span>
            <span>Use the follow-up area to ask questions about specific findings</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ebfc72] font-bold mr-2">•</span>
            <span>Run additional analyses (Market Fit, PMF) for a complete picture</span>
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
    score: 3,
    maxScore: 5,
    businessSnapshot: {
      title: "ICP",
      description:
        "Based on your responses, we've identified three primary customer segments for Kulkan. The analysis shows strong potential in the early-stage startup founder segment, with secondary opportunities in small business owners and corporate innovation teams.",
    },
    recommendation: {
      summary:
        "Your ideal customer is an early-stage startup founder (pre-seed to seed) who is technically savvy but lacks formal business validation experience. They value data-driven decisions and are willing to invest in tools that increase their chances of success.",
      details:
        "This customer segment has the highest pain point alignment with your solution, the greatest willingness to pay, and represents a growing market segment. They are typically 25-40 years old, have previous technical or product experience, and are building their first or second venture.\n\nThey are active on platforms like Twitter, LinkedIn, and startup communities such as Y Combinator's forum, Product Hunt, and Indie Hackers. They consume content related to lean startup methodology, product-market fit, and fundraising strategies.",
    },
    sections: [
      {
        title: "Primary Segment: Early-Stage Startup Founders",
        content:
          "Demographics:\n• Age: 25-40\n• Education: Bachelor's degree or higher, often in technical fields\n• Income: Varies widely, often bootstrapping or recently funded\n• Location: Tech hubs and increasingly distributed globally\n\nPsychographics:\n• Values data-driven decision making\n• Fears wasting time and money on unvalidated ideas\n• Seeks efficiency and speed in the validation process\n• Highly motivated to succeed and avoid startup failure\n\nBehavioral Patterns:\n• Researches extensively before making decisions\n• Active in startup communities and forums\n• Willing to pay for tools that provide clear ROI\n• Makes decisions quickly when value is demonstrated",
      },
      {
        title: "Secondary Segment: Small Business Owners",
        content:
          "Demographics:\n• Age: 35-55\n• Education: Varied backgrounds\n• Income: Established business with some revenue\n• Location: Distributed across urban and suburban areas\n\nPsychographics:\n• More risk-averse than startup founders\n• Values stability and proven methods\n• Concerned about competition and market changes\n• Seeks to innovate within established business models\n\nBehavioral Patterns:\n• Longer decision-making cycles\n• Price sensitive but will invest in proven solutions\n• Relies on peer recommendations and case studies\n• Less technically savvy, values simplicity and guidance",
      },
      {
        title: "Tertiary Segment: Corporate Innovation Teams",
        content:
          "Demographics:\n• Age: 30-50\n• Education: Advanced degrees common\n• Income: Salaried professionals with dedicated budgets\n• Location: Major metropolitan areas\n\nPsychographics:\n• Balances innovation with corporate constraints\n• Values solutions that integrate with existing processes\n• Concerned with demonstrating ROI to leadership\n• Seeks to bring startup methodologies into corporate environment\n\nBehavioral Patterns:\n• Requires formal procurement processes\n• Longer sales cycles with multiple stakeholders\n• Higher average contract value potential\n• Needs enterprise features and security compliance",
      },
      {
        title: "Customer Acquisition Strategy",
        content:
          "Based on the identified customer segments, we recommend the following acquisition strategies:\n\n1. Content Marketing: Create targeted content addressing the specific validation challenges faced by early-stage founders\n\n2. Community Engagement: Establish presence in startup communities where your primary segment is active\n\n3. Strategic Partnerships: Form alliances with accelerators, incubators, and startup studios\n\n4. Referral Program: Implement incentives for existing customers to refer others in their network\n\n5. Freemium Model: Offer a limited free version to capture leads and demonstrate value before conversion",
      },
      {
        title: "Customer Retention Strategy",
        content:
          "To maximize customer lifetime value, consider these retention strategies:\n\n1. Milestone Celebrations: Acknowledge and celebrate customer success milestones\n\n2. Educational Resources: Provide ongoing education about business validation beyond the initial analysis\n\n3. Community Building: Create an exclusive community for customers to share experiences and insights\n\n4. Feature Evolution: Continuously develop features that address evolving needs as customers grow\n\n5. Success Stories: Showcase how customers have successfully used insights from your platform to achieve business success",
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
          "Thank you for your question about the Ideal Customer Profile. Based on our analysis, your primary target should be early-stage startup founders who are technically savvy but lack formal business validation experience. Would you like me to elaborate on specific characteristics of this customer segment or discuss acquisition strategies?",
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
          <p className="text-gray-600">Loading customer profile...</p>
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
                <Link href="/ideal-customer-profile" className="px-3 py-1 rounded-md mr-2 bg-[#ebfc72] text-black">
                  Ideal Customer Profile (ICP)
                </Link>
                <Link
                  href="/product-market-fit"
                  className="px-3 py-1 rounded-md bg-[#f0f0f0] text-gray-500 hover:bg-gray-200"
                >
                  Product Market Fit (PMF) not run yet
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

                {/* Status and Score */}
                <div className="flex mb-6">
                  <div className="bg-[#ebfc72] px-6 py-3 rounded-md mr-4">
                    <span className="font-bold">
                      SCORE: {reportData.score} / {reportData.maxScore}
                    </span>
                  </div>
                  <Link
                    href="/product-market-fit"
                    className="bg-white border border-gray-200 px-6 py-3 rounded-md hover:bg-gray-50"
                  >
                    NEXT: Run my PMF
                  </Link>
                </div>
              </div>

              {/* Customer recommendation - always visible */}
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
                  <p className="text-sm">Who is your ideal customer and what are their key characteristics?</p>
                </div>

                <div className="flex items-start justify-end">
                  <p className="text-sm bg-gray-100 p-2 rounded-md max-w-[80%]">
                    Our ideal customers are early-stage startup founders who are technically skilled but need help with
                    business validation.
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
