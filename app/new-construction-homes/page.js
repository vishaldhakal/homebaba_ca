import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import CityLinks from "@/components/CityLinks";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export const revalidate = 3600;

const cities = [
  "toronto",
  "mississauga",
  "brampton",
  "vaughan",
  "oakville",
  "milton",
  "burlington",
  "markham",
  "richmond-hill",
  "oshawa",
];

const cityTitles = {
  toronto: {
    title:
      "Luxury High-Rise Living in Downtown Toronto's Most Sought-After Locations",
    links: [
      { label: "New Condos", path: "/toronto/condos" },
      { label: "Under $800K", path: "/toronto/price-range/0-800k" },
      { label: "New Townhomes", path: "/toronto/pre-construction/townhomes" },
    ],
  },
  mississauga: {
    title: "Modern Living in Mississauga's Transit-Oriented Communities",
    links: [
      { label: "New Condos", path: "/mississauga/condos" },
      { label: "Under $700K", path: "/mississauga/price-range/0-700k" },
      {
        label: "New Townhomes",
        path: "/mississauga/pre-construction/townhomes",
      },
    ],
  },
  brampton: {
    title: "Affordable Family Homes in Brampton's Growing Neighborhoods",
    links: [
      { label: "New Condos", path: "/brampton/condos" },
      { label: "Under $600K", path: "/brampton/price-range/0-600k" },
      { label: "New Townhomes", path: "/brampton/pre-construction/townhomes" },
    ],
  },
  vaughan: {
    title: "Luxury Living in Vaughan's Metropolitan Centre",
    links: [
      { label: "New Condos", path: "/vaughan/condos" },
      { label: "Under $800K", path: "/vaughan/price-range/0-800k" },
      { label: "New Townhomes", path: "/vaughan/pre-construction/townhomes" },
    ],
  },
  oakville: {
    title: "Upscale Lakefront Living in Oakville's Premium Locations",
    links: [
      { label: "New Condos", path: "/oakville/condos" },
      { label: "Under $900K", path: "/oakville/price-range/0-900k" },
      { label: "New Townhomes", path: "/oakville/pre-construction/townhomes" },
    ],
  },
  milton: {
    title: "Smart Investment Opportunities in Milton's Growing Community",
    links: [
      { label: "New Condos", path: "/milton/condos" },
      { label: "Under $750K", path: "/milton/price-range/0-750k" },
      { label: "New Townhomes", path: "/milton/pre-construction/townhomes" },
    ],
  },
  burlington: {
    title: "Waterfront Living in Burlington's Exclusive Neighborhoods",
    links: [
      { label: "New Condos", path: "/burlington/condos" },
      { label: "Under $850K", path: "/burlington/price-range/0-850k" },
      {
        label: "New Townhomes",
        path: "/burlington/pre-construction/townhomes",
      },
    ],
  },
  markham: {
    title: "Tech Hub Living in Markham's Innovation Corridor",
    links: [
      { label: "New Condos", path: "/markham/condos" },
      { label: "Under $800K", path: "/markham/price-range/0-800k" },
      { label: "New Townhomes", path: "/markham/pre-construction/townhomes" },
    ],
  },
  "richmond-hill": {
    title: "Exclusive Homes in Richmond Hill's Premium Estates",
    links: [
      { label: "New Condos", path: "/richmond-hill/condos" },
      { label: "Under $850K", path: "/richmond-hill/price-range/0-850k" },
      {
        label: "New Townhomes",
        path: "/richmond-hill/pre-construction/townhomes",
      },
    ],
  },
  oshawa: {
    title: "Affordable Luxury in Oshawa's Emerging Communities",
    links: [
      { label: "New Condos", path: "/oshawa/condos" },
      { label: "Under $600K", path: "/oshawa/price-range/0-600k" },
      { label: "New Townhomes", path: "/oshawa/pre-construction/townhomes" },
    ],
  },
};

async function getCityData(cityName) {
  try {
    const res = await fetch(
      `https://api.homebaba.ca/api/pre-constructions-city/${cityName}/?perpage=4&page=1`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data for ${cityName}`);
    }

    const data = await res.json();
    return data.data || { results: [] };
  } catch (error) {
    console.error(`Error fetching ${cityName} data:`, error);
    return { results: [] };
  }
}

async function getTotalListings() {
  try {
    const allCitiesData = await Promise.all(
      cities.map((city) => getCityData(city))
    );

    const totalCount = allCitiesData.reduce((total, cityData) => {
      return total + (cityData.totalCount || 0);
    }, 0);

    return totalCount;
  } catch (error) {
    console.error("Error getting total listings:", error);
    return 0;
  }
}

export async function generateMetadata() {
  const totalListings = await getTotalListings();

  return {
    title: `New Construction Homes in Canada (${totalListings}+ Pre Construction Projects)`,
    description: `Discover ${totalListings}+ new construction homes across Canada. Browse pre-construction condos, townhouses & detached homes in Toronto, Mississauga, Brampton & more. Get VIP access to floor plans, pricing & exclusive launches.`,
    keywords:
      "new construction homes Canada, pre construction homes, new condos Canada, new townhomes Canada, pre construction condos, new houses Canada, vip access new homes",
    openGraph: {
      url: "https://homebaba.ca/new-construction-homes",
      siteName: "Homebaba",
      title: "New Construction Homes Canada - Pre Construction Projects",
      description: `Explore ${totalListings}+ new construction homes in Canada's top cities. Find pre-construction condos, townhouses & single-family homes with exclusive VIP access to launches, pricing & floor plans.`,
      images: [
        {
          url: "https://homebaba.ca/og-image.jpg", // Add your default OG image
          width: 1200,
          height: 630,
          alt: "New Construction Homes Canada",
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    alternates: {
      canonical: "https://homebaba.ca/new-construction-homes",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "New Construction Homes Canada - Pre Construction Projects",
      description: `Browse ${totalListings}+ new construction homes in Canada. Find pre-construction condos, townhouses & houses with VIP access.`,
      images: ["https://homebaba.ca/aeee.jpg"], // Add your Twitter card image
    },
  };
}

export default async function NewConstructionHomes() {
  const cityDataPromises = cities.map((city) => getCityData(city));
  const citiesData = await Promise.all(cityDataPromises);

  const cityResults = cities.reduce((acc, city, index) => {
    acc[city] = citiesData[index];
    return acc;
  }, {});

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {cities.map((city, index) => (
          <div
            key={city}
            className={`mb-16 ${index !== cities.length - 1 ? "pb-16" : ""}`}
          >
            <div className="mb-8 text-center max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-center max-w-3xl">
                  {cityTitles[city].title}
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {cityTitles[city].links.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className="text-sm text-gray-600 py-1.5 px-4 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href={`/${city}`}
                    className="text-sm text-primary hover:text-primary/80 py-1.5 px-4 border border-primary rounded-full hover:bg-primary/5 transition-colors"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {cityResults[city]?.results?.slice(0, 4).map((listing) => (
                <>
                  <ListingCard key={listing.id} listing={listing} city={city} />
                </>
              ))}
              {cityResults[city]?.results?.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">
                    No listings available in {city} at the moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="my-10 md:my-32"></div>
      <CityLinks />

      <div className="flex flex-col items-center mb-4 md:mb-5">
        <Image
          src="/contact-bottom-2.png"
          alt="Real Estate Agent"
          width={300}
          height={300}
          className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
          priority
        />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Looking to buy a New Home?
        </h2>
        <p className="text-gray-600 text-center text-sm md:text-base">
          Don't know where to start? Contact Homebaba now!
        </p>
      </div>
      <ContactForm />
    </>
  );
}
