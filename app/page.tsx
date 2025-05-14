"use client"

import { AppProvider, useAppContext } from "@/context/app-context"
import { WelcomeModal } from "@/components/welcome-modal"
import { UserInfoForm } from "@/components/user-info-form"
import { QuestionInterface } from "@/components/question-interface"
import { Dashboard } from "@/components/dashboard"
import { ReportPage } from "@/components/report-page"
import { Layout } from "@/components/layout"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

function AppContent() {
  const { currentStep, skipToReportPage } = useAppContext()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if there's a 'page' parameter set to 'report'
    const page = searchParams?.get("page")
    if (page === "report") {
      skipToReportPage()
    }
  }, [searchParams, skipToReportPage])

  // Use the Layout component for all steps except welcome
  if (currentStep === "welcome") {
    return <WelcomeModal />
  }

  return (
    <Layout
      title={
        currentStep === "user-info"
          ? "User Information"
          : currentStep === "chat"
            ? "Chat"
            : currentStep === "dashboard"
              ? "Dashboard"
              : currentStep === "report"
                ? "Report"
                : undefined
      }
      showSearch={currentStep === "dashboard" || currentStep === "report"}
    >
      {currentStep === "user-info" && <UserInfoForm />}
      {currentStep === "chat" && <QuestionInterface />}
      {currentStep === "dashboard" && <Dashboard />}
      {currentStep === "report" && <ReportPage />}
    </Layout>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
