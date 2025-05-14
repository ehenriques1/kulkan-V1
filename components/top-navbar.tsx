"use client"

import Image from "next/image"
import { MobileNavToggle } from "@/components/mobile-nav-toggle"
import { useMobileNav } from "@/hooks/use-mobile-nav"
import Link from "next/link"

interface TopNavbarProps {
  title?: string
  showSearch?: boolean
}

export function TopNavbar({ title, showSearch = false }: TopNavbarProps) {
  const { isMobile } = useMobileNav()

  return (
    <div className="bg-[#333333] text-white w-full">
      <div className="flex items-center p-2">
        <div className="flex items-center">
          {isMobile && <MobileNavToggle />}
          <Link href="/" className="h-10 relative ml-2 cursor-pointer">
            <Image
              src="/images/kulkan-logo-green.png"
              alt="Kulkan"
              width={100}
              height={30}
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
