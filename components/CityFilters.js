"use client";

export default function CityFilters({ filters, cityName }) {
  const createFilterUrl = (type, value) => {
    if (!value) return `/${cityName}`;

    switch (type) {
      case "project_type":
        switch (value) {
          case "Detached":
            return `/${cityName}/pre-construction/detached`;
          case "Semi-Detached":
            return `/${cityName}/pre-construction/semi-detached`;
          case "Townhome":
            return `/${cityName}/pre-construction/townhomes`;
          case "Condo":
            return `/${cityName}/condos`;
          default:
            return `/${cityName}`;
        }
      case "price_range":
        const formattedRange = value.toLowerCase();
        return `/${cityName}/price-range/${formattedRange}`;
      default:
        return `/${cityName}`;
    }
  };

  const projectTypes = [
    {
      value: "Detached",
      label: `New Construction Detached Homes in ${cityName}`,
      path: `/pre-construction/detached`,
    },
    {
      value: "Semi-Detached",
      label: `New Construction Semi-Detached Homes in ${cityName}`,
      path: `/pre-construction/semi-detached`,
    },
    {
      value: "Townhome",
      label: `New Construction Townhomes in ${cityName}`,
      path: `/pre-construction/townhomes`,
    },
    {
      value: "Condo",
      label: `New Construction Condos in ${cityName}`,
      path: `/condos`,
    },
  ];

  const priceRanges = [
    {
      value: "0-500k",
      label: `New Construction Homes Under $500K in ${cityName}`,
    },
    {
      value: "500k-600k",
      label: `New Construction Homes from $500K to $600K in ${cityName}`,
    },
    {
      value: "600k-700k",
      label: `New Construction Homes from $600K to $700K in ${cityName}`,
    },
    {
      value: "700k-800k",
      label: `New Construction Homes from $700K to $800K in ${cityName}`,
    },
    {
      value: "800k-1mil",
      label: `New Construction Homes from $800K to $1M in ${cityName}`,
    },
    {
      value: "1mil-1.5mil",
      label: `New Construction Homes from $1M to $1.5M in ${cityName}`,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-5 justify-center md:justify-start">
      {/* Property Type Filter */}
      <div className="relative">
        <select
          className="appearance-none bg-white border text-sm border-gray-300 rounded-md px-4 py-2 pr-8 hover:border-gray-400 focus:outline-none"
          defaultValue={filters.project_type}
          onChange={(e) => {
            const url = createFilterUrl("project_type", e.target.value);
            window.location.href = url;
          }}
        >
          <option value="">Property Type</option>
          <option value="Detached">Detached</option>
          <option value="Semi-Detached">Semi-Detached</option>
          <option value="Townhome">Townhome</option>
          <option value="Condo">Condo</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="relative">
        <select
          className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 text-sm pr-8 hover:border-gray-400 focus:outline-none"
          defaultValue={filters.price_range}
          onChange={(e) => {
            const url = createFilterUrl("price_range", e.target.value);
            window.location.href = url;
          }}
        >
          <option value="">Price Range</option>
          <option value="0-500k">$0 - 500K</option>
          <option value="500k-600k">$500K - 600K</option>
          <option value="600k-700k">$600K - 700K</option>
          <option value="700k-800k">$700K - 800K</option>
          <option value="800k-1mil">$800K - 1M</option>
          <option value="1mil-1.5mil">$1M - 1.5M</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(filters.project_type || filters.price_range) && (
        <a
          href={`/${cityName}`}
          className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Clear Filters
        </a>
      )}
    </div>
  );
}
