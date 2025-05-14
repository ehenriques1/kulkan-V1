import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/context/app-context"
import { BucketProvider } from "@/context/bucket-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kulkan AI",
  description: "Validation Assistant MVP",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BucketProvider>
          <AppProvider>{children}</AppProvider>
        </BucketProvider>
      </body>
    </html>
  )
}
