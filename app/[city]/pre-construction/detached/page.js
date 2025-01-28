import { notFound } from "next/navigation";
import CityPage from "../../page";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

export const revalidate = 3600;

async function getCityData(cityName) {
  try {
    const res = await fetch(
      `https://api.homebaba.ca/api/pre-constructions-city/${cityName}/?project_type=Detached&perpage=100&page=1`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch city data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching city data:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const cityData = await getCityData(params.city);
  const cityName = capitalizeFirstLetter(params.city);

  return {
    title: `${cityName} New Construction Detached Homes (${cityData.data.totalCount}+ Listings)`,
    description: `Explore ${cityData.data.totalCount}+ new construction detached homes in ${cityName}. Find luxury single family homes with pricing, floor plans, and builder information. Register for priority access.`,
    keywords: `${cityName} new detached homes, ${cityName} pre construction houses, new construction homes ${cityName}, ${cityName} single family homes, ${cityName} new houses`,
    openGraph: {
      url: `https://homebaba.ca/${params.city}/pre-construction/detached`,
      siteName: "Homebaba",
      title: `${cityName} New Construction Detached Homes - Pre Construction Houses`,
      description: `Browse ${cityData.data.totalCount}+ new construction detached homes in ${cityName}. Get exclusive access to upcoming single family home projects, pricing, and floor plans.`,
      images: [cityData.data.results[0]?.images[0] || "/noimage.webp"],
    },
    alternates: {
      canonical: `https://homebaba.ca/${params.city}/pre-construction/detached`,
    },
  };
}

export default async function DetachedPage({ params }) {
  try {
    return CityPage({
      params,
      searchParams: { project_type: "Detached" },
      pageType: "Detached",
    });
  } catch (error) {
    notFound();
  }
}
