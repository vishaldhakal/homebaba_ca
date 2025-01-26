import Gallery from "@/components/listing/Gallery";
import Breadcrumbs from "@/components/Breadcrumbs";
import SocialMediaShare from "@/components/SocialMediaShare";
import ListingInfo from "@/components/listing/ListingInfo";
import SidebarContact from "@/components/listing/SidebarContact";

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
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="w-full">
          <Breadcrumbs />
          <Gallery images={images} projectName={house_detail.project_name} />
          <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
              <div className="col-span-2">
                <SocialMediaShare />
                <ListingInfo house_detail={house_detail} city={params.city} />
              </div>

              <div className="col-span-1 flex flex-col items-center min-w-[409px] space-y-8">
                <img
                  src="/reg.png"
                  alt="Register Now"
                  className="w-[200px] sm:w-[250px] rounded-lg !rounded-[8px] rounded overflow-hidden"
                  style={{ borderRadius: "8px" }}
                />
                <div className="sticky top-24 w-full flex justify-center">
                  <div className="w-[409px] min-w-[409px]">
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

            {/* <FAQ projectName={house_detail.project_name} />

            <RelatedListings
              listings={house_detail.related1}
              cityName={house_detail.city.name}
            /> */}
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
  };
}
