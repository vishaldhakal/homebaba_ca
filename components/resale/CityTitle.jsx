import { getPropertiesCount } from "@/app/_resale-api/getSalesData";
import { homeText, houseType, saleLease } from "@/constant";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import React from "react";

const CityTitle = async ({
  city = null,
  requiredType = null,
  saleLeaseVal = null,
}) => {
  const totalPropertyCount = await getPropertiesCount({
    city: city,
    propertyType: Object.values(houseType).find(
      (obj) => obj.name == requiredType
    )?.value,
    saleLease: saleLease[saleLeaseVal]?.name,
  }).then((data) => {
    const localeStringNumber = Number(data["@odata.count"])?.toLocaleString();
    const propertyCount = localeStringNumber;
    return propertyCount;
  });

  // const homeText = !requiredType
  //   ? "Homes"
  //   : !requiredType?.toLowerCase().includes("house")
  //   ? "Homes"
  //   : "";

  const getTitle = () => {
    return (
      <>
        {[
          totalPropertyCount || "100+",
          homeText[requiredType],
          capitalizeFirstLetter(saleLeaseVal)?.toLowerCase() == "lease"
            ? "for Rent"
            : "for Sale",
        ].join(" ") + " "}{" "}
        in
        {city ? ` ${capitalizeFirstLetter(city)}` : " Ontario"}
      </>
    );
  };
  return (
    <div className="px-1">
      <h1
        className={`font-extrabold text-3xl text-center sm:text-left pt-2 sm:pt-0`}
      >
        {getTitle()}
      </h1>
      <h2 className="text-sm mb-2 mt-1 text-center sm:text-left">
        {capitalizeFirstLetter(city)} {homeText[requiredType]} homes for{" "}
        {saleLeaseVal?.toLowerCase() == "lease" ? "Rent or Lease" : "sale"}.
        Prices from $1 to $5,000,000. Open houses available.
      </h2>
    </div>
  );
};

export default CityTitle;
