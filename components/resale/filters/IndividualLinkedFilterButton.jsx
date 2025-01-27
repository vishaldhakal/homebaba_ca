import { generateURL } from "@/helpers/generateResaleURL";
import Link from "next/link";
import { useState } from "react";

export const IndividualLinkedFilterButton = ({
  options,
  name,
  value,
  handleFilterChange,
  city,
  type,
}) => {
  const [activeFilter, setActiveFilter] = useState(value);

  const isActive = (key) => {
    const foundSalesLease = options.find((option) => option === key);
    return foundSalesLease === activeFilter;
  };

  const handleClick = (name, option) => {
    setActiveFilter(option);
    handleFilterChange(name, option);
  };

  return (
    <div className="inline-flex flex-wrap gap-y-2">
      {options.map((option, index) => {
        return (
          <div
            key={index}
            className={`flex items-center justify-center mx-[2px] px-3 text-xs font-semibold h-8 border-[#b2b2b2] tracking-[0.01125] border-[1px] cursor-pointer text-nowrap leading-[1.2rem] sm:leading-normal rounded-full hover:shadow-lg  ${
              isActive(option)
                ? `border-black! text-black bg-[#fcdaf4]`
                : "text-gray-700"
            }`}
            // onClick={() => handleClick(name, option)}
            // style={{ border: "2px solid #e5e7eb" }}
          >
            <Link
              href={generateURL({
                saleLeaseVal: option,
                cityVal: city,
                houseTypeVal: type,
              })}
            >
              {option}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
