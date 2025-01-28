import Image from "next/image";
import Link from "next/link";

async function getDevelopers() {
  const response = await fetch("https://api.homebaba.ca/api/developers/", {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  const data = await response.json();
  return data.data;
}

export async function generateMetadata() {
  const developers = await getDevelopers();

  return {
    title: "Top Home Builders & Developers in Canada | New Construction Homes",
    description: `Discover ${developers.length}+ top rated home builders and developers in Canada. Find new construction homes, condos & townhomes by leading builders on homebaba.`,
    keywords:
      "home builders Canada, property developers, new construction builders, Canadian developers, real estate developers, condo builders, residential developers",
    openGraph: {
      url: "https://homebaba.ca/developers",
      siteName: "Homebaba",
      title:
        "Top Home Builders & Developers in Canada | New Construction Homes",
      description: `Browse ${developers.length}+ leading home builders and developers in Canada. Find your perfect new construction home from trusted builders.`,
      images: [
        {
          url: "https://homebaba.ca/aeee.jpg",
          width: 1200,
          height: 630,
          alt: "Top Home Builders in Canada",
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    alternates: {
      canonical: "https://homebaba.ca/developers",
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
      title: "Top Home Builders & Developers in Canada",
      description: `Explore ${developers.length}+ leading Canadian home builders and their new construction projects.`,
      images: ["https://homebaba.ca/aeee.jpg"],
    },
  };
}

export default async function DevelopersPage() {
  const developers = await getDevelopers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Leading Home Builders in Canada
        </h1>
        <div className="max-w-[700px] mx-auto">
          <p className="text-gray-600 text-lg">
            Explore the builders behind your favourite condominium & freehold
            home projects. These developers are driven by a passion to transform
            ideas into tangible structures, demonstrating leading-edge practices
            year after year.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {developers.map((developer) => (
          <Link
            key={developer.id}
            href={`/developers/${developer.slug}`}
            className="group"
          >
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col items-center justify-center">
              <div className="relative h-24 w-full mb-4">
                <Image
                  src={developer.image || "/placeholder-developer.png"}
                  alt={developer.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h2 className="text-center text-gray-900 font-medium text-sm">
                {developer.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
