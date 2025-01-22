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

async function getBlogs() {
  try {
    const res = await fetch("https://api.homebaba.ca/api/posts/", {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return { results: [] };
    }

    const data = await res.json();
    return data.data || { results: [] };
  } catch (error) {
    return { results: [] };
  }
}

export default async function Home() {
  const blogsData = await getBlogs();

  return (
    <>
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
      <RecentBlogs blogs={blogsData} key={Date.now()} />
      <div className="flex flex-col items-center mb-8 md:mb-12">
        <Image
          src="/contact-bottom-2.png"
          alt="Real Estate Agent"
          width={300}
          height={300}
          className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Looking to buy a preconstruction home?
        </h1>
        <p className="text-gray-600 text-center text-sm md:text-base">
          Don't know where to start? Contact Homebaba now!
        </p>
        {/* <p></p> */}
      </div>
      <ContactForm />
    </>
  );
}
