"use client";
import Image from "next/image";
import PropertyTypes from "@/components/PropertyTypes";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { useState } from "react";
import ResaleSearchBar from "./resale/SearchBar";
import { generateURL } from "@/helpers/generateResaleURL";
import ResalePropertyTypes from "./resale/ResalePropertyTypes";
const popularCities = [
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

const HeroSection = () => {
  const [isResale, setIsResale] = useState(false);
  return (
    <div className="min-h-[90vh] sm:mt-8 bg-hero pb-8">
      {/* Mobile padding */}
      <div className="block md:hidden pt-4"></div>
      {/* Desktop padding */}
      <div className="hidden md:block pt-5"></div>

      <div className="container py-5 mt-20">
        <div className="mx-auto text-center px-4">
          <div className="flex gap-x-3 justify-center mb-3">
            <button
              className={`rounded-full px-3 py-2 bg-white ${
                !isResale && "border-black ring-black ring-2"
              }`}
              onClick={() => setIsResale(false)}
            >
              Preconstruction
            </button>
            <button
              className={`rounded-full px-3 py-2 bg-white ${
                isResale && "border-black ring-black ring-2"
              }`}
              onClick={() => setIsResale(true)}
            >
              Resale
            </button>
          </div>
          {!isResale ? (
            <h1 className="text-2xl md:text-4xl font-black">
              Canada's Leading <br /> New Construction Homes Platform
              <span className="text-red-600">.</span>
            </h1>
          ) : (
            <h1 className="text-2xl md:text-4xl font-black">
              Find resale homes
              <br />
              for sale or lease across Ontario
              <span className="text-red-600">.</span>
            </h1>
          )}

          <div className="mx-auto mb-4">
            {!isResale ? (
              <SearchBar
                padding="py-8 px-2"
                width="w-[330px] md:w-[650px]"
                className="mt-3 rounded-[7px]"
              />
            ) : (
              <ResaleSearchBar />
            )}
            <div className="flex flex-wrap gap-5 justify-center mt-4">
              {popularCities.map((city) => (
                <Link
                  href={
                    !isResale
                      ? `/${city.toLowerCase()}`
                      : generateURL({ cityVal: city })
                  }
                  key={city}
                  className="text-xs font-normal text-black underline decoration-1 decoration-black underline-offset-4"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {!isResale ? <PropertyTypes /> : <ResalePropertyTypes />}

        {!isResale && (
          <div className="flex justify-center">
            <div className="inline-block mx-auto p-4 rounded-2xl mt-0 md:mt-8 text-center">
              <h3 className="text-[0.8rem] md:text-lg mb-4 font-normal text-gray-700">
                Homes from trusted builders across the country
              </h3>
              <Image
                src="/builde.png"
                alt="Builders"
                width={400}
                height={200}
                className="img-fluid"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
