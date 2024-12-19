"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/modals/ContactModal";
import WalkScore from "@/components/listing/WalkScore";
import ProjectLocation from "@/components/listing/ProjectLocation";
import Neighbourhood from "@/components/listing/Neighbourhood";
import nFormatter from "@/helpers/nFormatter";
import { useState } from "react";

const ListingInfo = ({ house_detail }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [requestType, setRequestType] = useState("");

  const handleRequestInfo = (type) => {
    setRequestType(type);
    setShowContactModal(true);
  };

  return (
    <>
      <div>
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-sm bg-white shadow-badge px-3 py-1 text-sm font-normal mt-2"
              >
                {house_detail.project_type}
              </Badge>
              {house_detail.is_featured && (
                <Badge variant="default" className="bg-blue-500">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-[3rem] text-[red] font-[700] leading-[3rem]">
              {house_detail.project_name}
            </h1>

            <h3 className="font-normal">
              Developed by{" "}
              <span className="font-semibold">
                {house_detail.developer.name}
              </span>
            </h3>

            <div className="text-3xl font-[700]">
              Starting From Low ${nFormatter(house_detail.price_starting_from)}
            </div>
            <div className="text-sm text-black">
              Project Status: {house_detail.status}
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-3xl font-[700] mb-2">
              About {house_detail.project_name}
            </h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base">Project Location:</span>
              <a
                href="/toronto"
                className="text-[rgb(13,110,253)] hover:underline"
              >
                Toronto
              </a>
            </div>

            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z"
                  fill="#000000"
                ></path>
              </svg>
              <span className="text-neutral-800 text-base">
                {house_detail.project_address}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-base me-2">Postal code:</span>
              <span>{house_detail.postalcode}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-base me-2">Completion:</span>
              <span>{house_detail.occupancy}</span>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="font-semibold text-base me-2">
                Number Of Floor Plans:
              </span>
              <Button
                variant="link"
                onClick={() => handleRequestInfo("floor plans")}
                className="text-blue-600 hover:text-blue-800 py-0 my-0 h-fit px-0"
              >
                Request Number of Floor Plans
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-base me-2">
                Parking Price:
              </span>
              <Button
                variant="link"
                onClick={() => handleRequestInfo("parking price")}
                className="text-blue-600 hover:text-blue-800 py-0 my-0 h-fit px-0"
              >
                Request Parking Price
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-base me-2">
                Locker Price:
              </span>
              <Button
                variant="link"
                onClick={() => handleRequestInfo("locker price")}
                className="text-blue-600 hover:text-blue-800 py-0 my-0 h-fit px-0"
              >
                Request Locker Price
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-base me-2">
                Estimated Maintenance Fee:
              </span>
              <Button
                variant="link"
                onClick={() => handleRequestInfo("maintenance fee")}
                className="text-blue-600 hover:text-blue-800 py-0 my-0 h-fit px-0"
              >
                Request Est Maintenance
              </Button>
            </div>
          </div>
          <div className="mt-20">
            <h2 className="text-3xl font-[700] mb-2">
              Information about {house_detail.project_name} in{" "}
              {house_detail.city.name}
            </h2>
            <div className="text-start text-inside">
              <p className="mb-8 leading-9">
                {house_detail.project_name} is a pre construction project
                developed by {house_detail.developer.name} in the city of{" "}
                {house_detail.city.name}. The project status is{" "}
                {house_detail.status} .
              </p>
              <div
                className="iframe-container leading-9 space-y-5"
                dangerouslySetInnerHTML={{
                  __html: house_detail.description,
                }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 my-20">
            <div>
              <h3 className="text-[1.25rem] text-[red] font-[700] mb-2">
                Deposit Structure
              </h3>
              <div
                className="iframe-container leading-9 space-y-5"
                dangerouslySetInnerHTML={{
                  __html: house_detail.deposit_structure,
                }}
              ></div>
            </div>
            <div>
              <h3 className="text-[1.25rem] text-[red] font-[700] mb-2">
                Facts and Features
              </h3>
              <div
                className="iframe-container leading-9 space-y-5"
                dangerouslySetInnerHTML={{
                  __html: house_detail.facts_about,
                }}
              ></div>
            </div>
          </div>
          <WalkScore
            projectName={house_detail.project_name}
            address={house_detail.project_address}
          />
          <ProjectLocation
            projectName={house_detail.project_name}
            address={house_detail.project_address}
            latitude={house_detail.latitute}
            longitude={house_detail.longitude}
          />
          <Neighbourhood
            projectName={house_detail.project_name}
            street_map={house_detail.street_map}
          />
          <div className="py-5">
            <p className="text-xs leading-5 text-gray-500">
              Note: Homebaba is Canada's one of the largest database of new
              construction homes. Our comprehensive database is populated by our
              research and analysis of publicly available data. Homebaba strives
              for accuracy and we make every effort to verify the information.
              The information provided on Homebaba.ca may be outdated or
              inaccurate. Homebaba Inc. is not liable for the use or misuse of
              the site's information.The information displayed on{" "}
              <a href="https://homebaba.ca" className="text-primary">
                homebaba.ca
              </a>{" "}
              is for reference only. Please contact a liscenced real estate
              agent or broker to seek advice or receive updated and accurate
              information.
            </p>
          </div>
        </div>
      </div>
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        projectName={house_detail.project_name}
        requestType={requestType}
      />
    </>
  );
};

export default ListingInfo;
