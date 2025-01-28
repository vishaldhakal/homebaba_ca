import { notFound } from "next/navigation";
import CityPage from "../../page";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

export const revalidate = 3600;

async function getCityData(cityName) {
  try {
    const res = await fetch(
      `https://api.homebaba.ca/api/pre-constructions-city/${cityName}/?project_type=Semi-Detached&perpage=100&page=1`,
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
    title: `${cityName} New Construction Semi-Detached Homes (${cityData.data.totalCount}+ Listings)`,
    description: `Discover ${cityData.data.totalCount}+ new construction semi-detached homes in ${cityName}. Find modern semi-detached houses with pricing, floor plans, and builder details. Register for VIP access.`,
    keywords: `${cityName} new semi-detached homes, ${cityName} pre construction semi-detached, new construction homes ${cityName}, ${cityName} semi-detached houses, ${cityName} new houses`,
    openGraph: {
      url: `https://homebaba.ca/${params.city}/pre-construction/semi-detached`,
      siteName: "Homebaba",
      title: `${cityName} New Construction Semi-Detached Homes - Pre Construction Houses`,
      description: `Browse ${cityData.data.totalCount}+ new construction semi-detached homes in ${cityName}. Get priority access to upcoming semi-detached projects, pricing, and floor plans.`,
      images: [cityData.data.results[0]?.images[0] || "/noimage.webp"],
    },
    alternates: {
      canonical: `https://homebaba.ca/${params.city}/pre-construction/semi-detached`,
    },
  };
}

export default async function SemiDetachedPage({ params }) {
  try {
    return CityPage({
      params,
      searchParams: { project_type: "Semi-Detached" },
      pageType: "Semi-Detached",
    });
  } catch (error) {
    notFound();
  }
}
