import Link from "next/link";
import Heading from "@/components/design/Heading";

const CityLinks = () => {
  const gtaCities = [
    "Toronto",
    "Mississauga",
    "Brampton",
    "Vaughan",
    "Markham",
    "Oakville",
    "Burlington",
    "Milton",
    "Ajax",
    "Pickering",
    "Whitby",
    "Oshawa",
    "Calgary",
    "Edmonton",
    "Barrie",
  ];

  return (
    <section className="py-8">
      <div className="container">
        <Heading
          align="center"
          color="#1a1a1a"
          highlightColor="#FF0000"
          subtitle="Explore new construction homes across Canada"
          maxWidth="800px"
          className="mb-4"
        >
          New Construction Homes in <span className="text-red-600">Canada</span>
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-8 mt-4 max-w-[1200px] mx-auto px-2 md:px-4">
          {gtaCities.map((city) => (
            <div key={city} className="text-center py-3 md:py-4">
              <Link
                href={`/${city.toLowerCase()}`}
                className="block text-[0.95rem] md:text-[0.95rem] font-semibold text-[#1a1a1a] no-underline"
              >
                New Construction Homes in {city}
              </Link>
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-[#eee]">
                <Link
                  href={`/${city.toLowerCase()}/pre-construction/townhomes`}
                  className="block text-[0.85rem] md:text-[0.85rem] text-[#666] no-underline"
                >
                  New Construction Townhomes in {city}
                </Link>
                <Link
                  href={`/${city.toLowerCase()}/condos`}
                  className="block text-[0.85rem] md:text-[0.85rem] text-[#666] no-underline"
                >
                  New Construction Condos in {city}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityLinks;
