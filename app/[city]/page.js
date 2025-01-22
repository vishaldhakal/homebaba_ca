"use client";
import ListingCard from "@/components/ListingCard";
import CityNav from "@/components/CityNav";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import Link from "next/link";
import Map from "@/components/Map";
import { useState, useEffect } from "react";

export default function CityPage({ params }) {
  const [showMap, setShowMap] = useState(false);
  const [cityData, setCityData] = useState(null);
  const [featuredListings, setFeaturedListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for city:', params.city);
        
        const [cityResponse, featuredResponse] = await Promise.all([
          fetch(
            `https://api.homebaba.ca/api/pre-constructions-city/${params.city}/?perpage=100&page=1`,
            {
              next: { revalidate: 3600 },
            }
          ),
          fetch(
            `https://api.homebaba.ca/api/pre-constructions-city/${params.city}/?is_featured=true&perpage=10`
          )
        ]);

        const cityData = await cityResponse.json();
        const featuredListings = await featuredResponse.json();

        console.log('City Data Response:', cityData);
        console.log('Featured Listings Response:', featuredListings);

        if (!cityData.data || !featuredListings.data) {
          console.error('Missing required data');
          throw new Error('Missing required data');
        }

        setCityData({
          data: cityData.data,
          citydetail: {
            centerLat: "43.6532",
            centerLong: "-79.3832"
          }
        });
        setFeaturedListings(featuredListings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.city]);

  const filteredprojects = (value) => {
    if (!cityData || !cityData.data || !cityData.data.results) {
      console.log('No city data available for filtering');
      return [];
    }
    return cityData.data.results.filter((item) => item.status === value);
  };

  console.log('Current State:', {
    loading,
    cityData,
    featuredListings,
    showMap
  });

  if (loading || !cityData || !featuredListings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <div className="ml-3 text-sm text-gray-600">Loading data...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-montserrat">
      <CityNav cityName={params.city} />
      <div className="mx-auto px-4 md:px-10 py-5 max-w-8xl">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start justify-between mb-4">
            <div className="w-full lg:w-auto">
              <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold mb-2">
                {cityData.data.totalCount} New Construction Detached & Townhomes in {capitalizeFirstLetter(params.city)} ({new Date().getFullYear()})
              </h1>
              <h2 className="text-xs md:text-sm text-gray-600">
                {cityData.data.totalCount} New Pre construction Detached, Townhomes, or Condos for sale in {capitalizeFirstLetter(params.city)} | Check out plans, pricing, availability for pre construction homes in {capitalizeFirstLetter(params.city)}
              </h2>
            </div>
            <div className="flex gap-2 w-full lg:w-auto justify-start lg:justify-end mt-4 lg:mt-0">
              <Link
                href={`/${params.city}/condos`}
                className="text-xs px-3 py-1.5 rounded border hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                New Construction Condos
              </Link>
              <Link
                href={`/${params.city}/pre-construction/townhomes`}
                className="text-xs px-3 py-1.5 rounded border hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                New Construction Townhomes
              </Link>
              <button
                onClick={() => setShowMap(!showMap)}
                className={`text-xs px-3 py-1.5 rounded border transition-colors whitespace-nowrap flex items-center gap-2 ${
                  showMap ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <span>Map View</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className={`flex-1 transition-all duration-300 ${showMap ? 'w-1/2' : 'w-full'}`}>
            {/* Selling Projects Section */}
            <div className="mb-8">
              <div className={`grid grid-cols-1 ${showMap ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-5'} gap-x-4 gap-y-5`}>
                {featuredListings.data.results.map((listing) => (
                  <ListingCard
                    key={listing.slug}
                    listing={listing}
                    city={params.city}
                  />
                ))}
                {filteredprojects("Selling").map((listing, index) => (
                  <ListingCard
                    key={listing.slug}
                    listing={listing}
                    index={index + 1}
                    city={params.city}
                  />
                ))}
              </div>
            </div>
          </div>

          {showMap && cityData.citydetail && (
            <div className="hidden lg:block w-1/2 sticky top-0 h-screen">
              <Map
                citydetail={cityData.citydetail}
                datas={[...featuredListings.data.results, ...filteredprojects("Selling")]}
                heightt="calc(100vh - 2rem)"
                onClose={() => setShowMap(false)}
              />
            </div>
          )}
        </div>

        {/* Upcoming Projects Section */}
        {filteredprojects("Upcoming").length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-4">
              Launching Soon - New Construction Projects in{" "}
              {capitalizeFirstLetter(params.city)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
              {filteredprojects("Upcoming").map((listing, index) => (
                <ListingCard
                  key={listing.slug}
                  listing={listing}
                  index={index + 1}
                  city={params.city}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sold Out Projects Section */}
        {filteredprojects("Sold out").length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-4 text-red-600 italic">
              Sold out - New Construction Projects in{" "}
              {capitalizeFirstLetter(params.city)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
              {filteredprojects("Sold out").map((listing, index) => (
                <ListingCard
                  key={listing.slug}
                  listing={listing}
                  index={index + 1}
                  city={params.city}
                />
              ))}
            </div>
          </div>
        )}
        <div className="my-32"></div>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="px-6 py-3 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
            New Construction Condos
          </button>
          <button className="px-6 py-3 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
            New Construction Townhomes
          </button>
          <button className="px-6 py-3 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <span>Map View</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </button>
        </div>
        <h3 className="text-center text-[3rem] font-bold">
          <span className="text-[red]">Be</span> Smart.{" "}
          <span className="text-[red]">Be</span> Quick
        </h3>
        <h4 className="text-center text-xl">
          Get in the line before someone else does
        </h4>

        <div className="p-8">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center">
              <Image
                src="/contact-me-design.webp"
                width={300}
                height={300}
                alt="Contact Me Design"
                className="rounded-lg"
              />
            </div>
            <div className="rounded-lg bg-white p-4 mt-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="w-full md:w-1/3 mx-auto">
                  {cityData.data.partnerdata && cityData.data.partnerdata[0] ? (
                    <Image
                      src={cityData.data.partnerdata[0].image}
                      alt={cityData.data.partnerdata[0].name}
                      width={100}
                      height={100}
                      className="rounded-full object-cover mx-auto"
                    />
                  ) : (
                    <Image
                      src="/contact-form.png"
                      alt="Real Estate Agent"
                      width={100}
                      height={100}
                      className="rounded-sm w-[100px] h-[80px] object-top object-cover mx-auto"
                    />
                  )}
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                  {cityData.data.partnerdata &&
                    cityData.data.partnerdata[0] &&
                    cityData.data.partnerdata[0].partner_type !== "Brokerage" && (
                      <h2 className="text-2xl font-bold text-gray-800 text-center">
                        {cityData.data.partnerdata[0].name}
                      </h2>
                    )}
                  <h2 className="text-2xl font-bold text-gray-800 text-center">
                    {cityData.data.partnerdata &&
                    cityData.data.partnerdata[0] &&
                    cityData.data.partnerdata[0].brokerage_name
                      ? cityData.data.partnerdata[0].brokerage_name
                      : "Receive a Call"}
                  </h2>
                  <p className="text-gray-600 text-base text-center">
                    Speak to an expert agent
                  </p>
                </div>
              </div>
              <div>
                <ContactForm defaultMessage=" " />
              </div>
            </div>
          </div>
        </div>

        {cityData.citydata?.city_details && (
          <div className="mt-16 prose max-w-5xl mx-auto">
            <div
              dangerouslySetInnerHTML={{
                __html: cityData.citydata.city_details,
              }}
              className="text-gray-700 leading-relaxed space-y-6 text-base md:text-lg"
              style={{
                lineHeight: "1.8",
                letterSpacing: "0.01em",
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
