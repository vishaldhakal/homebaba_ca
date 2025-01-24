"use client";

import { useState } from "react";
import Map from "./Map";

export default function MapToggle({ cityDetail, listings }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMap(!showMap)}
        className={`text-xs px-3 py-1.5 rounded border transition-colors whitespace-nowrap flex items-center gap-2 ${
          showMap ? "bg-gray-100" : "hover:bg-gray-50"
        }`}
      >
        <span>Map View</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </button>

      {showMap && (
        <div className="fixed inset-0 z-50 bg-white lg:relative lg:w-1/2 lg:h-screen">
          <Map
            citydetail={cityDetail}
            datas={listings}
            heightt="calc(100vh - 2rem)"
            onClose={() => setShowMap(false)}
          />
        </div>
      )}
    </div>
  );
}
