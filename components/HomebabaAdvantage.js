const HomebabaAdvantage = () => {
  const images = [
    "/homebaba-team/1.jpg",
    "/homebaba-team/2.jpg",
    "/homebaba-team/3.jpg",
    "/homebaba-team/4.jpg",
    "/homebaba-team/5.jpg",
  ];

  return (
    <section className="py-12 md:py-16 px-6 md:px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-xl md:text-4xl font-normal mb-2 md:mb-4">
          The Homebaba Advantage -{" "}
          <span className="font-bold">Always people at heart</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
          Working hand in hand with leading Pre construction Homes, Condos
          Developers & Industry Partners
        </p>
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
