import formatCurrency from "@/helpers/formatCurrency";
import useDeviceView from "@/helpers/useDeviceView";
import React, { useEffect, useRef, useState } from "react";

const PropertyDescription = ({ main_data, fullAddress }) => {
  const { isMobileView } = useDeviceView();
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);
  const TaxAnnualAmount = formatCurrency(main_data?.Taxes);
  const toggleShowMore = () => {
    setShowMoreDesc(!showMoreDesc);
  };
  const formatNumber = (value) => {
    // Check if the value is not null or undefined
    if (value != null) {
      return Number(value).toLocaleString("en-US");
    } else {
      // Handle the case where the value is null or undefined
      return "N/A"; // or any default value or message you prefer
    }
  };

  useEffect(() => {
    // Check if content is overflowing
    if (contentRef.current) {
      const element = contentRef.current;
      // Compare the scrollHeight with clientHeight to determine if the text overflows
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [main_data.RemarksForClients]);

  return (
    <div className={`${isMobileView ? "pt-4 mt-12" : "mt-12 pt-4"}`}>
      <div className="border-0 rounded-md">
        <div className="font-semibold text-2xl sm:text-3xl">
          Property Description <br />
          <h2 className="font-normal text-lg sm:text-xl sm:mt-2 mb-1 sm:mb-3">
            {fullAddress}
          </h2>
        </div>
        <p
          className={`text-lg pty-description pt-2 sm:leading-8 ${
            showMoreDesc ? "" : "line-clamp-4 sm:line-clamp-6"
          }`}
          ref={contentRef}
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {main_data.RemarksForClients}
        </p>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 w-full ${
            isMobileView ? "flex-wrap" : "flex-nowrap"
          }`}
        >
          <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pr-0">
            <p className=" text-black">Property type</p>
          </div>
          <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pl-0">
            <p className="text-black">{main_data.PropertySubType}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 border-sm py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Lot size</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 border-sm py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">
              {main_data.LotSizeRangeAcres || "N/A"} acres
            </p>
          </div>
        </div>
        <div
          className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
            isMobileView ? "flex-wrap" : "flex-nowrap "
          }`}
        >
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Style </p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">
              {main_data.ArchitecturalStyle || "N/A"}
            </p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Approx. Area</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">
              {main_data.BuildingAreaTotal || "N/A"} Sqft
            </p>
          </div>
        </div>
        <div
          className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
            isMobileView ? "flex-wrap" : "flex-nowrap "
          }`}
        >
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Taxes</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{TaxAnnualAmount}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Tax year</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.TaxYear}</p>
          </div>
        </div>
        <div
          className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
            isMobileView ? "flex-wrap" : "flex-nowrap "
          }`}
        >
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Garage spaces</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">
              {formatNumber(main_data.GarageParkingSpaces)}
            </p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Mls® #</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{main_data.ListingKey}</p>
          </div>
        </div>
        {isOverflowing && (
          <button
            className="mt-2 px-2 border-2 py-[3px] font-semibold rounded-lg  sm:my-2 text-[#fcdaf4] mb-4"
            onClick={toggleShowMore}
          >
            {showMoreDesc ? "See Less ↑" : "See More ↓"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyDescription;
