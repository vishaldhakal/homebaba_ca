"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import AnticipatedBottom from "@/components/AnticipatedBottom";
import Dropdown from "@/components/resale/Dropdown";
import { usePathname } from "next/navigation";
import { generateURL } from "@/helpers/generateResaleURL";
import citiesWithProvinces from "@/constant/cities";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import ResaleSearchBar from "@/components/resale/SearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnticipated, setShowAnticipated] = useState(false);
  const pathname = usePathname();

  const cities = citiesWithProvinces.map((obj) => obj.city.toLowerCase());
  const cityName = cities.find((city) => !!pathname?.match(city));

  const buyOpts = [
    {
      name:
        "Semi Detached Homes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "semi detached",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Detached Homes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "detached",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Townhomes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "town house",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Duplex Homes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "duplex",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Triplex Homes for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "triplex",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Condos for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "condo",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
  ];

  const rentOpts = [
    {
      name:
        "Semi Detached Homes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "semi detached",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Detached Homes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "detached",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Townhomes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "town house",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Duplex Homes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "duplex",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Triplex Homes for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "triplex",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Condos for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "condo",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
  ];

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-[999] shadow-nav">
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

          {/* Search Section */}
          <div className="flex-1 max-w-[280px] lg:max-w-[350px] mx-4 hidden sm:block">
            {pathname.includes("/resale") ? (
              <ResaleSearchBar small={true} />
            ) : (
              <SearchBar
                padding="py-2.5"
                width="w-[300px] md:w-[350px]"
                shadow="shadow-none border-none bg-gray-100 rounded-[7px]"
              />
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <Dropdown name="Lease" text={"red"} options={rentOpts} width="auto" />
          <Dropdown
            name="Resale Homes"
            text={"red"}
            options={buyOpts}
            width="auto"
          />
          <Link
            href="/new-construction-homes"
            className="text-[12px] xl:text-[12px] text-gray-600 hover:text-black transition-colors whitespace-nowrap"
          >
            Pre Construction
          </Link>
          <button
            onClick={() => setShowAnticipated(true)}
            className="text-[12px] xl:text-[12px] text-gray-600 hover:text-black transition-colors flex items-center gap-1 whitespace-nowrap"
          >
            Most Anticipated
            <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-medium">
              New
            </span>
          </button>
          <Link
            href="/blog"
            className="text-[12px] xl:text-[12px] text-gray-600 hover:text-black transition-colors whitespace-nowrap"
          >
            Blogs
          </Link>
          <Link
            href="/contact-us"
            className="text-[12px] xl:text-[12px] text-gray-600 hover:text-black transition-colors whitespace-nowrap"
          >
            Contact
          </Link>
          {/* <Image
            src="/cont.png"
            alt="Email Icon"
            width={150}
            height={30}
            className="cursor-pointer ml-1"
          /> */}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center justify-between gap-4">
          <div className="flex-1 max-w-xs mx-4 me-auto sm:hidden z-[9999]">
            {pathname.includes("/resale") ? (
              <ResaleSearchBar small={true} />
            ) : (
              <SearchBar
                padding="py-2.5"
                width="w-[200px] md:w-[350px] ms-auto"
                shadow="shadow-none border-none bg-gray-100 rounded-[7px]"
              />
            )}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex flex-col h-full bg-white">
                <div className="flex flex-col py-3 mt-10">
                  <div className="px-3 py-2">
                    <Dropdown
                      name="Lease"
                      text={"red"}
                      options={rentOpts}
                      width="w-full"
                      className="!justify-start text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors py-2"
                    />
                  </div>
                  <div className="px-3 py-2">
                    <Dropdown
                      name="Resale Homes"
                      text={"red"}
                      options={buyOpts}
                      width="w-full"
                      className="!justify-start text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors py-2"
                    />
                  </div>
                  <Link
                    href="/new-construction-homes"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Pre Construction
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
                    href="/contact-us"
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
                  {/* <Image
                    src="/cont.png"
                    alt="Email Icon"
                    width={150}
                    height={30}
                    className="cursor-pointer ml-1 px-6 py-4"
                  /> */}
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
