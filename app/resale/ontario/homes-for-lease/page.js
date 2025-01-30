import React from "react";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import { getSalesData } from "@/app/_resale-api/getSalesData";
import CityTitle from "@/components/resale/CityTitle";
import FilterComponent from "@/components/resale/FilterComponent";

const INITIAL_LIMIT = 30;
const page = async ({ params }) => {
  const salesListData = await getSalesData(0, INITIAL_LIMIT);
  const saleLeaseVal = "lease";
  return (
    <>
      <div className="container-fluid mt-4">
        <div className="">
          <div className="">
            <CityTitle saleLeaseVal={saleLeaseVal} />
            <FilterComponent
              {...{ salesListData, INITIAL_LIMIT, saleLeaseVal }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://homebaba.ca/resale/ontario/homes-for-lease`,
    },
    openGraph: {
      images: "/favicon.ico",
    },
    title: [
      `100+ Ontario Detached, Semi detached & Townhomes for lease`,
      ,
      "New Listings",
      "Homebaba.ca",
    ].join(" | "),
    description: `Find houses for sale in ON. Visit Homebaba.ca to see all the ON real estate listings on the MLS® Systems today! Prices starting at $1 💰`,
  };
}

export default page;
