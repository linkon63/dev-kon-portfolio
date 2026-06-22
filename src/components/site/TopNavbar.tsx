"use client";

import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/home", label: "/ home" },
  { href: "/about", label: "/ about" },
  { href: "/projects", label: "/ projects" },
  { href: "/resume", label: "/ resume" },
  { href: "/contact", label: "/ contact" },
];

export default function TopNavbar() {
  return (
    <Sheet>
      <section className="flex w-full bg-black text-gray-100">
        <div className="flex w-[95%] items-center justify-center pt-2 pl-5">
          <div className="ml-5 flex pl-5">
            <p className="pt-2">Dev</p>|<p className="pt-2">KON</p>
          </div>
        </div>
        <div className="flex w-[5%] justify-center">
          <SheetTrigger
            type="button"
            aria-label="Open menu"
            className="px-3 py-2 text-white"
          >
            |||
          </SheetTrigger>
        </div>
      </section>

      <SheetContent
        side="top"
        showCloseButton={false}
        className="gap-0 border-b-0 p-0"
      >
        <SheetHeader className="items-center bg-[#010105] p-4">
          <SheetTitle className="m-0 w-full p-0 text-center text-gray-100">
            Welcome to Dev<span className="font-bold">|KON</span>
          </SheetTitle>
        </SheetHeader>

        <div className="m-0 bg-white p-0">
          <section className="flex w-full justify-center">
            <div className="w-full text-center">
              <h6 className="text-black">Let&apos;s Go</h6>
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1 text-[2.5em] leading-tight text-black hover:text-gray-500"
                  >
                    <span>{link.label}</span>
                  </Link>
                </SheetClose>
              ))}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
