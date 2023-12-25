"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Our offers",
    href: "/offers",
  },
  {
    label: "Team",
    href: "/team",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <Navbar>
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <p className="font-bold text-inherit">Real estate company</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {menuItems.map((item) => (
          <NavbarItem key={item.label} isActive={pathname === item.href}>
            <Link href={item.href}>{item.label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarItem key={item.label} isActive={pathname === item.href}>
            <Link href={item.href}>{item.label}</Link>
          </NavbarItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
