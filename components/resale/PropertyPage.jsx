"use client";
import React, { useState, useEffect, useMemo, useRef, useContext } from "react";

import TimeAgo from "./TimeAgo";

//CUSTOM HOOKS
import useDeviceView from "@/helpers/useDeviceView";

//CONSTANT
import Image from "next/image";
//ICONS

import Link from "next/link";
import formatCurrency from "@/helpers/formatCurrency";
import CompactMortgageCalculator from "./CompactMortgageCalculator";
import { houseType } from "@/constant";
import HomeOverview from "./HomeOverview";
import PropertyDescription from "./PropertyDescription";
import Map from "../Map";
import ResaleMap from "./ResaleMap";
// import { ChatBarContext } from "@/app/context/ChatbarContext";

const PropertyPage = ({ main_data }) => {
  const [navbar, setNavbar] = useState(false);
  const { isMobileView } = useDeviceView();

  const dashedStreetName = `${main_data.StreetNumber}-${main_data.StreetName}-${main_data.StreetSuffix}`;

  const price = formatCurrency(main_data?.ListPrice);

  const priceDecreased = useMemo(() => {
    if (
      parseFloat(main_data.MinListPrice) === parseFloat(main_data.ListPrice) &&
      parseFloat(main_data.ListPrice) < parseFloat(main_data.MaxListPrice)
    ) {
      return true;
    }
    return false;
  }, [main_data.MaxListPrice, main_data.ListPrice, main_data.MinListPrice]);

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 870) {
          setNavbar(true);
        } else {
          setNavbar(false);
        }
      });
    }
  }, []);

  const typeOwnSrchToName = {};
  Object.values(houseType).forEach(
    (item) => (typeOwnSrchToName[item.value] = item.name)
  );

  const fullAddress = [
    [main_data.StreetNumber, main_data.StreetName, main_data.StreetSuffix]
      .filter(Boolean)
      .join(" "),
    main_data.City,
    main_data.Province,
    main_data.PostalCode,
  ]
    .filter((data) => !!data)
    .join(", ");

  return (
    <>
      <div className="col-12 mt-2">
        <div
          className={`border-0  rounded-md ${
            isMobileView ? "sm:p-4 pt-3 mt-3" : "mt-5"
          }`}
        >
          <div
            className={`flex flex-row sm:gap-x-28 flex-wrap items-center rounded-md ${
              isMobileView ? "gap-3" : "gap-0"
            }`}
          >
            <div className="flex flex-col space-y-2">
              <h3 className="text-4xl font-semibold">{price}</h3>
              {/* <button onClick={sendNotes}>Go!</button> */}
              <div className="flex flex-col h-full">
                <h1 className=" mb-1 text-sm">
                  {[
                    main_data.StreetNumber,
                    main_data.StreetName,
                    main_data.StreetSuffix,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  {", "}
                  {[main_data.City, main_data.Province, main_data.PostalCode]
                    .filter((data) => !!data)
                    .join(", ")}
                </h1>
                <p className="text-left text-sm tracking-wide"></p>
              </div>
              <div className="space-x-2 block sm:hidden">
                <button className="bg-black p-1 text-white text-xs font-bold mt-1 sm:my-0 w-fit-content rounded-md">
                  <TimeAgo
                    modificationTimestamp={main_data.OriginalEntryTimestamp}
                  />
                </button>
                <button className="bg-black p-1 text-white text-xs font-bold mt-1 sm:my-0 w-fit-content rounded-md">
                  <span>{main_data.PropertySubType}</span>
                </button>
              </div>

              <div className="rounded-md flex items-center">
                <div className="flex justify-content-center align-items-center gap-1 text-sm text-gray-700">
                  <img
                    src="/property-page-img/bedrooms.svg"
                    alt="bedrooms"
                    className="w-4"
                  />{" "}
                  {main_data.BedroomsTotal} Bedroom
                </div>
                <span className="text-sm text-gray-700 mx-1">|</span>
                <div className="flex justify-content-center align-items-center gap-1 text-sm text-gray-700">
                  <img
                    src="/property-page-img/bathrooms.svg"
                    alt="washrooms"
                    className="w-4"
                  />{" "}
                  {main_data.BathroomsTotalInteger} Bathroom
                </div>
                {main_data.GarageParkingSpaces && (
                  <>
                    <span className="text-sm text-gray-700">&nbsp;|&nbsp;</span>
                    <div className="flex justify-content-center align-items-center gap-1 text-sm text-gray-700 ">
                      <img
                        src="/property-page-img/garage.svg"
                        alt="garages"
                        className="w-3"
                      />{" "}
                      {Math.trunc(main_data.GarageParkingSpaces)} Garage
                    </div>
                  </>
                )}
              </div>
              <p className="card-subtitle my-1 font-normal text-sm">
                MLS - #{main_data.ListingKey}{" "}
              </p>
              <h1 className="vmain-title">
                <div className="uppercase bannerSection text-sm">
                  {main_data.TransactionType}
                </div>
              </h1>
            </div>
          </div>
        </div>
        {/* Description */}

        <PropertyDescription main_data={main_data} fullAddress={fullAddress} />

        {/* Extras */}
        {main_data?.Extras && (
          <div className={`${isMobileView ? "pt-4 pb-4" : "pt-4 pb-4"}`}>
            <div className="col-md-12 px-0">
              <div className="container rounded-md p-4 border-0">
                <h2 className="font-bold text-xl sm:text-xl">Extras</h2>
                <div className="flex flex-grid text-lg py-1 leading-8">
                  {main_data.Extras}
                </div>
              </div>
            </div>
          </div>
        )}
        {/*Home Overview  */}
        <HomeOverview main_data={main_data} />

        {main_data.ListOfficeName && (
          <div className="flex flex-grid text-xs font-medium py-1 text-gray-700">
            Listed by {main_data?.ListOfficeName}
          </div>
        )}
      </div>
      <div className={isMobileView ? `mt-12 col-12` : `mt-24 col-12`}>
        <CompactMortgageCalculator
          price={main_data?.ListPrice}
          showDetails={false}
          align="left"
        />
      </div>
      {main_data.UnparsedAddress && (
        <div className={isMobileView ? `mt-12 col-12` : `mt-24 col-12`}>
          <ResaleMap address={main_data.UnparsedAddress || null} />
        </div>
      )}
      <div className={isMobileView ? `mt-14 col-12` : `mt-24 col-12`}>
        <h2 className="font-bold pb-3 text-lg sm:text-2xl pt-3">
          <Image
            width={50}
            height={50}
            alt="walking  "
            className="w-8 sm:w-10 inline mr-2"
            src="/property-page-img/walking.svg"
          />
          Walk Score for {main_data.StreetNumber} {main_data.StreetName}{" "}
          {main_data.StreetSuffix}
        </h2>

        <div className="">
          <div className="">
            <div className="walkscore-container mt-2 rounded-mine">
              <script type="text/javascript"></script>
              {/* <div id="ws-walkscore-tile" className="ham2 w-full"> */}
              <iframe
                height="500px"
                title="Walk Score"
                className="ham p-0"
                width="100%"
                src={`https://www.walkscore.com/serve-walkscore-tile.php?wsid=&amp&s=${dashedStreetName},${main_data.City}&amp;o=h&amp;c=f&amp;h=500&amp;fh=0&amp;w=737`}
              ></iframe>
              {/* </div> */}
              <script
                type="text/javascript"
                src="/property-page-imghttps://www.walkscore.com/tile/show-walkscore-tile.php"
              ></script>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
