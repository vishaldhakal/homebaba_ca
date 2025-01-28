"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import RequestModal from "@/components/RequestModal";
import axios from "axios";
import swal from "sweetalert";

export default function ListingInteractions({ house_detail }) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    realtor: "No",
    project_namee: house_detail.project_name || "Pre construction Homes",
    cityy: house_detail.city?.name || "Ontario",
  });

  // Form handling functions
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

      await axios.post(
        "https://api.homebaba.ca/api/contact-form-submit/",
        form_data,
        {
          headers: { "content-type": "multipart/form-data" },
          mode: "no-cors",
        }
      );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[470px]">
        {[
          { type: "floor-plans", icon: "📋", label: "Floor Plans" },
          { type: "parking-price", icon: "🅿️", label: "Parking Price" },
          { type: "locker-price", icon: "🔐", label: "Locker Price" },
          { type: "maintenance-fee", icon: "💰", label: "Est. Maintenance" },
        ].map((item) => (
          <Button
            key={item.type}
            variant="outline"
            onClick={() => handleRequestInfo(item.type)}
            className="flex items-center justify-start gap-2 text-gray-600 hover:text-gray-800 border border-gray-300 hover:bg-gray-50 text-sm py-3 h-auto rounded-[5px] font-medium transition-all duration-200 hover:scale-[1.02]"
          >
            <span>{item.icon}</span>
            Request {item.label}
          </Button>
        ))}
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
}
