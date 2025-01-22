"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CityNav from "@/components/CityNav";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import Map from "@/components/Map";

const baseUrl = "https://api.homebaba.ca";

const CityTownhomesPage = () => {
  const params = useParams();
  const [cityData, setCityData] = useState(null);
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
          `${baseUrl}/api/city-detail/${params.city}/`
        );
        const data = await response.json();
        setCityData(data);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchCityData();
  }, [params.city]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${baseUrl}/api/pre-constructions-city/${params.city}/?perpage=90&page=${page}&project_type=Townhome`
        );
        const data = await response.json();
        
        if (page === 1) {
          setListings(data.data.results);
          setTotalCount(data.data.totalCount);
        } else {
          setListings(prev => [...prev, ...data.data.results]);
        }
        setHasMore(page < data.data.totalPages);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [params.city, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  if (!cityData && !listings.length) {
    return (
      <div className="min-h-screen bg-white font-montserrat">
        <CityNav />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-2/3 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cityName = capitalizeFirstLetter(params.city);

  return (
    <main className="min-h-screen bg-white font-montserrat">
      <CityNav />
      
      <div className="mx-auto px-4 md:px-10 py-5 max-w-8xl">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start justify-between mb-4">
            <div className="w-full lg:w-auto">
              <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold mb-2">
                Top {totalCount} {cityName} New Construction Townhomes
              </h1>
              <h2 className="text-xs md:text-sm text-gray-600">
                {totalCount} New Pre construction Townhomes for sale in {cityName} | Check out plans, pricing, availability for pre construction townhomes in {cityName}
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
                href={`/${params.city}/condos`}
                className="text-xs px-3 py-1.5 rounded border hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                New Construction Condos
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
            <div className={`grid grid-cols-1 ${showMap ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-5'} gap-x-4 gap-y-5`}>
              {listings.map((listing) => (
                <ListingCard
                  key={listing.slug}
                  listing={listing}
                  isFeatured={listing.is_featured}
                />
              ))}
            </div>

            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5 mt-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <Skeleton className="aspect-[3/4] w-full" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

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

          {showMap && (
            <div className="hidden lg:block w-1/2 sticky top-0 h-screen">
              <Map
                citydetail={{
                  centerLat: "43.6532",
                  centerLong: "-79.3832"
                }}
                datas={listings}
                heightt="calc(100vh - 2rem)"
                onClose={() => setShowMap(false)}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CityTownhomesPage;
