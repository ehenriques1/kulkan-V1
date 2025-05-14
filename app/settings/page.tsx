"use client"

import { SettingsPage } from "@/components/settings-page"
import { AppProvider } from "@/context/app-context"

export default function Settings() {
  return (
    <AppProvider>
      <SettingsPage />
    </AppProvider>
  )
}
