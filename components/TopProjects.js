import React from "react";
import { Button } from "@/components/ui/button";

const properties = [
  {
    logo: "/clover.svg",
    name: "Clover",
    description:
      "Discover Clover Condos, a pre-construction haven where natural elegance meets modern luxury, in a vibrant community.",
    image: "/3.png",
  },
  {
    logo: "/clover.svg",
    name: "Arabella",
    description:
      "Arabella Towns, a new townhome project by Truman Homes, is currently in pre-construction at 100 Street SouthEast & Township Road 244 in Calgary.",
    image: "/3.png",
  },
  {
    logo: "/clover.svg",
    name: "Lincoln",
    description:
      "Lincoln Tower, a visionary condo project by Truman that is currently in the pre-construction phase.",
    image: "/3.png",
  },
  {
    logo: "/clover.svg",
    name: "Truman",
    description:
      "Marc and Maria Condos, a striking architectural duo in the heart of a bustling Canadian city, redefine urban living with their modern elegance.",
    image: "/3.png",
  },
];

const PropertyCard = ({ property }) => (
  <div className="group relative h-[400px] md:h-[500px] overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-bottom"
      style={{ backgroundImage: `url(${property.image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-800/10" />
    </div>

    <div className="relative h-full p-8 space-y-4 text-black">
      <img
        src={property.logo}
        alt={`${property.name} logo`}
        className="h-8 object-contain"
      />
      <p className="text-sm leading-relaxed">{property.description}</p>
      <button className="border border-black bg-transparent px-6 py-2 text-sm hover:bg-white hover:text-black transition-colors">
        Learn More
      </button>
    </div>
  </div>
);

const TopProjects = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-5xl tracking-tight font-extrabold leading-[1.2] md:leading-[1.2] text-center mb-3">
        Top 10 GTA Projects
      </h2>
      <p className="text-center text-sm underline mb-12 underline-offset-4">
        Selected by homes expert at homebaba.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {properties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>
    </div>
  );
};

export default TopProjects;
