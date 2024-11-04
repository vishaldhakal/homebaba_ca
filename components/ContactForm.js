"use client";
import { useState } from "react";
import Image from "next/image";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    isRealtor: "No",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="max-w-[700px] mx-auto px-4 py-8 my-12 md:my-20">
      <div className="flex flex-col items-center mb-8 md:mb-12">
        <Image
          src="/contact-person.png"
          alt="Real Estate Agent"
          width={300}
          height={300}
          className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Looking to buy a preconstruction home?
        </h1>
        <p className="text-gray-600 text-center text-sm md:text-base">
          Don't know where to start? Contact Homebaba now!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            id="fullName"
            className="block px-4 pb-2.5 pt-5 w-full h-16 text-gray-900 bg-[#F4F6F9] rounded-md appearance-none focus:outline-none focus:ring-0 peer"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            placeholder=" "
          />
          <label
            htmlFor="fullName"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Full Name
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              className="block px-4 pb-2.5 pt-4 w-full h-16 text-gray-900 bg-[#F4F6F9] rounded-md appearance-none focus:outline-none focus:ring-0 peer"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Your email
            </label>
          </div>

          <div className="relative">
            <input
              type="tel"
              id="phone"
              className="block px-4 pb-2.5 pt-4 w-full h-16 text-gray-900 bg-[#F4F6F9] rounded-md appearance-none focus:outline-none focus:ring-0 peer"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Phone
            </label>
          </div>
        </div>

        <div className="relative">
          <select
            id="isRealtor"
            className="block px-4 pb-2.5 pt-4 w-full h-16 text-gray-900 bg-[#F4F6F9] rounded-md appearance-none focus:outline-none focus:ring-0 peer"
            value={formData.isRealtor}
            onChange={(e) =>
              setFormData({ ...formData, isRealtor: e.target.value })
            }
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <label
            htmlFor="isRealtor"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4"
          >
            Are you a realtor or working with one?
          </label>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="relative">
          <textarea
            id="message"
            rows={5}
            className="block px-4 pb-2.5 pt-4 w-full text-gray-900 bg-[#F4F6F9] rounded-md appearance-none focus:outline-none focus:ring-0 peer resize-none"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder=" "
          />
          <label
            htmlFor="message"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Enter your message
          </label>
        </div>

        <div className="text-[0.5rem] md:text-xs text-gray-500 leading-relaxed text-center px-4 md:px-10">
          Homebaba is an online pre-construction homes database. Homebaba
          curates the list of projects that are publicly available on internet
          and does not take part in any real estate transactions. Be advised the
          information provided on this page could be outdated or inaccurate. By
          submitting above form you consent the real estate agents advertising
          on this page to connect with you. We may share your info to our
          partners or advertisers to help you with your questions. You can
          unsubscribe at any time by emailing us.
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-6 md:px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 text-center"
          >
            Contact now
          </button>
        </div>
      </form>
    </div>
  );
}
