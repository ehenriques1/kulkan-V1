"use client"

import { useAppContext } from "@/context/app-context"
import { motion } from "framer-motion"
import Image from "next/image"

export function WelcomeModalDialog() {
  const { setCurrentStep } = useAppContext()

  const handleStart = () => {
    setCurrentStep("chat")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 relative">
            <Image src="/images/kulkan-icon.jpeg" alt="Kulkan Logo" width={100} height={100} className="rounded-lg" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Welcome! Let's get you validated</h2>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#ebfc72] w-12 h-12 rounded-lg flex-shrink-0"></div>
            <div>
              <p>
                We've put together <strong>11 quick questions</strong> to help us understand your company, idea,
                service, or product.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-[#ebfc72] w-12 h-12 rounded-lg flex-shrink-0"></div>
            <div>
              <p>
                With the help of Kulkan, we'll guide you through each step — all we ask is that you be as detailed as
                possible.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-[#ebfc72] w-12 h-12 rounded-lg flex-shrink-0"></div>
            <div>
              <p>
                <strong>Very important!</strong> - The more insight you give, the deeper and more accurate our analysis
                will be. Ready to roll?
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-[#333333] text-white py-3 rounded-md hover:bg-black transition-colors"
        >
          Let's roll
        </button>
      </motion.div>
    </div>
  )
}
