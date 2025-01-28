import { notFound } from "next/navigation";
import CityPage from "../../page";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

export const revalidate = 3600;

async function getCityData(cityName) {
  try {
    const res = await fetch(
      `https://api.homebaba.ca/api/pre-constructions-city/${cityName}/?project_type=Townhomes&perpage=100&page=1`,
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
    title: `${cityName} New Construction Townhomes (${cityData.data.totalCount}+ Listings)`,
    description: `Explore ${cityData.data.totalCount}+ new construction townhomes in ${cityName}. Find modern townhouses with pricing, floor plans, and builder information. Register for exclusive access.`,
    keywords: `${cityName} new townhomes, ${cityName} pre construction townhouses, new construction townhomes ${cityName}, ${cityName} townhouse developments, ${cityName} new townhouses`,
    openGraph: {
      url: `https://homebaba.ca/${params.city}/pre-construction/townhomes`,
      siteName: "Homebaba",
      title: `${cityName} New Construction Townhomes - Pre Construction Townhouses`,
      description: `Browse ${cityData.data.totalCount}+ new construction townhomes in ${cityName}. Get VIP access to upcoming townhouse projects, pricing, and floor plans.`,
      images: [cityData.data.results[0]?.images[0] || "/noimage.webp"],
    },
    alternates: {
      canonical: `https://homebaba.ca/${params.city}/pre-construction/townhomes`,
    },
  };
}

export default async function TownhomesPage({ params }) {
  try {
    return CityPage({
      params,
      searchParams: { project_type: "Townhomes" },
      pageType: "Townhomes",
    });
  } catch (error) {
    notFound();
  }
}
