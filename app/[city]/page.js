import ListingCard from "@/components/ListingCard";
import CityNav from "@/components/CityNav";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

export async function generateMetadata({ params }) {
  const cityData = await getCityData(params.city);

  return {
    title: `Top ${cityData.data.totalCount} ${capitalizeFirstLetter(
      params.city
    )} New Construction Homes & Condos`,
    description: `Looking for Pre construction in ${capitalizeFirstLetter(
      params.city
    )}? Discover ${
      cityData.data.totalCount
    } New Homes and Condo Developments. Get early access to details and floor plans now.`,
    openGraph: {
      title: `${capitalizeFirstLetter(
        params.city
      )} New Construction Homes & Condos`,
      description: `Discover new construction homes in ${capitalizeFirstLetter(
        params.city
      )}`,
      images: [cityData.data.results[0]?.images[0] || "/noimage.webp"],
    },
  };
}

async function getCityData(cityName) {
  const res = await fetch(
    `https://api.homebaba.ca/api/pre-constructions-city/${cityName}/?perpage=100&page=1`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!res.ok) throw new Error("Failed to fetch city data");
  return res.json();
}

async function getFeaturedListings(cityName) {
  const res = await fetch(
    `https://api.homebaba.ca/api/pre-constructions-city/${cityName}/?is_featured=true&perpage=10`
  );
  if (!res.ok) throw new Error("Failed to fetch featured listings");
  return res.json();
}

export default async function CityPage({ params }) {
  const cityData = await getCityData(params.city);
  const featuredListings = await getFeaturedListings(params.city);

  // Helper function to capitalize city name

  const filteredprojects = (value) => {
    return cityData.data.results.filter((item) => item.status == value);
  };

  return (
    <main className="min-h-screen bg-white font-montserrat">
      <CityNav />

      <div className="mx-auto px-4 md:px-10 py-5 max-w-8xl">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-[1.7rem] font-bold text-gray-900 mb-2">
              {cityData.data.totalCount} New Construction Detached & Townhomes
              in {capitalizeFirstLetter(params.city)}
            </h1>
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-gray-700 py-1"
            >
              New Construction Condos in {capitalizeFirstLetter(params.city)}
            </Button>
          </div>
          <h2 className="text-sm text-gray-600">
            {cityData.data.totalCount} New Pre construction Detached, Townhomes,
            or Condos for sale in {capitalizeFirstLetter(params.city)}, Ontario
            | Check out plans, pricing, availability for preconstruction homes
            in {capitalizeFirstLetter(params.city)}
          </h2>
        </div>

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
                src="/contact-me-design.webp"
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
                      src="/contact-form.png"
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
}
