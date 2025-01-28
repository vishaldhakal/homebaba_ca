import { useState } from "react";

export const IndividualFilterButton = ({
  options,
  name,
  value,
  handleFilterChange,
  filterObj,
  city,
  type,
}) => {
  const [activeFilter, setActiveFilter] = useState([]);
  const handleClick = (name, option) => {
    if (activeFilter.includes(option)) {
      const filteredActiveFilter = activeFilter.filter((opt) => opt !== option);
      setActiveFilter(filteredActiveFilter);
      handleFilterChange(name, filteredActiveFilter);
    } else {
      setActiveFilter([...activeFilter, option]);
      const filteredActiveFilter = [...activeFilter, filterObj[option]];
      handleFilterChange(name, filteredActiveFilter);
    }
  };

  return (
    <div className="inline-flex sm:justify-normal justify-center sm:mr-4 flex-nowrap gap-y-2 py-1 sm:py-0 sm:mx-2 my-0 sm:my-2 bg-white">
      {options.map((option, index) => {
        return (
          <div
            key={index}
            className={`mx-[2px] px-2 sm:px-3 h-8 border-[#b2b2b2] border-[1px] tracking-[0.01125] cursor-pointer text-nowrap flex justify-center items-center rounded-full hover:shadow-lg text-xs font-semibold text-gray-700
              ${
                activeFilter.includes(option)
                  ? `border-black bg-[#ffe3e3] text-black`
                  : ""
              }`}
            onClick={() => handleClick(name, option)}
            // style={{ border: "2px solid #e5e7eb" }}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};
