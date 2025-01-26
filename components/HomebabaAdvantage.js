import Heading from "@/components/design/Heading";

const HomebabaAdvantage = () => {
  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
  ];

  return (
    <section className="py-12 md:py-16 px-6 md:px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <Heading
          subtitle="Working hand in hand with leading Pre construction Homes, Condos
          Developers & Industry Partners"
          align="center"
          maxWidthsubtitle="100px"
          maxWidth="100%"
        >
          The Homebaba Advantage - Always people at heart
        </Heading>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[9/16] overflow-hidden rounded-lg"
          >
            <img
              src={image}
              alt={`Partner ${index + 1}`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-12 hidden md:block">
        <img src="/branding-image.png" alt="" className="w-full" />
      </div>
    </section>
  );
};

export default HomebabaAdvantage;
