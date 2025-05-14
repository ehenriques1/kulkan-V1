"use client"

import { Menu } from "lucide-react"
import { useMobileNav } from "@/hooks/use-mobile-nav"

export function MobileNavToggle() {
  const { toggleMobileNav } = useMobileNav()

  // Brand color
  const brandColor = "#ebfc72"

  return (
    <button
      onClick={toggleMobileNav}
      className="p-1 rounded-md hover:bg-[#444444] transition-colors"
      aria-label="Toggle navigation menu"
    >
      <Menu className="h-5 w-5" style={{ color: brandColor }} />
    </button>
  )
}
