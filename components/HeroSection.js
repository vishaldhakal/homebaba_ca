import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

const HeroSection = () => {
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

  return (
    <div className="min-h-screen hero-bg">
      <div className="container mx-auto px-6 md:px-8 pt-24 md:pt-40 pb-8 md:pb-16">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-1">
          <h2 className="text-3xl md:text-5xl tracking-tight font-extrabold leading-[1.2] md:leading-[1.2]">
            Canada's Leading <br className="md:block" /> Pre Construction Homes
            Platform
            <span className="text-red-500">.</span>
          </h2>

          <SearchBar padding="py-4 md:py-8" width="w-[330px] md:w-[750px]" />

          {/* City Links */}
          <div className="flex flex-wrap justify-center gap-0 md:gap-1 px-4 md:px-0 max-w-2xl mx-auto">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/${city.toLowerCase()}`}
                className="text-xs md:text-xs text-gray-700 hover:text-gray-900 underline-offset-4 underline px-1.5 md:px-2 py-0.5 md:py-1"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Builders Section */}
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
      </div>
    </div>
  );
};

export default HeroSection;
