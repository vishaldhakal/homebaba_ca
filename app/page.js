import HeroSection from "@/components/HeroSection";
import TopProjects from "@/components/TopProjects";
import PropertyTypes from "@/components/PropertyTypes";
import HomebabaAdvantage from "@/components/HomebabaAdvantage";
import RecentBlogs from "@/components/RecentBlogs";
import Communities from "@/components/Communities";
import ContactForm from "@/components/ContactForm";
import NewsLetter from "@/components/NewsLetter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TopProjects />
      <PropertyTypes />
      <HomebabaAdvantage />
      <Communities />
      <RecentBlogs />
      <ContactForm />
      <NewsLetter />
    </>
  );
}
