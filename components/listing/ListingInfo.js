"use client";
import { Button } from "@/components/ui/button";
import RequestModal from "@/components/RequestModal";
import WalkScore from "@/components/listing/WalkScore";
import ProjectLocation from "@/components/listing/ProjectLocation";
import Neighbourhood from "@/components/listing/Neighbourhood";
import nFormatter from "@/helpers/nFormatter";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const ListingInfo = ({ house_detail }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    realtor: "No",
    project_namee: house_detail.project_name || "Pre construction Homes",
    cityy: house_detail.city?.name || "Ontario",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let form_data = new FormData();
      form_data.append("name", credentials.name);
      form_data.append("email", credentials.email);
      form_data.append("phone", credentials.phone);
      form_data.append("message", credentials.message);
      form_data.append("realtor", credentials.realtor);
      form_data.append("proj_name", credentials.project_namee);
      form_data.append("cityy", credentials.cityy);

      let url = "https://api.homebaba.ca/api/contact-form-submit/";
      await axios.post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
        mode: "no-cors",
      });

      await swal(
        `Thank You, ${credentials.name}`,
        "Please expect an email or call from us shortly",
        "success"
      );

      setCredentials({
        ...credentials,
        name: "",
        phone: "",
        email: "",
        message: "",
      });
      setShowContactModal(false);
    } catch (error) {
      console.error(error);
      await swal("Message Failed", "Cannot send your message", "error");
    }
  };

  const handleRequestInfo = (type) => {
    setRequestType(type);
    const messageMap = {
      "floor-plans": `Please send me additional floor plans information about ${house_detail.project_name}. Thank you`,
      "parking-price": `Please send me additional parking price information about ${house_detail.project_name}. Thank you`,
      "locker-price": `Please send me additional locker price information about ${house_detail.project_name}. Thank you`,
      "maintenance-fee": `Please send me additional maintenance fee information about ${house_detail.project_name}. Thank you`,
    };

    setCredentials((prev) => ({
      ...prev,
      message: messageMap[type],
    }));
    setShowContactModal(true);
  };

  return (
    <>
      <div>
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">{house_detail.project_type}</span>
              {house_detail.is_featured && (
                <span className="bg-sky-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 22 22"
                  >
                    <path d="M2 0C3.13 0 4 3.13 4 7C4 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z" />
                  </svg>
                  Featured
                </span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-[600px]">
              <Button
                variant="outline"
                onClick={() => handleRequestInfo("floor-plans")}
                className="text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-50 text-sm py-2 h-auto rounded-[10px]"
              >
                Request Floor Plans
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRequestInfo("parking-price")}
                className="text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-50 text-sm py-2 h-auto rounded-[10px]"
              >
                Request Parking Price
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRequestInfo("locker-price")}
                className="text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-50 text-sm py-2 h-auto rounded-[10px]"
              >
                Request Locker Price
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRequestInfo("maintenance-fee")}
                className="text-blue-600 hover:text-blue-800 border border-blue-600 hover:bg-blue-50 text-sm py-2 h-auto rounded-[10px]"
              >
                Request Est. Maintenance
              </Button>
            </div>
          </div>
          <div className="mt-20">
            <h2 className="text-3xl font-[700] mb-2">
              Project Details: {house_detail.project_name} in{" "}
              {house_detail.city.name}
            </h2>
            <div className="text-start text-inside">
              <div
                className={`prose max-w-none ${
                  !showFullDescription && "line-clamp-3"
                }`}
                dangerouslySetInnerHTML={{
                  __html: house_detail.description,
                }}
              ></div>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 hover:text-blue-800 font-medium mt-2 flex items-center gap-1"
              >
                {showFullDescription ? (
                  <>
                    Show Less
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    Show More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 my-20">
            <div>
              <h3 className="text-[1.25rem] text-[black] font-[700] mb-2">
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
              <h3 className="text-[1.25rem] text-[black] font-[700] mb-2">
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

      {showContactModal && (
        <RequestModal
          requestType={requestType}
          credentials={credentials}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          handleCloseModal={() => setShowContactModal(false)}
          projectName={house_detail.project_name}
        />
      )}
    </>
  );
};

export default ListingInfo;
