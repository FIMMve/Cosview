"use client"

import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { Navbar, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import NavBarLinks from "./NavBarLinks";
import { linksList } from "@/app/utils/linksList";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { role, getUserSession } = useUser()

  useEffect(() => {
    getUserSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Navbar className="transition-background duration-1000" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="text-primary dark:text-secondary">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarMenu className="mt-8 transition-background duration-1000">
      {linksList.map((item, index) => {
        if(role !== "admin" && item.name === "Administrar Usuarios") return null
        return (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavBarLinks setIsMenuOpen={setIsMenuOpen} index={index} item={item} />
          </NavbarMenuItem>
        )
      })}
      </NavbarMenu>
    </Navbar>
  )
}
