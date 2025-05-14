"use client"

import { useState, useEffect } from "react"

export function useMobileNav() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on a mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Close mobile nav when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMobileNavOpen && !target.closest("[data-mobile-nav]")) {
        setIsMobileNavOpen(false)
      }
    }

    if (isMobile && isMobileNavOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isMobile, isMobileNavOpen])

  return {
    isMobile,
    isOpen: isMobileNavOpen,
    setIsOpen: setIsMobileNavOpen,
    toggleMobileNav: () => setIsMobileNavOpen((prev) => !prev),
  }
}
