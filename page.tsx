import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "shadcn";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Navbar>
        <NavbarBrand>
          <Link href="/">Home</Link>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>
            <Link href="/about">About</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/contact">Contact</Link>
          </NavbarItem>
          <NavbarItem>
            <SignInButton />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </main>
  );
}