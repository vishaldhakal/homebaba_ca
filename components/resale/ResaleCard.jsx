"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "./TimeAgo";
import { residential } from "@/app/_resale-api/routes/fetchRoutes";
import { houseType, saleLease } from "@/constant";
import { generateURL } from "@/helpers/generateResaleURL";

import Favorite from "./Favorite";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import { getImageUrls } from "@/app/_resale-api/getSalesData";
import { Skeleton } from "../ui/skeleton";

const ResaleCard = ({
  curElem,
  small = false,
  showDecreasedPrice = false,
  isHotListing,
}) => {
  // const [address, setAddress] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const price = Number(curElem.ListPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const mapObj = {
    MLS: curElem.ListingKey,
    index: 1,
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/noimage.webp`;
  };

  // const streetAndMLS = curElem.StreetName
  //   ? `${curElem.StreetNumber}-${curElem.StreetName?.replace(" ", "-")}-${
  //       curElem.StreetSuffix
  //     }-${curElem.ListingKey}`
  //   : curElem.ListingKey;

  const streetAndMLS = (() => {
    const parts = [];

    if (curElem.StreetNumber) {
      parts.push(curElem.StreetNumber.replace("/", "-"));
    }

    if (curElem.StreetName) {
      const streetName = curElem.StreetName.trim().replace(/ /g, "-");
      parts.push(streetName);
    }

    if (curElem.StreetSuffix) {
      parts.push(curElem.StreetSuffix);
    }

    if (curElem.ListingKey) {
      parts.push(curElem.ListingKey);
    }
    return parts.filter(Boolean).join("-");
  })();

  // Favoriting
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (
      window.localStorage.getItem("favorites") &&
      JSON.parse(window.localStorage.getItem("favorites")).includes(
        curElem.ListingKey
      )
    ) {
      setIsFavorite(true);
    }
    setLoadingImage(true);
    getImageUrls({ MLS: curElem.ListingKey, thumbnailOnly: true }).then(
      (urls) => {
        setImgUrl(urls[0]);
        setLoadingImage(false);
      }
    );
  }, []);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const favoriteValue = window.localStorage.getItem("favorites");
    if (!isFavorite && isLocalStorageAvailable()) {
      const favorites = favoriteValue
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [];
      favorites.push(curElem.ListingKey);
      const value = JSON.stringify(favorites);
      window.localStorage.setItem("favorites", value);
    } else if (isFavorite && isLocalStorageAvailable()) {
      const favorites = favoriteValue
        ? JSON.parse(window.localStorage.getItem("favorites"))
        : [];
      const value = JSON.stringify(
        favorites.filter((val) => val !== curElem.ListingKey)
      );
      window.localStorage.setItem("favorites", value);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <section className="relative transition-all duration-200 transform bg-white group rounded-2xl p-0 hover:shadow-lg hover:rounded-t-2xl  hover:-translate-y-1 overflow-hidden">
      <Link
        href={generateURL({
          cityVal: curElem.City,
          listingIDVal: streetAndMLS,
        })}
        className="text-black"
      >
        <div className="lg:px-0 h-full w-full">
          <div className={`flex flex-col overflow-hidden relative`}>
            <div className={`${"h-52 sm:h-80"} overflow-hidden relative`}>
              <div
                className={`${
                  small ? "h-44" : "h-52 sm:h-80"
                } sm:h-80 relative z-10 rounded-t-2xl`}
              >
                {loadingImage ? (
                  <Skeleton className="object-cover w-full h-full rounded-t-2xl" />
                ) : imgUrl ? (
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110 rounded-t-2xl"
                    src={imgUrl}
                    width="900"
                    height="800"
                    alt="property image"
                    onError={(e) => {
                      console.log("Trigerring error");
                      handleImageError(e);
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center">
                    <img src="/icons/no-photo.png" className="w-10 h-10" />
                    <p>No Image Found</p>
                  </div>
                )}

                {/* <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div> */}
              </div>

              <div className="absolute bottom-3 left-2 flex flex-row z-20">
                <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white flex items-center">
                  {curElem.PropertySubType}{" "}
                </div>
                {curElem.ApproxSquareFootage && (
                  <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white items-center hidden sm:block">
                    <img
                      src="/resale-card-img/ruler.svg"
                      className="w-3 mr-[2px] inline"
                      alt="washrooms"
                    />
                    <span>{curElem.ApproxSquareFootage} Sq.Ft.</span>
                  </div>
                )}
                {isHotListing && (
                  <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-[#fcdaf4] items-center hidden sm:block">
                    <span>🔥 New Listing</span>
                  </div>
                )}
                {/* <div className="text-black text-[0.7rem] p-[3px] px-2 shadow-2xl rounded-md mx-1 bg-white flex items-center">
                </div> */}
              </div>
            </div>
            <div className="flex-1 sm:px-3 pt-2 pb-4 px-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="font-bold text-2xl sm:text-2xl items-center justify-start mt-2 sm:my-2">
                  <span className="font-bold text-black">{price}</span>
                  {curElem.SaleLease === saleLease.lease.value && (
                    <span> /mo</span>
                  )}
                </h2>
                <div className="text-xs font-medium text-blackmb-1 sm:mb-0">
                  <TimeAgo
                    modificationTimestamp={curElem.OriginalEntryTimestamp}
                  />
                </div>
              </div>
              {/* <p className="mb-0 fs-mine text-limit font-md pb-0">
                  {" "}
                  MLS® #{curElem.ListingKey}
                </p> */}
              <span className={`text-black text-xs`}>
                <div className="flex flex-row justify-start">
                  {curElem.BedroomsTotal && (
                    <div className="flex items-center mr-1">
                      <img
                        src="/resale-card-img/bedrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="bedrooms"
                      />
                      <span>
                        {Math.floor(curElem.BedroomsTotal)}{" "}
                        <span className="hidden sm:inline">Bed</span>
                      </span>
                    </div>
                  )}
                  {curElem.BathroomsTotalInteger && (
                    <div className="flex items-center mr-1">
                      <img
                        src="/resale-card-img/bathrooms.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>
                        {Math.floor(curElem.BathroomsTotalInteger)}{" "}
                        <span className="hidden sm:inline">Bath</span>
                      </span>
                    </div>
                  )}
                  {/* {curElem.GarageParkingSpaces && (
                    <div className="flex items-center mr-3">
                      <img
                        src="/resale-card-img/garage.svg"
                        className="w-3 mr-[2px] inline"
                        alt="washrooms"
                      />
                      <span>
                        {Math.floor(curElem.GarageParkingSpaces)}{" "}
                        <span className="hidden sm:inline">Garage</span>
                      </span>
                    </div>
                  )} */}
                  {curElem.BuildingAreaTotal &&
                    Number(curElem.BuildingAreaTotal) > 0 && (
                      <div>
                        <img
                          src="/resale-card-img/ruler.svg"
                          className="w-3 mr-[2px] inline"
                          alt="washrooms"
                        />
                        <span>
                          {Math.floor(curElem.BuildingAreaTotal)}{" "}
                          <span className="hidden sm:inline">Sq. Ft.</span>
                        </span>
                      </div>
                    )}
                </div>
              </span>
              <div className="flex flex-row justify-between my-1">
                <div className="text-black">
                  <div className="text-dark text-xs">
                    {curElem.StreetName ? (
                      `${curElem.StreetNumber} ${curElem.StreetName}${" "}
                    ${curElem.StreetSuffix} ${curElem.City}, Ontario`
                    ) : (
                      <span className="p-4"></span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                MLS® {curElem.ListingKey}
              </div>
              <div className="text-xs text-gray-600">
                Listed by {curElem.ListOfficeName}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div
        className={`absolute ${
          small ? "top-[8rem] sm:top-[10rem]" : "sm:top-[18.5rem] top-[9rem]"
        } right-2 z-10`}
      >
        <Favorite
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          MLS={curElem.ListingKey}
          size={4}
        />
      </div>
    </section>
  );
};

export default ResaleCard;
