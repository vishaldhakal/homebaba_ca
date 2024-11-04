const Communities = () => {
  const communities = {
    Ajax: [
      "Five",
      "Manhattan Place",
      "Paradise Beach",
      "aTowns",
      "Eagle Woods",
    ],
    Brampton: [
      "Classic Drive Homes",
      "Duo Condos (Phase 2)",
      "Mattamy Union Brampton",
      "Daniels MPV2 Condos",
      "Primont Place Condos",
    ],
    Burlington: [
      "Realm II Condos",
      "35 Plains Road Condos",
      "BeauSoleil Condos",
      "Waldemar Condos",
      "Nautique Lakefront Residences",
    ],
    Hamilton: ["Mount Hope By Cachet", "Electric Ave", "Cachet Binbrook"],
    Kitchener: [
      "Harvest Park",
      "Trussler West Homes",
      "Wildflowers Kitchener",
      "Nomi",
      "Empire Riverland",
    ],
    Mississauga: [
      "Birch Condos & Towns at Lakeview Village",
      "Above Condos",
      "High Line Condos",
      "M6 Condos",
      "Exhale Condos",
    ],
    Oakville: [
      "Claystone Condos",
      "South Lake",
      "The Butler Condos",
      "The Gates of Bronte",
      "Oakville Yards Condos",
    ],
    Toronto: [
      "101 Spadina",
      "The Wedgewood on Yonge",
      "210 Bloor Street West",
      "The Wedgewood on Yonge",
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20">
      <h1 className="text-2xl md:text-3xl lg:text-6xl font-extrabold text-center text-black/90 mb-12">
        GTA Communities
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-3xl mx-auto">
        {Object.entries(communities).map(([city, properties]) => (
          <div key={city} className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 text-center md:text-left">
              {city}
            </h2>
            <ul className="space-y-2">
              {properties.map((property) => (
                <li
                  key={property}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer text-center md:text-left"
                >
                  {property}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communities;
