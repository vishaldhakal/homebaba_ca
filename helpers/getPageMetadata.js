import capitalizeFirstLetter from "./capitalizeFirstLetter";

function formatPriceRange(range) {
  switch (range) {
    case "0-500k":
      return "Under $500K";
    case "500k-600k":
      return "from $500K to $600K";
    case "600k-700k":
      return "from $600K to $700K";
    case "700k-800k":
      return "from $700K to $800K";
    case "800k-1mil":
      return "from $800K to $1M";
    case "1mil-1.5mil":
      return "from $1M to $1.5M";
    default:
      return "";
  }
}

export default function getPageMetadata(
  type,
  cityName,
  totalCount,
  priceRange
) {
  const city = capitalizeFirstLetter(cityName);

  switch (type) {
    case "Detached":
      return {
        title: `${totalCount} New Construction Detached Homes in ${city} (2025)`,
        subtitle: `Find new construction detached homes for sale in ${city}, Ontario | Get VIP access to floor plans, pricing, and availability for detached homes in ${city}`,
      };
    case "Semi-Detached":
      return {
        title: `${totalCount} New Construction Semi-Detached Homes in ${city} (2025)`,
        subtitle: `Find new construction semi-detached homes for sale in ${city}, Ontario | Get VIP access to floor plans, pricing, and availability for semi-detached homes in ${city}`,
      };
    case "Townhomes":
      return {
        title: `${totalCount} New Construction Townhomes in ${city} (2025)`,
        subtitle: `Find new construction townhomes for sale in ${city}, Ontario | Get VIP access to floor plans, pricing, and availability for townhomes in ${city}`,
      };
    case "Condo":
      return {
        title: `${totalCount} New Construction Condos in ${city} (2025)`,
        subtitle: `Find new construction condos for sale in ${city}, Ontario | Get VIP access to floor plans, pricing, and availability for condos in ${city}`,
      };
    case "price_range":
      const formattedRange = formatPriceRange(priceRange);
      return {
        title: `${totalCount} New Construction Homes ${formattedRange} in ${city} (2025)`,
        subtitle: `Find new construction homes and condos ${formattedRange} in ${city}, Ontario | Get VIP access to floor plans, pricing, and availability`,
      };
    default:
      return {
        title: `${totalCount} New Construction Detached & Townhomes in ${city} (2025)`,
        subtitle: `${totalCount} New Pre construction Detached, Townhomes, or Condos for sale in ${city}, Ontario | Check out plans, pricing, availability for preconstruction homes in ${city}`,
      };
  }
}
