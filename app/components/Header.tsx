"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Link
} from "@nextui-org/react";
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
  }
];

const Header = () => {
  const pathname = usePathname();

  return (
    <Navbar maxWidth="xl">
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">Real estate company</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {menuItems.map((item) => (
          <NavbarItem key={item.label} isActive={pathname === item.href}>
            <Link color={`${pathname === item.href ? "primary" : "foreground"}`} href={item.href}>{item.label}</Link>
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
