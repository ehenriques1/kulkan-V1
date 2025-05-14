"use client"

import type { ReactNode } from "react"
import { useAppContext } from "@/context/app-context"
import { LeftSidebar } from "@/components/left-sidebar"
import { useMobileNav } from "@/hooks/use-mobile-nav"
import { TopNavbar } from "@/components/top-navbar"

interface LayoutProps {
  children: ReactNode
  title?: string
  showSearch?: boolean
}

export function Layout({ children, title, showSearch }: LayoutProps) {
  const { currentStep } = useAppContext()
  const { isMobile } = useMobileNav()

  // Only add the black bars for the user-info step
  const showBars = currentStep === "user-info"

  // For dashboard and report, we want a full-width layout
  const isFullWidth = currentStep === "dashboard" || currentStep === "report"

  // For mobile, we always want full width except for user-info
  const mobileFullWidth = isMobile && currentStep !== "user-info"

  if (showBars) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="h-14 bg-black w-full"></div>
        <main className="flex-grow">{children}</main>
        <div className="h-14 bg-black w-full"></div>
      </div>
    )
  }

  if (isFullWidth || mobileFullWidth) {
    return (
      <div className="flex flex-col h-screen">
        {/* Top navbar - full width */}
        <TopNavbar />

        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar - hidden on mobile, shown as drawer */}
          <LeftSidebar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
