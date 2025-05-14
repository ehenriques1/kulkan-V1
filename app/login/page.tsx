"use client"

import { LoginForm } from "@/components/login-form"
import { AppProvider } from "@/context/app-context"

export default function Login() {
  return (
    <AppProvider>
      <LoginForm />
    </AppProvider>
  )
}
