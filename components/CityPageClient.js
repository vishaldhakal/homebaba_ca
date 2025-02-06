"use client";

import { useState } from "react";
import ListingCard from "@/components/ListingCard";
import CityNav from "@/components/CityNav";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import CityFilters from "@/components/CityFilters";
import QuickLinks from "@/components/QuickLinks";
import PropertyMap from "@/components/PropertyMap";
import "@/styles/PropertyMap.css";

export default function CityPageClient({ cityData, featuredListings, params, metadata, searchParams }) {
  const [isMapView, setIsMapView] = useState(false);

  const filteredprojects = (status) => {
    return cityData.data.results.filter((project) => project.status === status);
  };

  return (
    <main className="min-h-screen bg-white font-montserrat">
      <CityNav />

      <div className="mx-auto px-4 md:px-10 py-5 max-w-8xl">
        <div className="mb-3">
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center">
            <h1 className="text-xl md:text-[2rem] text-gray-900 mb-2 font-black text-center md:text-start">
              {metadata.title}
            </h1>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsMapView(!isMapView)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-map"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L8.707 8l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
                ></path>
              </svg>
              <span className={isMapView ? "text-blue-600" : ""}>Map View</span>
            </div>
          </div>
          <h2 className="text-sm text-gray-600 text-center md:text-start">
            {metadata.subtitle}
          </h2>
        </div>

        {/* Main content area with conditional split view */}
        <div className={`relative ${isMapView ? 'flex gap-4' : 'block'}`}>
          {/* Listings section */}
          <div className={isMapView ? 'w-1/2' : 'w-full'}>
            {/* Filters at the top */}
            <CityFilters filters={searchParams} cityName={params.city} />

            {/* Selling Projects Section */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
                {featuredListings.data.results.map((listing) => (
                  <ListingCard
                    key={listing.slug}
                    listing={listing}
                    isFeatured={true}
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

          {/* Map section */}
          {isMapView && (
            <div className="w-1/2 sticky top-0 h-screen">
              <PropertyMap properties={cityData.data.results} />
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

        {/* Quick links at the bottom */}
        <QuickLinks cityName={params.city} />

        <div className="my-32"></div>
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
                src="/reg.webp"
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
                      src="/milan-2.png"
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