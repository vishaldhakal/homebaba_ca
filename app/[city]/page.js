import { notFound } from "next/navigation";
import getPageMetadata from "@/helpers/getPageMetadata";
import CityPageClient from "@/components/CityPageClient";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }) {
  const cityData = await getCityData(params.city);
  
  return {
    title: `Top ${cityData.data.totalCount} ${capitalizeFirstLetter(
      params.city
    )} New Construction Homes, Condos & Townhomes`,
    keywords: `New Construction Homes, Condos & Townhomes, ${capitalizeFirstLetter(
      params.city
    )} New Construction Homes, ${capitalizeFirstLetter(
      params.city
    )} New Construction Condos, ${capitalizeFirstLetter(
      params.city
    )} New Construction Townhomes, ${capitalizeFirstLetter(
      params.city
    )} New Construction Homes for Sale, ${capitalizeFirstLetter(
      params.city
    )} New Construction Condos for Sale, ${capitalizeFirstLetter(
      params.city
    )} New Construction Townhomes for Sale`,
    description: `${
      cityData.data.totalCount
    }+ Pre construction homes for sale in ${capitalizeFirstLetter(
      params.city
    )}. Find New construction townhomes, single detached homes & condos. Check out price, plans, builders and availability on homebaba.`,
    openGraph: {
      url: `https://homebaba.ca/${params.city}`,
      siteName: "Homebaba",
      title: `${capitalizeFirstLetter(
        params.city
      )} New Construction Homes, Condos & Townhomes`,
      description: `${
        cityData.data.totalCount
      }+ Pre construction homes for sale in ${capitalizeFirstLetter(
        params.city
      )}. Find New construction townhomes, single detached homes & condos. Check out price, plans, builders and availability on homebaba.`,
      images: [cityData.data.results[0]?.images[0] || "/noimage.webp"],
    },
  };
}

async function getCityData(cityName, filters = {}) {
  try {
    const queryParams = new URLSearchParams({
      perpage: "100",
      page: "1",
      ...filters,
    });

    const res = await fetch(
      `https://api.homebaba.ca/api/pre-constructions-city/${cityName}/?${queryParams.toString()}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching city data:", error);
    return null;
  }
}

async function getFeaturedListings(cityName) {
  try {
    const res = await fetch(
      `https://api.homebaba.ca/api/featured-pre-constructions-city/${cityName}/`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch featured listings");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching featured listings:", error);
    return { data: { results: [] } };
  }
}

export default async function CityPage({ params, searchParams = {}, pageType }) {
  const cityData = await getCityData(params.city, searchParams);
  if (!cityData) {
    notFound();
  }

  const featuredListings = await getFeaturedListings(params.city);
  const metadata = getPageMetadata(
    pageType,
    params.city,
    cityData.data.totalCount,
    cityData.data.results[0]?.images[0]
  );

  return (
    <CityPageClient 
      cityData={cityData}
      featuredListings={featuredListings}
      params={params}
      metadata={metadata}
      searchParams={searchParams}
    />
  );
}
