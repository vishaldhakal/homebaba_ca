import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const popularCities = [
    { name: "Ajax", link: "/pre-construction-homes-in-ajax" },
    { name: "Aurora", link: "/pre-construction-homes-in-aurora" },
    { name: "Barrie", link: "/pre-construction-homes-in-barrie" },
    { name: "Brampton", link: "/pre-construction-homes-in-brampton" },
    { name: "Burlington", link: "/pre-construction-homes-in-burlington" },
    { name: "Calgary", link: "/pre-construction-homes-in-calgary" },
    { name: "Cambridge", link: "/pre-construction-homes-in-cambridge" },
    { name: "Georgetown", link: "/pre-construction-homes-in-georgetown" },
    { name: "Grimsby", link: "/pre-construction-homes-in-grimsby" },
    { name: "Hamilton", link: "/pre-construction-homes-in-hamilton" },
    { name: "Innisfil", link: "/pre-construction-homes-in-innisfil" },
    { name: "Kitchener", link: "/pre-construction-homes-in-kitchener" },
    { name: "Markham", link: "/pre-construction-homes-in-markham" },
    { name: "Milton", link: "/pre-construction-homes-in-milton" },
    { name: "Mississauga", link: "/pre-construction-homes-in-mississauga" },
    { name: "Niagara", link: "/pre-construction-homes-in-niagara" },
    { name: "Oakville", link: "/pre-construction-homes-in-oakville" },
    { name: "Oshawa", link: "/pre-construction-homes-in-oshawa" },
    { name: "Ottawa", link: "/pre-construction-homes-in-ottawa" },
    { name: "Thorold", link: "/pre-construction-homes-in-thorold" },
    { name: "Toronto", link: "/pre-construction-homes-in-toronto" },
    { name: "Vaughan", link: "/pre-construction-homes-in-vaughan" },
    { name: "Waterloo", link: "/pre-construction-homes-in-waterloo" },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const socialLinks = [
    { icon: "/icons/facebook.svg", link: "https://www.facebook.com/thehomebaba/" },
    { icon: "/icons/youtube.png", link: "https://www.youtube.com/channel/UCz0QC6Avx_Q_oTENvpp6PWg" },
    { icon: "/icons/instagram.svg", link: "https://instagram.com/homebaba" },
    { icon: "/icons/linkedin.svg", link: "https://linkedin.com/company/homebaba" },
    { icon: "/icons/twitter.png", link: "https://twitter.com/homebaba" },
    { icon: "/icons/tiktok.png", link: "https://tiktok.com/@homebaba" },
  ];

  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-4">
          {/* Column 1: Company Info */}
          <div className="my-3">
            <Link href="/" className="inline-flex items-center">
              <span className="text-2xl font-bold">homebaba</span>
              <Image
                src="/canadaleaf.svg"
                alt="canada maple leaf"
                width={24}
                height={24}
                className="ml-1"
              />
            </Link>
            <p className="mt-3 text-sm text-gray-600 text-justify">
              Homebaba is the online Database for new Pre construction detached,
              semi-detached, townhomes and condos in Canada. Homebaba does not
              represent any builder. The content of the pages of this website is
              for your general information, reference only. We are not liable for
              the use or misuse of the site's information. Prices, sizes,
              specifications, and promotions of the condos are subject to change
              by the builder without notice. E&OE
            </p>
            <div className="mt-3">
              <h5 className="font-bold text-gray-900 mb-3">Company</h5>
              <div className="flex flex-col space-y-2">
                <Link href="/work-with-us" className="text-gray-600 hover:text-gray-900">
                  Work with us
                </Link>
                <Link href="/blogs" className="text-gray-600 hover:text-gray-900">
                  Blogs
                </Link>
                <Link href="/contact-us" className="text-gray-600 hover:text-gray-900">
                  Contact us
                </Link>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Popular Cities */}
          <div className="my-3">
            <h5 className="font-bold text-gray-900 mb-3">Popular Cities</h5>
            <div className="flex flex-col space-y-2">
              {popularCities.map((city) => (
                <Link
                  key={city.name}
                  href={city.link}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Pre construction homes in {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Pre construction condos */}
          <div className="my-3">
            <h5 className="font-bold text-gray-900 mb-3">Pre construction condos</h5>
            <div className="flex flex-col space-y-2">
              {popularCities.map((city) => (
                <Link
                  key={city.name}
                  href={city.link.replace("homes", "condos")}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Pre construction condos in {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Pre construction Townhomes */}
          <div className="my-3">
            <h5 className="font-bold text-gray-900 mb-3">Pre construction Townhomes</h5>
            <div className="flex flex-col space-y-2">
              {popularCities.map((city) => (
                <Link
                  key={city.name}
                  href={`${city.link}/townhomes`}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Pre construction townhomes in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="py-5 flex flex-col items-center">
          <div className="grid grid-cols-6 gap-4 w-1/3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center"
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 mx-auto"
                />
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">2025 Homebaba</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
