"use client"

import type React from "react"

import { useState } from "react"
import { useAppContext } from "@/context/app-context"
import Image from "next/image"
import { motion } from "framer-motion"
import { Header } from "@/components/header"

export function LoginForm() {
  const { setUser, setCurrentStep } = useAppContext()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({ fullName: "", email: "" })

  const validateForm = () => {
    let isValid = true
    const newErrors = { fullName: "", email: "" }

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
      isValid = false
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setUser({ name: fullName, email })
      setCurrentStep("chat")
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <Header title="Welcome Screen 2" />

      {/* Main content */}
      <div className="flex-1 bg-[#f5f5f5] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 relative">
              <Image src="/images/kulkan-icon.jpeg" alt="Kulkan Logo" width={100} height={100} className="rounded-lg" />
            </div>
          </div>

          <h2 className="text-xl text-center mb-6">Enter you name and email before we start</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name here"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full p-2 border rounded-md ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Submit
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account? <button className="text-black font-medium hover:underline">Login</button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
