import dynamic from "next/dynamic";
import { ImSpinner } from "react-icons/im";
import Breadcrumbs from "@/components/resale/Breadcrumbs";
import CanadianCitiesShowcase from "@/components/resale/CanadianCitiesShowcase";
import CityTitle from "@/components/resale/CityTitle";
import FilterComponent from "@/components/resale/FilterComponent";

const FiltersWithSalesList = dynamic(
  () => import("@/components/resale/FiltersWithSalesList"),
  {
    loading: () => (
      <div className="flex justify-center align-item-center">
        <ImSpinner size={24} />
      </div>
    ),
  }
);

export const metadata = {
  title: "Ontario Properties | Homebaba.ca",
  description:
    "Explore resale properties across Ontario. Find your next home or investment opportunity.",
  keywords: "Ontario real estate, resale properties, low-rise buildings",
};

const page = async ({ params }) => {
  const INITIAL_LIMIT = 30;
  const breadcrumbItems = [
    { label: "Lowrise", href: "/" },
    { label: "ON", href: null },
  ];

  return (
    <div className="">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="container-fluid">
        <CityTitle />
        <FilterComponent
          {...{
            INITIAL_LIMIT,
          }}
        />
      </div>
      <CanadianCitiesShowcase />
    </div>
  );
};

export default page;
