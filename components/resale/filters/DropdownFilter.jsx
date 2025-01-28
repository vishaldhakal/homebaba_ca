"use client";
import { useCallback, useEffect, useRef, useState, useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { generateURL } from "@/helpers/generateResaleURL";
import Link from "next/link";
import { Cross, CrossIcon, X } from "lucide-react";
import { FilterOpenContext } from "@/components/context/FilterOpenContext";

const CustomDropdown = ({
  options,
  name,
  value,
  handleFilterChange,
  isMobileView,
  isMulti = false,
  defaultValue,
  city,
  saleLease,
  filterObj,
}) => {
  const { setIsFilterOpen } = useContext(FilterOpenContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(
    isMulti ? [...value] : [value]
  );
  const dropdownRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);
  const handleSelect = (option) => {
    let newValues;
    if (isMulti) {
      newValues = selectedValues.includes(option)
        ? selectedValues.filter((val) => val !== option)
        : [...selectedValues, option];
    } else {
      if (name != "priceRange") {
        newValues = [
          Object.values(filterObj).find((obj) => {
            if (obj.name == option) return obj.value;
          }).value,
        ];
      } else {
        newValues = [
          Object.keys(filterObj).find((keyVal) => {
            if (keyVal == option) return filterObj[keyVal];
          }),
        ];
      }
      setIsOpen(false);
    }
    setSelectedValues(newValues);
    handleFilterChange(name, newValues.join(", ").replaceAll("_", " "));
  };

  const optionSelected =
    selectedValues.length > 0 && selectedValues[0] !== defaultValue;
  const label = () => {
    if (name == "priceRange") {
      return selectedValues[0] || defaultValue;
    } else {
      return (
        Object.values(filterObj).find((obj) => obj.value == selectedValues[0])
          ?.name || defaultValue
      );
    }
  };

  const clearFilter = (name) => {
    setSelectedValues([]);
    handleFilterChange(
      name,
      Object.values(filterObj).find((obj) => !obj.value).value
    );
  };

  useEffect(() => {
    isOpen ? setIsFilterOpen(true) : setIsFilterOpen(false);
  }, [isOpen]);
  return (
    <div className="inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
            flex items-center justify-between
            capitalize text-xs h-8 border-[#b2b2b2] tracking-[0.01125]
            rounded-full px-3 border-[1px] font-semibold 
            ${isMobileView ? "px-s gap-1 min-w-[40px]" : "min-w-[120px]"}
            ${
              optionSelected
                ? `bg-[#ffe3e3] text-black border-black`
                : "border-[#b2b2b2] text-gray-700 bg-white "
            }
            hover:shadow-md transition-all text-center
          `}
      >
        <span className="truncate">{label()}</span>
        {optionSelected ? (
          name == "type" ? (
            <Link
              href={generateURL({
                cityVal: city,
                saleLeaseVal: saleLease,
                useLocalStorage: false,
              })}
              className="hover:pointer"
            >
              {console.log("##")}
              <X className="w-5 h-5" />
            </Link>
          ) : (
            <div className="pl-3" onClick={() => clearFilter(name)}>
              <X className="w-5 h-5" />
            </div>
          )
        ) : (
          <FaChevronDown
            size={10}
            className={`ml-2 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {isOpen && (
        <div
          className={`
              absolute top-6 min-w-[120px] sm:min-w-[150px] max-h-[300px] overflow-y-auto
              bg-white rounded-lg shadow-lg
              border border-gray-200
              mt-2 py-2
            `}
          style={{
            position: "absolute",
            zIndex: 1000,
            marginTop: "8px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          {options.map((option) => {
            if (name === "type") {
              const url = generateURL({
                cityVal: city,
                houseTypeVal: option,
                saleLeaseVal: saleLease,
              });

              return (
                <Link
                  key={option}
                  href={url}
                  className="
                      block mx-2 py-2
                      hover:bg-gray-100 
                      text-sm text-gray-700
                      cursor-pointer hover:font-bold
                    "
                >
                  {option}
                </Link>
              );
            }
            return (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`
                    px-4 py-2
                    hover:bg-gray-100 
                    text-sm cursor-pointer
                    ${
                      selectedValues.includes(option)
                        ? "bg-gray-50 text-black font-medium"
                        : "text-gray-700"
                    }
                  `}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Replace the IndividualFilter component with CustomDropdown
export const DropdownFilter = (props) => {
  return <CustomDropdown {...props} />;
};
