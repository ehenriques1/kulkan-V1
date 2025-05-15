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
      <div className="flex items-center px-4 md:px-8 py-2 min-h-[56px]">
        <div className="flex items-center w-full">
          {isMobile && <MobileNavToggle />}
          <Link href="/" className="h-8 md:h-10 relative ml-2 cursor-pointer flex items-center">
            <Image
              src="/images/kulkan-logo-green.png"
              alt="Kulkan"
              width={100}
              height={30}
              className="object-contain max-h-8 md:max-h-10 w-auto"
              priority
              style={{ height: '100%', width: 'auto' }}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
