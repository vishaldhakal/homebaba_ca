"use client";

import { generateURL } from "@/helpers/generateResaleURL";
import Link from "next/link";
import { useRouter } from "next/navigation";

const propertyTypes = [
  {
    title: "Townhomes",
    icon: "🏘️",
    filter: "Townhomes",
    url: generateURL({ houseTypeVal: "townhomes" }),
  },
  {
    title: "Condos",
    icon: "🏢",
    filter: "Condos",
    url: generateURL({ houseTypeVal: "condo" }),
  },
  {
    title: "Detached",
    icon: "🏠",
    filter: "Detached",
    url: generateURL({ houseTypeVal: "detached" }),
  },
  {
    title: "Semi-Detached",
    icon: "🏡",
    filter: "Detached",
    url: generateURL({ houseTypeVal: "semi-detached" }),
  },
  {
    title: "Duplex",
    icon: "🏠🏠",
    filter: "Duplex",
    url: generateURL({ houseTypeVal: "duplex" }),
  },
  {
    title: "Triplex",
    icon: "🏠🏠🏠",
    filter: "Triplex",
    url: generateURL({ houseTypeVal: "triplex" }),
  },
];

const ResalePropertyTypes = () => {
  const router = useRouter();
  const textSize = (propertyType) => {
    if (propertyType.title !== "Duplex" || propertyType.title !== "Triplex") {
      return "text-[2.5rem] sm:text-[2rem]";
    } else if (propertyType.title == "Duplex") {
      return "text-[1.5rem] sm:text-[1rem]";
    } else if (propertyType.title == "Triplex") {
      return "text-[1rem] sm:text-[0.75rem]";
    }
  };
  const smallerIcons = ["Duplex", "Triplex"];
  return (
    <section className="overflow-x-hidden">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-0 max-w-[550px] mx-auto px-0 justify-center">
          {propertyTypes.map((property) => (
            <Link
              key={property.title}
              className="rounded-2xl py-2 px-0 text-center flex flex-col items-center justify-center transition-all duration-300 cursor-pointer min-h-[140px] sm:min-h-0 sm:p-4 sm:px-2"
              href={property.url}
            >
              {smallerIcons.includes(property.title) ? (
                <div
                  className={`text-[1.5rem] sm:text-[1.5rem] transition-transform duration-300 flex items-center justify-center w-full h-[60px] sm:h-[50px] mb-0 hover:scale-110`}
                >
                  <span>{property.icon}</span>
                </div>
              ) : (
                <div
                  className={`text-[2.5rem] sm:text-[2rem] transition-transform duration-300 flex items-center justify-center w-full h-[60px] sm:h-[50px] mb-0 hover:scale-110`}
                >
                  <span>{property.icon}</span>
                </div>
              )}
              <div className="flex flex-col items-center justify-center gap-1">
                <h3 className="text-[0.775rem] sm:text-[0.7rem] font-semibold text-[#212529] m-0 text-center w-full">
                  {property.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResalePropertyTypes;
