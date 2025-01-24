"use client";

import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import AnticipatedBottom from "../AnticipatedBottom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnticipated, setShowAnticipated] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50 shadow-nav">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
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
            </Link>
          </div>

          {/* Search Section - Always visible */}
          <div className="flex-1 max-w-[280px] lg:max-w-[350px] mx-4 hidden sm:block">
            <SearchBar
              padding="py-2.5"
              width="w-[300px] md:w-[350px]"
              shadow="shadow-none border-none bg-gray-100 rounded-[7px]"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-6">
          <Link
            href="/resale/ontario"
            className="text-[14px] xl:text-[15px] text-gray-600 hover:text-black transition-colors whitespace-nowrap"
          >
            Buy
          </Link>
          <Link
            href="/rental/ontario"
            className="text-[14px] xl:text-[15px] text-gray-600 hover:text-black transition-colors whitespace-nowrap"
          >
            Rent
          </Link>
          <button
            onClick={() => setShowAnticipated(true)}
            className="text-[14px] xl:text-[15px] text-gray-600 hover:text-black transition-colors flex items-center gap-1 whitespace-nowrap"
          >
            Most Anticipated
            <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-medium">
              New
            </span>
          </button>
          <Link
            href="/new-construction-homes"
            className="text-[14px] xl:text-[15px] text-gray-600 hover:text-black transition-colors whitespace-nowrap"
          >
            New Construction
          </Link>

          <Link
            href="/contact"
            className="text-[14px] xl:text-[15px] text-gray-600 hover:text-black transition-colors whitespace-nowrap"
          >
            Contact
          </Link>
          <Link
            href="/blog"
            className="text-[14px] xl:text-[15px] text-gray-600 hover:text-black transition-colors whitespace-nowrap"
          >
            Blogs
          </Link>
          <Image
            src="/cont.png"
            alt="Email Icon"
            width={150}
            height={30}
            className="cursor-pointer ml-1"
          />
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center justify-between gap-4">
          {/* Search toggle for mobile */}
          <div className="flex-1 max-w-xs mx-4 me-auto sm:hidden">
            <SearchBar
              padding="py-2.5"
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
                  <Link
                    href="/resale/ontario"
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Buy
                  </Link>
                  <Link
                    href="/rental/ontario"
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Rent
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowAnticipated(true);
                    }}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left flex items-center"
                  >
                    Most Anticipated
                    <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-medium ml-2">
                      New
                    </span>
                  </button>
                  <Link
                    href="/new-construction-homes"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    New Construction
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Blogs
                  </Link>
                  <Image
                    src="/cont.png"
                    alt="Email Icon"
                    width={150}
                    height={30}
                    className="cursor-pointer ml-1 px-6 py-4 "
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <AnticipatedBottom
        isOpen={showAnticipated}
        onClose={() => setShowAnticipated(false)}
      />
    </>
  );
};

export default Navbar;
