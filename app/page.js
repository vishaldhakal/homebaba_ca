import HeroSection from "@/components/HeroSection";
import TopProjects from "@/components/TopProjects";
import PropertyTypes from "@/components/PropertyTypes";
import HomebabaAdvantage from "@/components/HomebabaAdvantage";
import RecentBlogs from "@/components/RecentBlogs";
import Communities from "@/components/Communities";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TopProjects />
      <PropertyTypes />
      <HomebabaAdvantage />
      <Communities />
      <RecentBlogs />
      <div className="flex flex-col items-center mb-8 md:mb-12">
        <Image
          src="/contact-person.png"
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
      </div>
      <ContactForm />
    </>
  );
}
