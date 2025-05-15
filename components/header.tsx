"use client"

import { MobileNavToggle } from "@/components/mobile-nav-toggle"
import { useMobileNav } from "@/hooks/use-mobile-nav"
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
  title?: string
  showSearch?: boolean
}

export function Header({ title, showSearch = false }: HeaderProps) {
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
              priority
              style={{ height: 30, width: 'auto' }}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
