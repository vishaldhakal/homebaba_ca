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
import { generateURL } from "@/helpers/generateResaleURL";
import Dropdown from "../resale/Dropdown";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/assignments", label: "Assignments for sale" },
    { href: "/top-projects", label: "TOP 10 GTA Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];

  const buyOpts = [
    /* {
      name: "Semi-detached Homes for Sale",
      link: generateURL({ houseTypeVal: "semiDetached" }),
    }, */
    {
      name: "Semi Detached Homes for Sale",
      link: generateURL({
        houseTypeVal: "semi detached",
        saleLeaseVal: "sale",
        // cityVal: cityName,
      }),
    },
    {
      name: "Detached Homes for Sale",
      link: generateURL({
        houseTypeVal: "detached",
        saleLeaseVal: "sale",
        // cityVal: cityName,
      }),
    },
    {
      name: "Townhomes for Sale",
      link: generateURL({
        houseTypeVal: "town house",
        saleLeaseVal: "sale",
        // cityVal: cityName,
      }),
    },
    {
      name: "Duplex  Homes for Sale",
      link: generateURL({
        houseTypeVal: "duplex",
        saleLeaseVal: "sale",
        // cityVal: cityName,
      }),
    },
    {
      name: "Triplex Homes for Sale",
      link: generateURL({
        houseTypeVal: "triplex",
        saleLeaseVal: "sale",
        // cityVal: cityName,
      }),
    },
  ];

  const rentOpts = [
    {
      name: "Semi Detached Homes for Lease",
      link: generateURL({
        houseTypeVal: "semi detached",
        saleLeaseVal: "lease",
        // cityVal: cityName,
      }),
    },
    {
      name: "Detached Homes for Lease",
      link: generateURL({
        houseTypeVal: "detached",
        saleLeaseVal: "lease",
        // cityVal: cityName,
      }),
    },
    {
      name: "Townhomes for Lease",
      link: generateURL({
        houseTypeVal: "town house",
        saleLeaseVal: "lease",
        // cityVal: cityName,
      }),
    },
    {
      name: "Duplex  Homes for Lease",
      link: generateURL({
        houseTypeVal: "duplex",
        saleLeaseVal: "lease",
        // cityVal: cityName,
      }),
    },
    {
      name: "Triplex Homes for Lease",
      link: generateURL({
        houseTypeVal: "triplex",
        saleLeaseVal: "lease",
        // cityVal: cityName,
      }),
    },
  ];

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-[999] shadow-nav">
      {/* Logo Section */}
      <div className="flex items-center">
        <span className="text-sm md:text-2xl font-bold">homebaba</span>
        <Image
          src="/maple-leaf.svg"
          alt="Maple Leaf Icon for Logo"
          width={20}
          height={20}
          className="hidden md:block"
        />
        <Image
          src="/maple-leaf.svg"
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
          shadow="shadow-none border"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-6">
        <Dropdown
          name="Rent Resale Properties"
          // text={isSticky || !isHomePage ? "black" : "white"}
          options={rentOpts}
          width="auto"
        />
        <Dropdown
          name="Buy Resale Properties"
          // text={isSticky || !isHomePage ? "black" : "white"}
          options={buyOpts}
          width="auto"
        />
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
      <div className="lg:hidden flex items-center justify-between gap-4">
        {/* Search toggle for mobile */}

        <div className="flex-1 max-w-xs mx-4 me-auto sm:hidden">
          <SearchBar
            padding="py-1 md:py-5 h-9"
            width="w-[200px] md:w-[200px]"
            shadow="shadow-none border"
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
              <Dropdown
                name="Rent Resale Properties"
                // text={isSticky || !isHomePage ? "black" : "white"}
                options={rentOpts}
                width="auto"
              />
              <Dropdown
                name="Buy Resale Properties"
                // text={isSticky || !isHomePage ? "black" : "white"}
                options={buyOpts}
                width="auto"
              />
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
