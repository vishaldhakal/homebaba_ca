import Image from "next/image";
import PropertyTypes from "@/components/PropertyTypes";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
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
  return (
    <div className="min-h-[90vh] mt-8 bg-hero pb-8">
      {/* Mobile padding */}
      <div className="block md:hidden pt-4"></div>
      {/* Desktop padding */}
      <div className="hidden md:block pt-5"></div>

      <div className="container py-5 mt-20">
        <div className="mx-auto text-center px-4">
          <h1 className="text-2xl md:text-4xl font-black">
            Canada's Leading <br /> New Construction Homes Platform
            <span className="text-red-600">.</span>
          </h1>

          <div className="mx-auto mb-4">
            <SearchBar
              padding="py-8 px-2"
              width="w-[330px] md:w-[650px]"
              className="mt-3 rounded-[7px]"
            />
            <div className="flex flex-wrap gap-5 justify-center mt-4">
              {popularCities.map((city) => (
                <Link
                  href={`/${city.toLowerCase()}`}
                  key={city}
                  className="text-xs font-normal text-black underline decoration-1 decoration-black underline-offset-4"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <PropertyTypes />

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
      </div>
    </div>
  );
};

export default HeroSection;
