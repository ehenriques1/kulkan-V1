"use client"

import { ProductMarketFitPage } from "@/components/product-market-fit"
import { AppProvider } from "@/context/app-context"

export default function ProductMarketFit() {
  return (
    <AppProvider>
      <ProductMarketFitPage />
    </AppProvider>
  )
}
