"use client";

import React, { useState } from 'react';

const RequestModal = ({ 
  requestType, 
  credentials, 
  handleChange, 
  handleFormSubmit,
  handleCloseModal,
  projectName
}) => {
  const [submitBtn, setSubmitBtn] = useState("Contact now");

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn("Submitting...");
    await handleFormSubmit(e);
    setSubmitBtn("Contact now");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[20px] shadow-xl w-full max-w-md relative">
        <button 
          onClick={handleCloseModal} 
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6">
          <div className="flex items-start gap-3 sm:gap-4 mb-6">
            <div className="w-[90px] h-[90px] sm:w-[106px] sm:h-[106px] relative">
              <div className="w-full h-full rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] overflow-hidden">
                <img
                  src="/milan-2.png"
                  alt="Default Agent"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-2">
              <h2 className="text-[24px] sm:text-[28px] font-medium text-[#2C2C2C] leading-none mb-1">{projectName}</h2>
              <p className="text-[13px] sm:text-[14px] text-[#2C2C2C] flex items-center">
                Request {requestType.split('-').join(' ').charAt(0).toUpperCase() + requestType.split('-').join(' ').slice(1)} Information
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                value={credentials.name}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px]"
                required
              />
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone"
                value={credentials.phone}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px]"
                required
              />
            </div>

            <input
              type="email"
              placeholder="Your email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px]"
              required
            />

            <div className="relative">
              <select
                id="realtor"
                className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[#2C2C2C] bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] text-[14px]"
                value={credentials.realtor}
                onChange={handleChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              <div className="absolute top-0 left-4 -translate-y-2 px-1 bg-white">
                <span className="text-[11px] text-[#6B7280]">Are you a realtor or working with a realtor?</span>
              </div>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-[#6B7280]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <textarea
              name="message"
              id="message"
              value={credentials.message}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[#2C2C2C] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#2C2C2C] h-[100px] resize-none text-[14px]"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg text-[15px] font-medium hover:bg-gray-800 transition duration-200"
            >
              {submitBtn}
            </button>

            <p className="text-[10px] text-[#6B7280] text-center leading-tight mt-4">
              I agree to receive marketing and customer service calls and text messages from Homebaba Technologies. Consent is not a condition of purchase. Msg/data rates may apply. Msg frequency varies. Reply STOP to unsubscribe. Privacy Policy & Terms of Service.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;