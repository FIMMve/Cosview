import { getServerSession } from "next-auth"
import { authOptions } from "@/app/utils/authOptions"

import ToggleTheme from "./ToggleTheme"
import NavBar from "./NavBar"
import Link from "next/link"
import Image from "next/image"

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <div className="lg:px-4 mb-4 flex gap-4 items-center justify-between">

      <Link
        href="/dashboard"
        className="header-title text-primary dark:text-secondary text-3xl print:hidden">
        COSVIEW
      </Link>

      <Image 
        src="/logo.webp"
        alt="Logo"
        width={150}
        height={150}
        className="hidden print:flex print:dark:hidden"
      />

      <Image 
        src="/logo-dark.webp"
        alt="Logo"
        width={150}
        height={150}
        className="hidden print:hidden print:dark:flex"
      />


      <div className="flex items-center justify-center gap-4 print:hidden">
        <ToggleTheme session={session} />
        {session?.user && <NavBar />}
      </div>
    </div>
  )
}