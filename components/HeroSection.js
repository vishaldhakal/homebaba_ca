import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
      <div className="container mx-auto px-6 md:px-8 pt-16 md:pt-40 pb-8 md:pb-16">
        {/* Hero Content - Tighter spacing */}
        <div className="max-w-4xl mx-auto text-center space-y-1">
          <h2 className="text-3xl md:text-5xl tracking-tight font-extrabold leading-[1.2] md:leading-[1.2]">
            Canada's Leading <br className="hidden md:block" /> Pre Construction
            Homes Platform
            <span className="text-red-500">.</span>
          </h2>

          <div className="max-w-2xl mx-auto px-4 md:px-0 mt-0 pt-0">
            <Input
              type="text"
              placeholder="search homes by city or name of the project.."
              className="pl-4 py-6 md:py-8 w-full"
            />
          </div>

          {/* City Links - Consistent spacing */}
          <div className="flex flex-wrap justify-center gap-3 px-4 md:px-0 max-w-2xl mx-auto">
            {cities.map((city) => (
              <Button
                key={city}
                variant="link"
                className="text-sm text-gray-700 hover:text-gray-900 underline-offset-4 underline px-2 py-1"
              >
                {city}
              </Button>
            ))}
          </div>
        </div>

        {/* Builders Section - Consistent spacing */}
        <div className="mt-20 md:mt-16 text-center">
          <h3 className="text-lg mb-6 md:mb-8">
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
