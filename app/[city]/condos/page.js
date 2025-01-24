import ListingCard from "@/components/ListingCard";
import CityNav from "@/components/CityNav";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

// Client components
const MapToggle = dynamic(() => import("@/components/MapToggle"), {
  ssr: false,
});

export async function generateMetadata({ params }) {
  const cityData = await getCityData(params.city);

  return {
    title: `Top ${cityData.data.totalCount} ${capitalizeFirstLetter(
      params.city
    )} New Construction Condos`,
    description: `Looking for Pre construction condos in ${capitalizeFirstLetter(
      params.city
    )}? Discover ${
      cityData.data.totalCount
    } New Condo Developments. Get early access to details and floor plans now.`,
    openGraph: {
      title: `${capitalizeFirstLetter(params.city)} New Construction Condos`,
      description: `Discover new construction condos in ${capitalizeFirstLetter(
        params.city
      )}`,
      images: [cityData.data.results[0]?.images[0] || "/noimage.webp"],
    },
  };
}

async function getCityData(cityName) {
  const res = await fetch(
    `https://api.homebaba.ca/api/pre-constructions-condos-city/${cityName}/?perpage=100&page=1`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!res.ok) throw new Error("Failed to fetch city data");
  return res.json();
}

async function getFeaturedListings(cityName) {
  const res = await fetch(
    `https://api.homebaba.ca/api/pre-constructions-condos-city/${cityName}/?is_featured=true&perpage=10`
  );
  if (!res.ok) throw new Error("Failed to fetch featured listings");
  return res.json();
}

export default async function CondosPage({ params }) {
  const cityData = await getCityData(params.city);
  const featuredListings = await getFeaturedListings(params.city);

  // Pre-filter the projects and combine with featured listings
  const sellingProjects = cityData.data.results.filter(
    (item) => item.status === "Selling"
  );
  const upcomingProjects = cityData.data.results.filter(
    (item) => item.status === "Upcoming"
  );
  const soldOutProjects = cityData.data.results.filter(
    (item) => item.status === "Sold out"
  );

  // Create a Set of featured listing slugs for quick lookup
  const featuredSlugs = new Set(
    featuredListings.data.results.map((listing) => listing.slug)
  );

  // Combine and deduplicate featured and selling listings
  const combinedListings = [
    ...featuredListings.data.results,
    ...sellingProjects.filter((listing) => !featuredSlugs.has(listing.slug)),
  ];

  // Get city coordinates from the API response or use defaults
  const cityDetail = {
    centerLat: cityData.citydata?.latitude || "43.6532",
    centerLong: cityData.citydata?.longitude || "-79.3832",
  };

  return (
    <main className="min-h-screen bg-white font-montserrat">
      <CityNav cityName={params.city} />
      <div className="mx-auto px-4 md:px-10 py-5 max-w-8xl">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="w-full lg:w-auto">
              <h1 className="text-2xl md:text-2xl lg:text-[2.1rem] font-black mb-2">
                {cityData.data.totalCount} New Construction Condos in{" "}
                {capitalizeFirstLetter(params.city)} ({new Date().getFullYear()}
                )
              </h1>
              <h2 className="text-xs md:text-sm text-gray-600">
                {cityData.data.totalCount} New Pre construction Condos for sale
                in {capitalizeFirstLetter(params.city)} | Check out plans,
                pricing, availability for pre construction condos in{" "}
                {capitalizeFirstLetter(params.city)}
              </h2>
            </div>
            <div className="flex gap-2 w-full lg:w-auto justify-start lg:justify-end">
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
              <MapToggle cityDetail={cityDetail} listings={sellingProjects} />
            </div>
          </div>
        </div>

        {/* Main Listings Grid - Combined Featured and Selling */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
          {combinedListings.map((listing) => (
            <ListingCard
              key={listing.slug}
              listing={listing}
              isFeatured={featuredSlugs.has(listing.slug)}
              city={params.city}
            />
          ))}
        </div>

        {/* Upcoming Projects Section */}
        {upcomingProjects.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-4">
              Launching Soon - New Construction Condos in{" "}
              {capitalizeFirstLetter(params.city)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
              {upcomingProjects.map((listing, index) => (
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
        {soldOutProjects.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-4 text-red-600 italic">
              Sold out - New Construction Condos in{" "}
              {capitalizeFirstLetter(params.city)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
              {soldOutProjects.map((listing, index) => (
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

        {/* Contact Section */}
        <div className="my-32">
          <h3 className="text-center text-[3rem] font-bold">
            <span className="text-red-600">Be</span> Smart.{" "}
            <span className="text-red-600">Be</span> Quick
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
                {/* Partner Info Section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="w-full md:w-1/3 mx-auto">
                    {cityData.data.partnerdata &&
                    cityData.data.partnerdata[0] ? (
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
                  <div className="w-full md:w-2/3 text-center">
                    {cityData.data.partnerdata &&
                      cityData.data.partnerdata[0]?.partner_type !==
                        "Brokerage" && (
                        <h2 className="text-2xl font-bold text-gray-800">
                          {cityData.data.partnerdata[0].name}
                        </h2>
                      )}
                    <h2 className="text-2xl font-bold text-gray-800">
                      {cityData.data.partnerdata &&
                      cityData.data.partnerdata[0]?.brokerage_name
                        ? cityData.data.partnerdata[0].brokerage_name
                        : "Receive a Call"}
                    </h2>
                    <p className="text-gray-600">Speak to an expert agent</p>
                  </div>
                </div>
                <ContactForm defaultMessage=" " />
              </div>
            </div>
          </div>
        </div>

        {/* City Details Section */}
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
