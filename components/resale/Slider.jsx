"use client";
import React, { useEffect, useRef, useState } from "react";
//ICONS
// import PropertyCard from "./PropertyCard";
import useDeviceView from "@/helpers/useDeviceView";
import ResaleCard from "./ResaleCard";
// import PreconstructionCard from "./PreconstructionCard";
import CreateSchema from "@/helpers/CreateSchema";
import { Skeleton } from "../ui/skeleton";

import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import SignInVOW from "./SignInVOW";

// type: resale/commercial
// data: array of json properties
const Slider = ({ data, type }) => {
  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  const { isMobileView } = useDeviceView();
  //business is returned as Sale of business so we need to modify it to Business

  const slideLeft = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    let scrollAmount; // Adjust the scroll amount as needed
    if (!isMobileView) {
      scrollAmount = cardWidth * 3;
    } else {
      scrollAmount = cardWidth * 1;
    }
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    let scrollAmount; // Adjust the scroll amount as needed
    if (!isMobileView) {
      scrollAmount = cardWidth * 3;
    } else {
      scrollAmount = cardWidth * 1;
    } // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };

  return (
    <div className="relative flex justify-center">
      {/* <div className="btns flex justify-between">
        <button
          className=" absolute start-0"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft size={16} color="black" />
        </button>
        <button
          className=" absolute end-0"
          title="scroll right"
          onClick={slideRight}
        >
          <SlArrowRight size={16} color="black" />
        </button>
      </div> */}
      <div
        className={`w-full grid grid-rows-1 grid-cols-2 sm:grid-cols-4 overflow-x-hidden grid-nowrap justify-between sm:py-3 gap-4 auto-rows-[minmax(100px,_auto)]`}
        id="slider"
        ref={scrollRef}
      >
        {data?.map((curElem, index) => {
          if (
            curElem.ListingKey !== "C8446018" &&
            curElem.ListingKey !== "C8450446"
          ) {
            //manual removal, to be removed later
            return (
              <div className="my-2 sm:my-0 row-auto" key={index} ref={cardRef}>
                {
                  <>
                    <script
                      key={curElem}
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(CreateSchema(curElem)),
                      }}
                    />
                    <ResaleCard curElem={curElem} />
                  </>
                }
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export const SliderSkeleton = () => {
  return (
    <div className="relative flex justify-center">
      {/* <Skeleton className="btns flex justify-between">
        <button
          className=" absolute start-0"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft size={16} color="black" />
        </button>
        <button
          className=" absolute end-0"
          title="scroll right"
          onClick={slideRight}
        >
          <SlArrowRight size={16} color="black" />
        </button>
      </Skeleton> */}
      <div
        className={`w-full grid grid-rows-1 grid-cols-2 sm:grid-cols-4 overflow-x-hidden grid-nowrap justify-between sm:py-3 gap-x-4 auto-rows-[minmax(100px,_auto)]`}
      >
        {[...Array(4)].map((_, index) => {
          //manual removal, to be removed later
          return (
            <div className="my-2 sm:my-0 row-auto" key={index}>
              {
                <>
                  <div className="relative h-80 w-18 flex justify-center items-center">
                    <img
                      src="/city-images/brampton.jpg"
                      className="object-cover blur-md"
                    />
                    <SignInVOW />
                  </div>
                  <Skeleton className={`w-36 h-4 mt-2`}></Skeleton>
                  <Skeleton className={`w-18 h-4 mt-2`}></Skeleton>
                  <Skeleton className={`w-18 h-4 mt-2`}></Skeleton>
                </>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
