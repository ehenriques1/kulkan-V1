"use client"

import { ProfilePage } from "@/components/profile-page"
import { AppProvider } from "@/context/app-context"

export default function Profile() {
  return (
    <AppProvider>
      <ProfilePage />
    </AppProvider>
  )
}
