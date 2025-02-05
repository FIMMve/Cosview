"use client"

import { usePathname } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Links } from "@/types"

type NavBarLinksProps = {
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
  index: number
  item: Links
}

export default function NavBarLinks({ setIsMenuOpen, index, item } : NavBarLinksProps) {
  const router = usePathname()
  const isActive = router === item.href

  const handleClick = (index : number)  => {
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
    
    if (index === 3) {
      signOut({callbackUrl: "https://cos-views.netlify.app"})
    }
  }
  


  return (
    <Link
      className={`w-full text-lg font-medium underline-offset-4 hover:underline ${index === 3 && "text-danger"} ${isActive && "text-white bg-primary dark:text-black dark:bg-secondary rounded-md py-1 px-2"}`}
      href={item.href}
      onClick={() => handleClick(index)}
    >
      {item.name}
    </Link>
  )
}
