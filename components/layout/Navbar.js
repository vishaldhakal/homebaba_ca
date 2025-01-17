"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/assignments", label: "Buy" },
    { href: "/top-projects", label: "Rent" },
    { href: "/blogs", label: "New Construction" },
    { href: "/blogs", label: "Assignments" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 shadow-nav">
      {/* Logo Section */}
      <div className="flex items-center">
        <span className="text-sm md:text-2xl font-bold">homebaba</span>
        <Image
          src="/canadaleaf.svg"
          alt="Maple Leaf Icon for Logo"
          width={20}
          height={20}
          className="hidden md:block"
        />
        <Image
          src="/canadaleaf.svg"
          alt="Maple Leaf Icon for Logo"
          width={15}
          height={15}
          className="block md:hidden"
        />
      </div>

      {/* Search Section - Always visible */}
      <div className="flex-1 max-w-xs mx-4 me-auto hidden sm:block">
        <SearchBar
          padding="py-3 md:py-5"
          width="w-[200px] md:w-[350px]"
          shadow="shadow-none border-none bg-gray-100 rounded-[7px]"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} className="text-sm">
            {link.label}
          </Link>
        ))}
        <Image
          src="/cont.png"
          alt="Email Icon"
          width={170}
          height={30}
          className="cursor-pointer"
        />
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden flex items-center justify-between gap-4">
        {/* Search toggle for mobile */}
        <div className="flex-1 max-w-xs mx-4 me-auto sm:hidden">
          <SearchBar
            padding="py-3 md:py-5"
            width="w-[200px] md:w-[350px] ms-auto"
            shadow="shadow-none border-none bg-gray-100 rounded-[7px]"
          />
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
            <div className="flex flex-col h-full bg-white">
              <div className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
