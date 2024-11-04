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
  ];

  const socialLinks = [
    { icon: "/icons/facebook.svg", link: "https://facebook.com/homebaba" },
    { icon: "/icons/youtube.png", link: "https://youtube.com/homebaba" },
    { icon: "/icons/instagram.svg", link: "https://instagram.com/homebaba" },
    {
      icon: "/icons/linkedin.svg",
      link: "https://linkedin.com/company/homebaba",
    },
    { icon: "/icons/twitter.png", link: "https://twitter.com/homebaba" },
    { icon: "/icons/tiktok.png", link: "https://tiktok.com/@homebaba" },
  ];

  return (
    <footer className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {/* Company Info Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-center md:justify-start mb-5">
            <span className="text-3xl md:text-4xl font-bold">homebaba</span>
            <Image
              src="/maple-leaf.svg"
              alt="Maple Leaf Icon for Logo"
              width={30}
              height={30}
            />
          </div>
          <p className="text-sm text-black mb-6 max-w-xs mx-auto md:mx-0 leading-5 font-light text-center md:text-left">
            Homebaba is the online Database for new Pre construction detached,
            semi-detached, townhomes and condos in Canada. Homebaba does not
            represent any builder. The content of the pages of this website is
            for your general information, reference only. We are not liable for
            the use or misuse of the site's information. Prices, sizes,
            specifications, and promotions of the condos are subject to change
            by the builder without notice. E&OE
          </p>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 mb-3 text-center md:text-left">
              Company
            </h3>
            <div className="space-y-2 text-center md:text-left">
              <Link
                href="/work-with-us"
                className="block text-gray-600 hover:text-gray-900"
              >
                Work with us
              </Link>
              <Link
                href="/blogs"
                className="block text-gray-600 hover:text-gray-900"
              >
                Blogs
              </Link>
              <Link
                href="/contact-us"
                className="block text-gray-600 hover:text-gray-900"
              >
                Contact us
              </Link>
              <Link
                href="/privacy-policy"
                className="block text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Popular Cities Section - Single column */}
        <div className="space-y-6">
          <h3 className="font-bold text-gray-900 mb-4 text-lg text-center">
            Popular Cities
          </h3>
          <div className="grid grid-cols-1 gap-2 max-w-xs mx-auto">
            {popularCities.map((city) => (
              <Link
                key={city.name}
                href={city.link}
                className="text-sm text-gray-600 hover:text-gray-900 text-center"
              >
                Pre construction homes in {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Pre construction condos Section - Single column */}
        <div className="space-y-6">
          <h3 className="font-bold text-gray-900 mb-4 text-lg text-center">
            Pre construction condos
          </h3>
          <div className="grid grid-cols-1 gap-2 max-w-xs mx-auto">
            {popularCities.map((city) => (
              <Link
                key={city.name}
                href={city.link.replace("homes", "condos")}
                className="text-sm text-gray-600 hover:text-gray-900 text-center"
              >
                Pre construction condos in {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Social Links and Copyright */}
      <div className="mt-16 text-center">
        <div className="flex justify-center gap-8 mb-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <Image
                src={social.icon}
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-500">©2024 Homebaba</p>
      </div>
    </footer>
  );
};

export default Footer;
