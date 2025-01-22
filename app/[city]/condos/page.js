"use client";

import ListingCard from "@/components/ListingCard";
import CityNav from "@/components/CityNav";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import Link from "next/link";
import Map from "@/components/Map";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const CityCondosPage = () => {
  const params = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await fetch(
          `https://api.homebaba.ca/api/pre-constructions-city/${params.city}/?perpage=100&page=${page}&type=condo`
        );
        const data = await response.json();
        console.log('Fetched condo data:', data); // Debug log

        if (page === 1) {
          setListings(data.data.results);
        } else {
          setListings((prev) => [...prev, ...data.data.results]);
        }

        setTotalCount(data.data.totalCount);
        setHasMore(data.data.results.length === 100);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCityData();
  }, [params.city, page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <div className="ml-3 text-sm text-gray-600">Loading data...</div>
      </div>
    );
  }

  console.log('Current state:', { showMap, listings }); // Debug log

  return (
    <main className="min-h-screen bg-white font-montserrat">
      <CityNav cityName={params.city} />
      <div className="mx-auto px-4 md:px-10 py-5 max-w-8xl">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start justify-between mb-4">
            <div className="w-full lg:w-auto">
              <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold mb-2">
                {totalCount} New Construction Condos in {capitalizeFirstLetter(params.city)} ({new Date().getFullYear()})
              </h1>
              <h2 className="text-xs md:text-sm text-gray-600">
                {totalCount} New Pre construction Condos for sale in {capitalizeFirstLetter(params.city)} | Check out plans, pricing, availability for pre construction condos in {capitalizeFirstLetter(params.city)}
              </h2>
            </div>
            <div className="flex gap-2 w-full lg:w-auto justify-start lg:justify-end mt-4 lg:mt-0">
              <Link
                href={`/${params.city}`}
                className="text-xs px-3 py-1.5 rounded border hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                New Construction Homes
              </Link>
              <Link
                href={`/${params.city}/pre-construction/townhomes`}
                className="text-xs px-3 py-1.5 rounded border hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                New Construction Townhomes
              </Link>
              <button
                onClick={() => {
                  console.log('Map button clicked'); // Debug log
                  setShowMap(!showMap);
                }}
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
            <div className={`grid grid-cols-1 ${showMap ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-5'} gap-x-4 gap-y-5`}>
              {listings.map((listing) => (
                <ListingCard
                  key={listing.slug}
                  listing={listing}
                  city={params.city}
                  isFeatured={listing.is_featured}
                />
              ))}
            </div>

            {hasMore && !loading && (
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={loadMore}
                  className="px-8"
                >
                  Load More Properties
                </Button>
              </div>
            )}
          </div>

          {showMap && listings.length > 0 && (
            <div className="hidden lg:block w-1/2 sticky top-0 h-screen">
              <Map
                citydetail={{
                  centerLat: "43.6532",
                  centerLong: "-79.3832"
                }}
                datas={listings}
                heightt="calc(100vh - 2rem)"
                onClose={() => {
                  console.log('Map close clicked'); // Debug log
                  setShowMap(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CityCondosPage;
