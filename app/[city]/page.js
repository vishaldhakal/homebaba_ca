import ListingCard from "@/components/ListingCard";
import CityNav from "@/components/CityNav";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import CityFilters from "@/components/CityFilters";
import QuickLinks from "@/components/QuickLinks";
import getPageMetadata from "@/helpers/getPageMetadata";
import { notFound } from "next/navigation";

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
    alternates: {
      canonical: `https://homebaba.ca/${params.city}`,
    },
  };
}

async function getCityData(cityName, filters = {}) {
  try {
    let url = `https://api.homebaba.ca/api/pre-constructions-city/${cityName}/?perpage=100&page=1`;

    if (filters.project_type) {
      url += `&project_type=${encodeURIComponent(filters.project_type)}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch city data");
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
      `https://api.homebaba.ca/api/pre-constructions-city/${cityName}/?is_featured=true&perpage=10`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch featured listings");
    return res.json();
  } catch (error) {
    console.error("Error fetching featured listings:", error);
    return null;
  }
}

export default async function CityPage({
  params,
  searchParams = {},
  pageType,
}) {
  const cityData = await getCityData(params.city, searchParams);
  if (!cityData) {
    notFound();
  }

  const featuredListings = await getFeaturedListings(params.city);
  const metadata = getPageMetadata(
    pageType,
    params.city,
    cityData.data.totalCount
  );

  console.log("Received params:", params); // Debug
  console.log("Received searchParams:", searchParams); // Debug

  // Ensure searchParams is an object and normalize the values
  const filters = {
    project_type: searchParams?.project_type || "",
    price_range: searchParams?.price_range || "",
  };

  console.log("Applied filters:", filters); // Debug

  try {
    const filteredprojects = (value) => {
      return cityData.data.results.filter((item) => item.status == value);
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
              <div className="flex-row items-center gap-2 text-sm text-gray-600 text-center md:text-start border border-gray-400 p-2 rounded-[5px] hidden md:flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  class="bi bi-map"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L8.707 8l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
                  ></path>
                </svg>
                Map View
              </div>
            </div>
            <h2 className="text-sm text-gray-600 text-center md:text-start">
              {metadata.subtitle}
            </h2>
          </div>

          {/* Filters at the top */}
          <CityFilters filters={filters} cityName={params.city} />

          {/* Selling Projects Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
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
                    {cityData.data.partnerdata && partnerdata[0] ? (
                      <Image
                        src={partnerdata[0].image}
                        alt={partnerdata[0].name}
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
                      partnerdata[0] &&
                      partnerdata[0].partner_type !== "Brokerage" && (
                        <h2 className="text-2xl font-bold text-gray-800 text-center">
                          {partnerdata[0].name}
                        </h2>
                      )}
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                      {cityData.data.partnerdata &&
                      partnerdata[0] &&
                      partnerdata[0].brokerage_name
                        ? partnerdata[0].brokerage_name
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
  } catch (error) {
    console.error("Error in CityPage:", error);
    // Handle error appropriately
    return <div>Error loading listings</div>;
  }
}
