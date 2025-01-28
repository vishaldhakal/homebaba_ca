"use client";
import React, { useEffect, useMemo, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { searchProperties } from "@/app/_resale-api/getSalesData";
import debounce from "lodash.debounce";
import Autosuggest from "./Autosuggest";
import useDeviceView from "@/helpers/useDeviceView";
import citiesWithProvinces from "@/constant/cities";

const ResaleSearchBar = ({
  numberOfSuggestions = 10,
  small = false,
  placeholder = "Search by address, city, neighbourhood or postal code",
}) => {
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isMobileView } = useDeviceView();

  // Search handling
  const getSuggestions = async (searchTerm) => {
    if (!searchTerm?.trim()) {
      setSuggestions([]);
      return;
    }

    const inputValueLowerCase = searchTerm.trim().toLowerCase();
    const filteredCities = citiesWithProvinces.filter((data) =>
      data.city.toLowerCase().includes(inputValueLowerCase)
    );

    const filteredProperties = await searchProperties(searchTerm);
    setSuggestions([...filteredCities, ...filteredProperties]);
  };

  // Debounced search with 300ms delay
  const debouncedSearch = useMemo(
    () =>
      debounce(async (value) => {
        setLoading(true);
        await getSuggestions(value);
        setLoading(false);
      }, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Input handlers
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setDisplaySuggestions(true);
    debouncedSearch(value);
  };

  const handleInputFocus = () => {
    setDisplaySuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setDisplaySuggestions(false), 200);
  };

  // Dynamic classes
  const containerClasses = `
    relative w-full max-w-2xl mx-auto
    transition-all duration-200 ease-in-out
    ${small ? "max-w-md" : ""}
  `;

  const inputWrapperClasses = `
    flex items-center w-full overflow-hidden
    bg-white transition-all duration-200
    ${
      displaySuggestions
        ? "rounded-xl shadow-lg"
        : "rounded-xl shadow-md hover:shadow-lg"
    }
    ${!small ? "border-2" : "border"}
    ${displaySuggestions ? "border-blue-400" : "border-gray-300"}
  `;

  const inputClasses = `
    w-full px-4 ${small ? "py-2" : "py-3"}
    text-gray-700 bg-transparent
    focus:outline-none
    placeholder:text-gray-400
    transition-all duration-200
    text-center placeholder:text-center
    ${small ? "text-sm" : "text-base"}
  `;

  const searchIconClasses = `
    flex items-center justify-center
    px-4 text-gray-500
    hover:text-gray-700
    transition-colors duration-200
    cursor-pointer
  `;

  return (
    <div className={containerClasses}>
      <div className={inputWrapperClasses}>
        <input
          className={inputClasses}
          placeholder={displaySuggestions ? "" : placeholder}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={searchTerm}
          aria-label="Search properties"
        />
        <div className={searchIconClasses}>
          <CgSearch
            size={small ? "1.2rem" : "1.75rem"}
            className="transition-transform duration-200 hover:scale-110"
          />
        </div>
      </div>

      <div className="relative">
        {displaySuggestions && (
          <Autosuggest
            displaySuggestions={displaySuggestions}
            searchTerm={searchTerm}
            suggestions={suggestions}
            numberOfSuggestions={numberOfSuggestions}
            setSearchTerm={setSearchTerm}
            loadingSuggestions={loading}
          />
        )}
      </div>
    </div>
  );
};

export default ResaleSearchBar;
