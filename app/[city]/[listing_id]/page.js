import Gallery from "@/components/listing/Gallery";
import Breadcrumbs from "@/components/Breadcrumbs";
import SocialMediaShare from "@/components/SocialMediaShare";
import ListingInfo from "@/components/listing/ListingInfo";

/* import ContactForm from "@/components/listing/ContactForm";
import RelatedListings from "@/components/listing/RelatedListings";
import FAQ from "@/components/listing/FAQ";
import NewsLetter from "@/components/NewsLetter";
import WalkScore from "@/components/listing/WalkScore";
import LocationMap from "@/components/listing/LocationMap"; */

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

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs />
        <Gallery images={images} projectName={house_detail.project_name} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
          <div className="col-span-2">
            <SocialMediaShare />
            <ListingInfo house_detail={house_detail} city={params.city} />

            {/*  <WalkScore
              address={house_detail.project_address}
              projectName={house_detail.project_name}
            />

            <LocationMap
              latitude={house_detail.latitute}
              longitude={house_detail.longitude}
              address={house_detail.project_address}
              projectName={house_detail.project_name}
            /> */}
          </div>

          <div className="col-span-1">
            {/* <ContactForm
              partnerData={partnerdata}
              projectName={house_detail.project_name}
            /> */}
          </div>
        </div>

        {/* <NewsLetter /> */}

        {/* <FAQ projectName={house_detail.project_name} />

        <RelatedListings
          listings={house_detail.related1}
          cityName={house_detail.city.name}
        /> */}
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
  };
}
