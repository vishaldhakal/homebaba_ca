import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ListingCard from "@/components/ListingCard";

async function getDeveloperProjects(slug) {
  try {
    const response = await fetch(
      `https://api.homebaba.ca/api/pre-constructions-developer/${slug}/`,
      {
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );
    
    if (!response.ok) {
      return notFound();
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching developer projects:", error);
    return notFound();
  }
}

export async function generateMetadata({ params }) {
  const data = await getDeveloperProjects(params.slug);
  if (!data.results.length) return {};
  
  const developer = data.results[0].developer;
  
  return {
    title: `${developer.name} New Construction Homes & Pre Construction Projects`,
    description: `Explore ${data.totalCount}+ new construction homes & pre construction projects by ${developer.name}. Find pricing, plans, and availability for townhomes, condos & houses on homebaba.`,
    openGraph: {
      title: `${developer.name} New Construction Homes & Pre Construction Projects`,
      description: `Explore ${data.totalCount}+ new construction homes & pre construction projects by ${developer.name}. Find pricing, plans, and availability for townhomes, condos & houses on homebaba.`,
      images: [developer.image || "/placeholder-developer.png"],
    },
  };
}

export default async function DeveloperPage({ params }) {
  const data = await getDeveloperProjects(params.slug);
  const developerProjects = data.results;
  const developer = developerProjects[0]?.developer;

  if (!developer) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          New Construction Homes by {developer.name}
        </h1>
        <div className="max-w-[700px] mx-auto">
          <p className="text-gray-600 text-s">
            Check out currently Selling, Upcoming or Past Communities by {developer.name}.
            Check out plans, pricing, availability for preconstruction homes by {developer.name}.
          </p>
        </div>
        <div className="flex justify-center items-center gap-6 mb-8">
          <div className="relative h-24 w-24">
            <Image
              src={developer.image || "/placeholder-developer.png"}
              alt={developer.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developerProjects.map((project, index) => (
          <ListingCard
            key={project.id}
            listing={project}
            city="pre-construction"
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
