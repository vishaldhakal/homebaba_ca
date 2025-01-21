import Image from "next/image";

export default function CallToAction() {
  return (
    <section className="my-48">
      <div className="w-full bg-[#EBF5FF]">
        <div className="container mx-auto mt-20 pb-12 mb-16">
          <div className="relative min-h-[200px] flex items-center">
            {/* Building Image */}
            <div className="absolute left-0 bottom-0 w-[400px] md:w-[500px] h-[300px] md:h-[400px] -mb-20">
              <Image
                src="/landingImages/calgarypng.png"
                alt="condo in calgary"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>

            {/* Content Side */}
            <div className="ml-auto w-full md:w-1/2 py-12 px-4">
              <div className="flex items-center gap-2 mb-0">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">homebaba</span>
                <Image
                  src="/canadaleaf.svg"
                  alt="canada maple leaf"
                  width={24}
                  height={24}
                  className="mt-1"
                />
              </div>

              <p className="text-gray-700 text-base md:text-lg mb-4">
                Homebaba has one of the largest, most updated database of new
                construction homes, backed by industry-leading technology and partners.
              </p>

              <div>
                <p className="text-gray-900 font-semibold text-sm mb-1">
                  Trusted by 50k+ Canadians
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-amber-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
