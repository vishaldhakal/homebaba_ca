"use client";
import React, {
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";

import SalesList from "./SalesList";
import Filters from "./Filters";

//HELPERS
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";

//CONSTANT
import { bedCount, saleLease, houseType, washroomCount } from "@/constant";
import {
  getFilteredRetsData,
  getPropertiesCount,
} from "@/app/_resale-api/getSalesData";
import useDeviceView from "@/helpers/useDeviceView";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import { ImSpinner } from "react-icons/im";
import HotListings from "./HotListings";
import PageSelector from "./PageSelector";
import Image from "next/image";
import { FadeLoader } from "react-spinners";
import { useClientFilter } from "@/hooks/use-client-filter";
import { usePropertyCount } from "@/hooks/use-property-count";
import { ChartNoAxesCombined } from "lucide-react";
import MarketDataButton from "./MarketDataButton";
import { FilterOpenContext } from "../context/FilterOpenContext";
// import formatCurrency from "@/helpers/formatCurrency";
// import FilterSubmit from "../FilterSubmit";

// Create FilterOpen context

const FiltersWithSalesList = ({
  salesListData = [],
  INITIAL_LIMIT,
  city = undefined,
  requiredType = undefined,
  saleLeaseVal = undefined,
}) => {
  // const leadEmail = user?.emailAddresses[0].emailAddress;
  const saleLeaseFilterVal =
    saleLease[
      Object.keys(saleLease).find((val) => val === saleLeaseVal) || "sale"
    ]?.name || saleLease.sale.name;

  const houseTypeFilterVal =
    Object.values(houseType).find((val) => val.name === requiredType)?.value ||
    houseType.all.value;

  const { isFilterOpen } = useContext(FilterOpenContext);
  const initialState = {
    saleLease: saleLeaseFilterVal,
    bed: bedCount.any.value,
    priceRange: {
      min: 0,
      max: 0,
    },
    type: houseTypeFilterVal,
    Basement: [],
    Roads: [],
    washroom: washroomCount.any.value,
    priceDecreased: null,
    city: city,
  };

  const storedState = isLocalStorageAvailable()
    ? JSON.parse(window.localStorage.getItem("filterState"))
    : null;
  //if parameters are passed for house type or sale/lease rewrite property values for storedState
  if (storedState) {
    if (houseTypeFilterVal) storedState.type = houseTypeFilterVal;
    if (saleLeaseFilterVal) storedState.saleLease = saleLeaseFilterVal;
    if (city) storedState.city = city;
  }
  const [filterState, setFilterState] = useState(initialState);
  const totalPropertyCount = usePropertyCount(city, requiredType);
  const [salesData, setSalesData] = useState(salesListData);
  const [clientFilteredData, isClientFiltered] = useClientFilter(
    salesData,
    filterState
  );
  const [offset, setOffset] = useState(0);
  const { isMobileView } = useDeviceView();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(1); //the page that is selected
  const separateSalesData = (salesData) => {
    if (selected == 1) {
      // Get the current date and time
      const currentDate = new Date();

      // Calculate the date and time 24 hours ago
      const twentyFourHoursAgo = new Date(
        currentDate.getTime() - 24 * 60 * 60 * 1000
      );

      // Function to check if the data is from 24 hours ago
      const is24HoursAgo = (timestampSql) => {
        const timestampDate = new Date(timestampSql);
        return (
          timestampDate > twentyFourHoursAgo && timestampDate <= currentDate
        );
      };

      // Separate sales data for 24 hours ago and remaining days
      const hotSales = [];
      const remainingSales = [];

      salesData?.forEach((data) => {
        if (is24HoursAgo(data.OriginalEntryTimestamp) && hotSales.length < 5) {
          hotSales.push(data);
        } else {
          remainingSales.push(data);
        }
      });
      return { hotSales, remainingSales };
    } else {
      return { hotSales: [], remainingSales: salesData };
    }
  };

  const { hotSales, remainingSales } = useMemo(() => {
    if (isClientFiltered) {
      console.log("Client Filtered Data");
      return separateSalesData(clientFilteredData);
    } else return separateSalesData(salesData);
  }, [salesData, clientFilteredData]);

  //temporary solution for basement filtering

  const _getMergedHouseType = (state) => {
    const selectedHouseType = [state.type];
    return selectedHouseType;
  };

  const fetchFilteredData = async (
    params,
    limit = INITIAL_LIMIT,
    offset = 0
  ) => {
    const payload = {
      saleLease: Object.values(saleLease).find(
        (saleLeaseObj) => saleLeaseObj.name === params.saleLease
      )?.name,
      bed: params.bed,
      minListPrice: Number(params.priceRange?.min ?? 0),
      maxListPrice: Number(params.priceRange?.max ?? 0),
      houseType: _getMergedHouseType(params),
      Basement: params.Basement,
      washroom: params.washroom,
      priceDecreased: params.priceDecreased,
    };
    const queryParams = {
      limit: limit,
      offset: offset,
      city: capitalizeFirstLetter(city),
      ...payload,
    };
    setLoading(true);
    // console.log(payload);
    const filteredSalesData = await getFilteredRetsData(queryParams);

    setSalesData(filteredSalesData);
    if (!filteredSalesData?.length == 0) {
      setOffset(offset);
    }
    setLoading(false);
  };

  useEffect(() => {
    // store data in session storage whenever it changes
    if (isLocalStorageAvailable() && filterState) {
      window.localStorage.setItem("filterState", JSON.stringify(filterState));
      window.localStorage.setItem("selectedCity", capitalizeFirstLetter(city));
    }

    if (window !== undefined) {
      window.scrollY = 0;
    }
  }, [filterState]);

  useEffect(() => {
    //component can be loaded in three ways, either it is provided a pre-defined filter, have a stored state or

    fetchFilteredData(initialState, 20, selected * 20 - 20);
  }, [selected]);

  return (
    <div className="relative">
      <div className="sticky top-16 sm:top-[3.5rem] h-12 z-50 bg-white">
        <div
          className={`relative flex ${
            isFilterOpen ? "h-screen" : "h-12"
          } items-start w-full flex-wrap justify-start sm:justify-normal overflow-y-hidden overflow-x-scroll sm:overflow-auto`}
          id="filter"
        >
          <div className="flex flex-row bg-white items-center">
            <Filters {...{ filterState, setFilterState, fetchFilteredData }} />
            <MarketDataButton city={city} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="w-[20px] mx-auto">
          <FadeLoader />
        </div>
      ) : salesData?.length > 0 || hotSales?.length > 0 ? (
        <>
          {selected === 1 && <HotListings salesData={hotSales} city={city} />}
          <div
            className={`${
              isMobileView ? "pt-1" : "pt-1"
            } grid grid-cols-2 md:grid-cols-4 xs:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-0 gap-x-2 gap-y-4 md:gap-x-2 sm:gap-y-[40px]`}
          >
            <SalesList
              {...{
                city,
                INITIAL_LIMIT,
                salesData: remainingSales,
                setSalesData,
                offset,
                setOffset,
                filterState,
              }}
            />
          </div>
          <div className="flex justify-center mt-10">
            <PageSelector
              numberOfPages={40}
              batchSize={3}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </>
      ) : (
        <div className="w-full fs-4 text-center flex w-100 flex-col items-center">
          <Image
            src="/no-record-found.jpg"
            width="500"
            height="500"
            alt="no record found"
          />
          <p>No Records Found</p>
        </div>
      )}
    </div>
  );
};

export default FiltersWithSalesList;
