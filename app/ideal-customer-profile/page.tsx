"use client"

import { IdealCustomerProfilePage } from "@/components/ideal-customer-profile"
import { AppProvider } from "@/context/app-context"

export default function IdealCustomerProfile() {
  return (
    <AppProvider>
      <IdealCustomerProfilePage />
    </AppProvider>
  )
}
