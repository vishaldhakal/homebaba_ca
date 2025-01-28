import { notFound } from "next/navigation";
import CityPage from "../page";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

export const revalidate = 3600;

async function getCityData(cityName) {
  try {
    const res = await fetch(
      `https://api.homebaba.ca/api/pre-constructions-city/${cityName}/?project_type=Condo&perpage=100&page=1`,
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
    title: `${cityName} New Construction Condos (${cityData.data.totalCount}+ Listings)`,
    description: `Browse ${cityData.data.totalCount}+ new construction condos in ${cityName}. Find luxury pre-construction condos with pricing, floor plans, and developer details. Register for VIP access.`,
    keywords: `${cityName} new condos, ${cityName} pre construction condos, new construction condos ${cityName}, ${cityName} condo developments, ${cityName} upcoming condos`,
    openGraph: {
      url: `https://homebaba.ca/${params.city}/condos`,
      siteName: "Homebaba",
      title: `${cityName} New Construction Condos - Pre Construction Condos`,
      description: `Discover ${cityData.data.totalCount}+ new construction condos in ${cityName}. Get VIP access to upcoming condo projects, pricing, and floor plans.`,
      images: [cityData.data.results[0]?.images[0] || "/noimage.webp"],
    },
    alternates: {
      canonical: `https://homebaba.ca/${params.city}/condos`,
    },
  };
}

export default async function CondosPage({ params }) {
  try {
    return CityPage({
      params,
      searchParams: { project_type: "Condo" },
      pageType: "Condo",
    });
  } catch (error) {
    notFound();
  }
}
