import Gallery from "@/components/listing/Gallery";
import Breadcrumbs from "@/components/Breadcrumbs";
import SocialMediaShare from "@/components/SocialMediaShare";
import ListingInfo from "@/components/listing/ListingInfo";
import SidebarContact from "@/components/listing/SidebarContact";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

async function getListingData(listingId) {
  const response = await fetch(
    `https://api.homebaba.ca/api/pre-constructions/${listingId}/`,
    {
      next: { revalidate: 600 }, // Revalidate every 10 minutes
    }
  );
  return response.json();
}

export default async function ListingPage({ params }) {
  const data = await getListingData(params.listing_id);
  const { house_detail, images, partnerdata } = data;

  const accordionData = [
    {
      title: "Who is the builder for " + house_detail.project_name + " ?",
      content: (
        <strong>
          {house_detail.project_name} is developed by{" "}
          {house_detail.developer.name}
        </strong>
      ),
    },
    {
      title: "Where is " + house_detail.project_name + " located ?",
      content: (
        <strong>
          {house_detail.project_name} is located in{" "}
          {house_detail.project_address}
        </strong>
      ),
    },
    {
      title:
        "What is the starting price for the homes or unit in " +
        house_detail.project_name +
        " ?",
      content: (
        <strong>
          The price of the homes or unit could change. Please contact the real
          estate agent{" "}
          <a
            href="#mycontact"
            className="text-primary text-decoration-underline"
          >
            here
          </a>{" "}
          to get more information
        </strong>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createSchema(house_detail)),
        }}
      />
      <div className="max-w-7xl mx-auto px-0 sm:px-4">
        <div className="w-full mt-2 md:mt-4 px-2 md:px-0">
          <Breadcrumbs />
          <Gallery images={images} projectName={house_detail.project_name} />
          <div className="max-w-5xl mx-auto px-2 sm:px-8 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8 mt-8">
              <div className="col-span-2 pe-0 md:pe-2">
                <SocialMediaShare />
                <ListingInfo house_detail={house_detail} city={params.city} />
              </div>

              <div className="col-span-1 flex flex-col items-center mt-14 md:mt-0">
                <img
                  src="/reg.png"
                  alt="Register Now"
                  className="w-[200px] sm:w-[250px] rounded-xl overflow-hidden"
                  style={{ borderRadius: "8px" }}
                />
                <div className="sticky top-24 w-full flex justify-center">
                  <div className="w-[350px] min-w-[350px] mx-auto">
                    <SidebarContact
                      projectName={house_detail.project_name}
                      city={params.city}
                      partnerdata={partnerdata}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <NewsLetter /> */}

            <div className="max-w-3xl mx-auto mt-40">
              <h2 className="text-2xl font-extrabold text-center my-4 border-b border-gray-800 pb-4">
                Frequently Asked Questions about {house_detail.project_name}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {accordionData.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="hover:no-underline text-start items-center">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="mt-40"></div>
            <div className="hidden md:block">
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Generate metadata
export async function generateMetadata({ params }) {
  const data = await getListingData(params.listing_id);
  const { house_detail } = data;

  return {
    title: house_detail.meta_title,
    description: house_detail.meta_description,
    openGraph: {
      title: house_detail.meta_title,
      description: house_detail.meta_description,
      images: data.images[0]?.images || "https://homebaba.ca/noimage.webp",
    },
    alternates: {
      canonical: `https://homebaba.ca/${params.city}/${params.listing_id}`,
    },
  };
}
