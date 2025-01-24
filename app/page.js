import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import RecentBlogs from "@/components/RecentBlogs";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import StatsSection from "@/components/StatsSection";
import CitiesSection from "@/components/CitiesSection";
import Testimonial from "@/components/Testimonial";
import HomebabaPromo from "@/components/HomebabaPromo";
import CallToAction from "@/components/CallToAction";
import Script from "next/script";

// Metadata configuration
export const metadata = {
  metadataBase: new URL("https://homebaba.ca"),
  title: "Homebaba - Canada's Leading New Construction Homes Platform",
  description:
    "Looking for New Construction Homes near Greater Toronto Area, Canada? From Townhomes to Detached and Condos Homebaba offer early access to all best New Construction Homes available.",
  authors: [{ name: "Homebaba", email: "info@homebaba.ca" }],
  openGraph: {
    type: "website",
    title: "Homebaba - Canada's Leading New Construction Homes Platform",
    description:
      "Looking for New Construction Homes near Greater Toronto Area, Canada? From Townhomes to Detached and Condos Homebaba offer early access to all best New Construction Homes available.",
    url: "https://homebaba.ca",
    siteName: "Homebaba",
    images: [{ url: "/aeee.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://homebaba.ca/" },
};

// Server-side data fetching
async function getBlogs() {
  try {
    const res = await fetch("https://api.homebaba.ca/api/posts/", {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch blogs");

    const data = await res.json();
    return data.data || { results: [] };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { results: [] };
  }
}

// Structured Data for SEO
const websiteSchema = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "Homebaba",
  url: "https://homebaba.ca",
  description: "Homebaba - Canada's Leading New Construction Homes Platform",
  image: "https://homebaba.ca/aeee.jpg",
  sameAs: [
    "https://www.facebook.com/thehomebaba/",
    "https://www.youtube.com/channel/UCz0QC6Avx_Q_oTENvpp6PWg",
    "https://www.instagram.com/homebabaa/",
    "https://www.linkedin.com/company/homebaba/about/?viewAsMember=true",
    "https://twitter.com/homebabaa",
    "https://www.tiktok.com/@homebabaa",
  ],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://homebaba.ca/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1 647-527-4970",
    contactType: "customer support",
  },
  openingHours: "Mo-Su 09:00-18:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Brampton Street",
    addressLocality: "Brampton",
    addressRegion: "ON",
    addressCountry: "CA",
  },
};

const corporationSchema = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "Homebaba INC",
  alternateName: "Homebaba",
  url: "https://homebaba.ca",
  logo: "https://homebaba.ca/aeee.jpg",
};

export default async function Home() {
  // Server-side data fetching
  const blogsData = await getBlogs();

  return (
    <>
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="schema-corporation"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(corporationSchema) }}
      />

      <HeroSection />
      <FeaturedProjects />
      <StatsSection />
      <CitiesSection />
      <Testimonial
        testimonialText="The deal I just closed was with a buyer from Homebaba—the very first person I connected with. I lead a team of six and have made Homebaba an essential tool for everyone on my team."
        authorName="Angela Yang"
        authorPosition="Broker of record"
        authorRole="Anchor New Homes Inc. Brokerage"
        companyLogo="/testmonials/A.png"
      />
      <HomebabaPromo />
      <CallToAction />
      <RecentBlogs blogs={blogsData} />

      <div className="flex flex-col items-center mb-8 md:mb-12">
        <Image
          src="/contact-bottom-2.png"
          alt="Real Estate Agent"
          width={300}
          height={300}
          className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
          priority
        />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Looking to buy a preconstruction home?
        </h1>
        <p className="text-gray-600 text-center text-sm md:text-base">
          Don't know where to start? Contact Homebaba now!
        </p>
      </div>
      <ContactForm />
    </>
  );
}
