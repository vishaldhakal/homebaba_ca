"use client";
import useDeviceView from "@/helpers/useDeviceView";
import React, { useState } from "react";
import TimeAgo from "./TimeAgo";
import Link from "next/link";
import formatCurrency from "@/helpers/formatCurrency";
const HomeOverview = ({ main_data }) => {
  const { isMobileView } = useDeviceView();
  const [collapse, setCollapse] = useState(true);
  const AssociationFee = formatCurrency(main_data?.AddlMonthlyFees);
  const formatNumber = (value) => {
    // Check if the value is not null or undefined
    if (value != null) {
      return Number(value).toLocaleString("en-US");
    } else {
      // Handle the case where the value is null or undefined
      return "N/A"; // or any default value or message you prefer
    }
  };
  const getCommunityFeatures = () => {
    return main_data?.PropertyFeatures.join(", ");
  };
  return (
    <div className={`${isMobileView ? "pt-4 pb-4 mt-12" : "mt-12 pt-4 pb-4"}`}>
      <div className="rounded-md border-0">
        <h2 className="font-semibold pb-3 text-2xl sm:text-3xl">
          Home Overview
        </h2>
        <div
          className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
            isMobileView ? "flex-wrap" : "flex-nowrap "
          }`}
        >
          <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pr-0">
            <p className=" text-black">Last check for updates</p>
          </div>
          <div className="col-span-1 md:col-span-1 border-b border-gray-200 py-2 md:py-3 pl-0">
            <p className="text-black">
              <TimeAgo
                modificationTimestamp={main_data.OriginalEntryTimestamp}
              />
            </p>
          </div>

          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Virtual tour</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">
              <Link href={main_data?.VirtualTourURL || ""} target="_blank">
                Tour Now
              </Link>
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
            isMobileView ? "flex-wrap" : "flex-nowrap "
          }`}
        >
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Basement information</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">
              {main_data?.Basement
                ? `${main_data?.Basement.join(",")}`
                : "None"}
            </p>
          </div>

          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Building size</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">
              {main_data.ApproxSquareFootage}
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
            isMobileView ? "flex-wrap" : "flex-nowrap "
          }`}
        >
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Status</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">
              {main_data.Status === "A" ? "Active" : "In-Active"}
            </p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Property sub type</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">
              {/* {main_data.PropertySubType} */}
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
            isMobileView ? "flex-wrap" : "flex-nowrap "
          }`}
        >
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Maintenance fee</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">{AssociationFee}</p>
          </div>
          <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
            <p className="cardd-subtitle_bg-black ">Year built</p>
          </div>
          <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
            <p className="cardd-subtitle_bg-black">
              {main_data.AssessmentYear || "--"}
            </p>
          </div>
        </div>

        <div
          className={`block ${collapse ? "hidden" : "block"}`}
          id="collapseExample"
        >
          {/* Interior */}
          <h5 className="py-2  pt-5">Interior</h5>
          <div
            className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
              isMobileView ? "flex-wrap" : "flex-nowrap "
            }`}
          >
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Total bathrooms</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {main_data.BathroomsTotalInteger}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Full baths</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {main_data.BathroomsTotalInteger}
              </p>
            </div>
          </div>

          <div
            className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
              isMobileView ? "flex-wrap" : "flex-nowrap "
            }`}
          >
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">
                Number of above grade bedrooms
              </p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {main_data.RoomsAboveGrade}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Number of rooms</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {Number(main_data.RoomsAboveGrade) +
                  Number(main_data.RoomsBelowGrade)}
              </p>
            </div>
          </div>

          <div
            className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
              isMobileView ? "flex-wrap" : "flex-nowrap "
            }`}
          >
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Family room available</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {main_data?.DenFamilyroomYN}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Laundry information</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {main_data.LaundryLevel}
              </p>
            </div>
          </div>

          {/* Exterior */}
          <h5 className="py-2  pt-5">Exterior</h5>
          <div
            className={`grid grid-cols-2  grid-cols-md-4 w-100 ${
              isMobileView ? "flex-wrap" : "flex-nowrap "
            }`}
          >
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Construction materials</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">{main_data.Exterior1}</p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Other structures</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {main_data.OtherStructures1}
              </p>
            </div>
          </div>

          <div
            className={`grid grid-cols-2  grid-cols-md-4 w-100 ${
              isMobileView ? "flex-wrap" : "flex-nowrap "
            }`}
          >
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Total garage spaces</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {formatNumber(main_data.GarageParkingSpaces)}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Number parking spaces</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {main_data.ParkingSpaces}
              </p>
            </div>
          </div>

          <div
            className={`grid grid-cols-2  grid-cols-md-4 w-100 ${
              isMobileView ? "flex-wrap" : "flex-nowrap "
            }`}
          >
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Garage features</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">{main_data.GarageType}</p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Has basement (y/n)</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {main_data.Basement.length > 0 ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <div
            className={`grid grid-cols-2  grid-cols-md-4 w-100 ${
              isMobileView ? "flex-wrap" : "flex-nowrap "
            }`}
          >
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Has garage (y/n)</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {main_data.GarageType ? "Yes" : "No"}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Drive</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">{main_data.Drive}</p>
            </div>
          </div>

          {/* Amenities / Utilities */}
          <h5 className="py-2  pt-5">Amenities / Utilities</h5>
          <div
            className={`grid grid-cols-2 md:grid-cols-4 w-100 ${
              isMobileView ? "flex-wrap" : "flex-nowrap "
            }`}
          >
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Cooling</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {main_data.AirConditioning}
              </p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Heat source</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">{main_data?.HeatSource}</p>
            </div>
          </div>
          <div
            className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
              isMobileView ? "flex-wrap" : "flex-nowrap "
            }`}
          >
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Heat type</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">{main_data?.HeatType}</p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Sewers</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">{main_data?.Sewers}</p>
            </div>
          </div>

          {/* Location */}
          <h5 className="py-2  pt-5">Location</h5>
          <div
            className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
              isMobileView ? "flex-wrap" : "flex-nowrap "
            }`}
          >
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Water source</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">{main_data.Water}</p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Area</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">{main_data.Area}</p>
            </div>
          </div>
          <div
            className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
              isMobileView ? "flex-wrap" : "flex-nowrap "
            }`}
          >
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Community</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">{main_data.Community}</p>
            </div>
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Community features</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {getCommunityFeatures()}
              </p>
            </div>
          </div>
          <div
            className={`grid grid-cols-2  md:grid-cols-4 w-100 ${
              isMobileView ? "flex-wrap" : "flex-nowrap "
            }`}
          >
            <div className="col-7 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pr-0">
              <p className="cardd-subtitle_bg-black ">Directions</p>
            </div>
            <div className="col-5 col-md border-b-[0.1px] border-gray-200 py-2 md:py-3 pl-0">
              <p className="cardd-subtitle_bg-black">
                {main_data.DirectionsCrossStreets}
              </p>
            </div>
          </div>
        </div>
        {/* see more */}

        {/* <div className="pt-3">
              <Collapse> </Collapse>
            </div> */}
        <button
          onClick={() => setCollapse(!collapse)}
          className="mt-2 py-[3px] font-semibold rounded-lg  sm:my-2 text-black hover:text-[#e6a6d7] mb-4 hover:underline"
        >
          See {collapse ? "More" : "Less"}
        </button>
      </div>
    </div>
  );
};

export default HomeOverview;
