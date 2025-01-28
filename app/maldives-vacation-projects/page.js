"use client";
import Image from "next/image";
import { Flower, Dumbbell, Waves, UtensilsCrossed } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Heading from "@/components/design/Heading";
import ContactForm from "@/components/ContactForm";

export default function Page() {
  // ===============================
  // State Management
  // ===============================
  const [activeTab, setActiveTab] = useState("BeachVillas");
  const [isPropertyVisible, setIsPropertyVisible] = useState(false);
  const [isTabContentVisible, setIsTabContentVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const propertyDetailsRef = useRef(null);
  const tabContentRef = useRef(null);

  // ===============================
  // Intersection Observer Effect
  // ===============================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "propertyDetails") {
              setIsPropertyVisible(true);
            } else if (entry.target.id === "tabContent") {
              setIsTabContentVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (propertyDetailsRef.current) {
      propertyDetailsRef.current.id = "propertyDetails";
      observer.observe(propertyDetailsRef.current);
    }
    if (tabContentRef.current) {
      tabContentRef.current.id = "tabContent";
      observer.observe(tabContentRef.current);
    }

    return () => {
      if (propertyDetailsRef.current) {
        observer.unobserve(propertyDetailsRef.current);
      }
      if (tabContentRef.current) {
        observer.unobserve(tabContentRef.current);
      }
    };
  }, []);

  // ===============================
  // Data
  // ===============================
  const properties = {
    BeachVillas: {
      image: "/maldives/Villa2.jpg",
      data: [
        { key: "LIVING ROOM", value: "25.8" },
        { key: "KITCHEN/DINING", value: "18.7" },
        { key: "BEDROOM 3", value: "14.4" },
        { key: "BATHROOM 3", value: "3.5" },
        { key: "POOL", value: "11.6" },
        { key: "BEDROOM 1", value: "23.4" },
        { key: "BEDROOM 2", value: "23.4" },
        { key: "BATHROOM 1", value: "8.7" },
        { key: "BATHROOM 2", value: "8.7" },
        { key: "BALCONY 1", value: "11.7" },
        { key: "BALCONY 2", value: "7.1" },
        { key: "OPEN BALCONY", value: "7.1" },
      ],
    },
    GardenVillas: {
      image: "/maldives/Villa3.jpg",
      data: [
        { key: "LIVING ROOM", value: "25.9" },
        { key: "KITCHEN/DINING", value: "18.7" },
        { key: "BEDROOM 3", value: "14.4" },
        { key: "BATHROOM 3", value: "3.5" },
        { key: "POOL", value: "11.6" },
        { key: "BEDROOM 1", value: "23.4" },
        { key: "BEDROOM 2", value: "23.4" },
        { key: "BATHROOM 1", value: "8.7" },
        { key: "BATHROOM 2", value: "8.7" },
        { key: "BALCONY 1", value: "11.7" },
        { key: "BALCONY 2", value: "7.1" },
        { key: "OPEN BALCONY", value: "7.1" },
        { key: "GARDEN", value: "69.8" },
      ],
    },
  };

  const carouselImages = [
    {
      src: "/maldives/Villa1.jpg",
      alt: "Luxury Property 1",
    },
    {
      src: "/maldives/Villa2.jpg",
      alt: "Luxury Property 2",
    },
    {
      src: "/maldives/Villa3.jpg",
      alt: "Luxury Property 3",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <section className="relative py-16 bg-[url('/bg.avif')] bg-cover bg-center bg-fixed text-center text-white mb-0">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-4 tracking-tight drop-shadow-md">
            Explore Maldives Vacation Homes
          </h1>
          <span className="block text-lg md:text-xl lg:text-3xl text-gray-700 font-medium mt-4">
            Discover Paradise in the Heart of the Indian Ocean
          </span>
          <p className="mt-4 text-center mx-auto max-w-2xl text-gray-600">
            Experience luxury living in the Maldives with our exclusive
            collection of beachfront and garden villas. Crystal-clear waters,
            pristine beaches, and world-class amenities await.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                src: "/maldives/Villa1.jpg",
                alt: "Villa 1",
                title: "Beachfront Villa",
              },
              {
                src: "/maldives/Villa2.jpg",
                alt: "Villa 2",
                title: "Ocean View Suite",
              },
              {
                src: "/maldives/Villa3.jpg",
                alt: "Villa 3",
                title: "Garden Villa",
              },
              {
                src: "/maldives/Villa4.jpg",
                alt: "Villa 4",
                title: "Premium Pool Villa",
              },
            ].map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl group cursor-pointer"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-semibold text-center">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-16">
          <h2 className="text-4xl font-semibold text-center mb-16">
            Experience Luxury Living
          </h2>
          <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "🌅",
                  title: "Breathtaking Views",
                  description:
                    "Wake up to stunning ocean views and pristine beaches",
                },
                {
                  icon: "🏊‍♂️",
                  title: "Private Pool",
                  description:
                    "Each villa comes with an optional private infinity pool",
                },
                {
                  icon: "🍽️",
                  title: "Fine Dining",
                  description:
                    "World-class restaurants and personalized dining experiences",
                },
                {
                  icon: "🛥️",
                  title: "Water Activities",
                  description: "From diving to yacht tours, adventure awaits",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 relative pb-4 inline-block">
              Property Details
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gray-900"></span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our luxurious villa specifications and layouts
            </p>
            <div className="flex justify-center gap-4 mt-8">
              {Object.keys(properties).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                    activeTab === tab
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.replace(/([A-Z])/g, " $1").trim()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-[748.8px] h-[300px] relative rounded-xl overflow-hidden shadow-lg mb-12">
              <Image
                src={properties[activeTab].image}
                alt={activeTab}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="w-full max-w-3xl">
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  Area Specifications
                  <span className="ml-4 h-0.5 w-12 bg-red-500"></span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          SPACE
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          AREA (m²)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties[activeTab].data.map((row, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">{row.key}</td>
                          <td className="py-3 px-4 text-gray-600">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                <p className="text-gray-600 text-center">
                  The development consists of 32 beach villas overlooking the
                  sandy and serene beach and 32 garden villas overlooking the
                  calming greenery of the island.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1272px] mx-auto px-8 py-16">
          <div className="bg-gray-50 rounded-xl p-6 h-[235.38px] border-l-4 border-orange-500">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  About Premier Property Private Limited
                </h2>
                <Image
                  src="/premiere.png"
                  alt="Premier Property"
                  width={70}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Premier Property Private Limited is a leading real estate firm
                  established on February 20, 2014, located at 7th Floor,
                  Hazaarumaage, Fareedhee Magu, Male' 20191, Republic of
                  Maldives. Under the leadership of Managing Director Dr. Hassan
                  Saeed, the company excels in various aspects of real estate,
                  including development, management, consultancy, rentals, and
                  sales. With a dedicated team of 16 full-time and 14 part-time
                  professionals, Premier Property offers comprehensive services
                  tailored to meet diverse real estate needs, establishing
                  itself as a prominent player in the Maldives real estate
                  industry.
                </p>
                <p className="text-gray-500 text-sm">
                  — Premier Property Private Limited Registration number:
                  C-0158/2014
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mb-4 md:mb-5">
          <Image
            src="/contact-bottom-2.png"
            alt="Real Estate Agent"
            width={300}
            height={300}
            className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
            priority
          />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
            Looking to buy a New Home?
          </h2>
          <p className="text-gray-600 text-center text-sm md:text-base">
            Don't know where to start? Contact Homebaba now!
          </p>
        </div>
        <ContactForm />
        <div className="my-10 md:my-32"></div>
      </div>
    </div>
  );
}
