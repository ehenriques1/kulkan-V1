"use client"

import { AppProvider, useAppContext } from "@/context/app-context"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"
import { QuestionInterface } from "@/components/question-interface"
import { UserInfoForm } from "@/components/user-info-form"
import { ReportPage } from "@/components/report-page"
import { Layout } from "@/components/layout"

function LoginContent() {
  const { currentStep } = useAppContext()

  if (currentStep === "welcome" || !currentStep) {
    return <LoginForm />
  }

  return (
    <Layout>
      {currentStep === "dashboard" && <Dashboard />}
      {currentStep === "chat" && <QuestionInterface />}
      {currentStep === "user-info" && <UserInfoForm />}
      {currentStep === "report" && <ReportPage />}
    </Layout>
  )
}

export default function LoginPage() {
  return (
    <AppProvider>
      <LoginContent />
    </AppProvider>
  )
}
