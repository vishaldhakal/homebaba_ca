"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ResaleSearchBar from "./resale/SearchBar";
import { generateURL } from "@/helpers/generateResaleURL";

const searchTypes = {
  PRECONSTRUCTION: "preconstruction",
  RESALE: "resale",
};

const HeroSection = () => {
  const [searchBar, setSearchbar] = useState(searchTypes.PRECONSTRUCTION);
  const cities = [
    "Toronto",
    "Calgary",
    "Mississauga",
    "Milton",
    "Etobicoke",
    "Brampton",
    "Markham",
    "Vaughan",
    "Edmonton",
  ];
  const heroTitle =
    searchBar == searchTypes.PRECONSTRUCTION ? (
      <h2 className="text-3xl md:text-5xl tracking-tight font-extrabold leading-[1.2] md:leading-[1.2]">
        Canada's Leading <br className="md:block" /> Pre Construction Homes
        Platform
        <span className="text-red-500">.</span>
      </h2>
    ) : (
      <h2 className="text-3xl md:text-5xl tracking-tight font-extrabold leading-[1.2] md:leading-[1.2]">
        Find resale homes
        <br className="md:block" /> for sale or lease across Ontario{" "}
        <span className="text-red-500">.</span>
      </h2>
    );

  const isPreconstruction = searchBar == searchTypes.PRECONSTRUCTION;
  const isResale = searchBar == searchTypes.RESALE;
  return (
    <div className="min-h-screen hero-bg">
      <div className="container mx-auto px-6 md:px-8 pt-24 md:pt-40 pb-8 md:pb-16">
        <div className="flex gap-x-3 justify-center mb-3">
          <button
            className={`rounded-full px-3 py-2 bg-white ${
              searchBar == searchTypes.PRECONSTRUCTION &&
              "border-black ring-black ring-2"
            }`}
            onClick={() => setSearchbar(searchTypes.PRECONSTRUCTION)}
          >
            Preconstruction
          </button>
          <button
            className={`rounded-full px-3 py-2 bg-white ${
              searchBar == searchTypes.RESALE &&
              "border-black ring-black ring-2"
            }`}
            onClick={() => setSearchbar(searchTypes.RESALE)}
          >
            Resale
          </button>
        </div>
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-1">
          {heroTitle}

          {isPreconstruction ? (
            <SearchBar padding="py-4 md:py-8" width="w-[330px] md:w-[750px]" />
          ) : isResale ? (
            <ResaleSearchBar />
          ) : null}

          {/* City Links */}
          <div className="flex flex-wrap justify-center gap-0 md:gap-1 px-4 md:px-0 max-w-2xl mx-auto">
            {cities.map((city) => (
              <Link
                key={city}
                href={
                  isPreconstruction
                    ? `/${city.toLowerCase()}`
                    : isResale && generateURL({ cityVal: city.toLowerCase() })
                }
                className="text-xs md:text-xs text-gray-700 hover:text-gray-900 underline-offset-4 underline px-1.5 md:px-2 py-0.5 md:py-1"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Builders Section */}
        {isPreconstruction && (
          <div className="mt-20 md:mt-40 text-center">
            <h3 className="text-base md:text-lg mb-4 md:mb-8">
              Homes from trusted builders across the country
            </h3>
            <Image
              src="/builders.png"
              alt="Builders"
              width={600}
              height={200}
              className="mx-auto max-w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
