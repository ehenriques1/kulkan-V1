"use client"

import { useAppContext } from "@/context/app-context"
import { FadeIn } from "./transitions"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Header } from "@/components/header"

export function WelcomeModal() {
  const { setCurrentStep, skipToReportPage } = useAppContext()

  // Function to directly go to report page
  const goToReportPage = () => {
    setCurrentStep("report")
  }

  return (
    <FadeIn>
      <div className="flex flex-col h-screen">
        <Header title="Welcome Screen" />
        
        <div className="flex-1 bg-[#f5f5f5] flex items-center justify-center p-4">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-[640px] w-full">
            <div className="flex justify-center mb-8">
              <div className="relative w-72 h-24">
                <Image
                  src="/images/kulkan-logo-full.png"
                  alt="Kulkan Logo"
                  width={288}
                  height={93}
                  className="object-contain"
                />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Welcome! Validate your idea today.</h2>

            <div className="space-y-8 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-kulkan-lightgray w-10 h-10 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="text-base md:text-lg">
                    We've put together 12 quick questions to help us understand your company, idea, service, or product.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-kulkan-darkgray w-10 h-10 rounded-md flex-shrink-0"></div>
                <div>
                  <p className="text-base md:text-lg">
                    We'll guide you through each step — all we ask is that you be as detailed as possible.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-400 w-10 h-10 rounded-md flex-shrink-0"></div>
                <div className="text-base md:text-lg">
                  <p className="font-bold">Very important!</p>
                  <p className="italic">The more insight you give, the deeper and more accurate our analysis will be.</p>
                  <p>Ready to roll?</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                className="w-full bg-black hover:bg-opacity-90 text-white text-lg py-6"
                onClick={() => setCurrentStep("user-info")}
              >
                Let's roll
              </Button>

              <Button
                className="w-full bg-kulkan-yellow hover:bg-opacity-90 text-black text-lg py-6"
                onClick={skipToReportPage}
              >
                Skip to Report Page (Demo)
              </Button>

              <Button
                className="w-full bg-green-500 hover:bg-opacity-90 text-white text-lg py-6"
                onClick={goToReportPage}
              >
                Direct to Report (No Setup)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
