"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Menu, X } from "lucide-react";
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
    { href: "/assignments", label: "Assignments for sale" },
    { href: "/top-projects", label: "TOP 10 GTA Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <span className="text-xl md:text-2xl font-bold">homebaba</span>
        <Image
          src="/maple-leaf.svg"
          alt="Maple Leaf Icon for Logo"
          width={20}
          height={20}
        />
      </div>

      {/* Search Section - Always visible */}
      <div className="flex-1 max-w-xs mx-4 me-auto hidden sm:block">
        <SearchBar
          padding="py-3 md:py-5"
          width="w-[200px] md:w-[400px]"
          shadow="shadow-none border"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm hover:text-gray-600"
          >
            {link.label}
          </Link>
        ))}
        <Image
          src="/email-button.png"
          alt="Email Icon"
          width={170}
          height={170}
          className="cursor-pointer"
        />
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden flex items-center gap-4">
        {/* Search toggle for mobile */}
        <div className="sm:hidden">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-2 py-4 w-[150px] text-xs"
          />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-lg hover:text-gray-600 py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
