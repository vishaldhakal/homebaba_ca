"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import nFormatter from "@/helpers/nFormatter";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Create custom icon using Lucide React
const createCustomIcon = (price) => {
  const iconHtml = `
    <div class="relative">
      <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-md">
        $${price}
      </div>
      <div class="text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

// Component to handle map updates
function MapController({ center, markers }) {
  const map = useMap();

  // Update map view when center changes
  useMemo(() => {
    if (map && center) {
      map.setView([center.lat, center.lng], map.getZoom());
    }
  }, [map, center]);

  return null;
}

export default function Map({ citydetail, datas = [], heightt, onClose }) {
  const [selected, setSelected] = useState(null);
  const [showMap, setShowMap] = useState(true);

  const center = useMemo(() => {
    if (!citydetail || !citydetail.centerLat || !citydetail.centerLong) {
      // Default to Toronto coordinates if no center provided
      return { lat: 43.6532, lng: -79.3832 };
    }
    return {
      lat: parseFloat(citydetail.centerLat),
      lng: parseFloat(citydetail.centerLong),
    };
  }, [citydetail]);

  const markers = useMemo(() => {
    if (!Array.isArray(datas)) return [];

    return datas
      .map((no) => {
        const lat = parseFloat(no.latitute);
        const lng = parseFloat(no.longitude);
        // Skip invalid coordinates
        if (isNaN(lat) || isNaN(lng)) return null;
        return {
          id: no.id,
          position: [lat, lng],
          price: nFormatter(no.price_starting_from, 2),
          data: no,
        };
      })
      .filter(Boolean); // Remove null entries
  }, [datas]);

  const handleMarkerClick = useCallback((marker) => {
    setSelected(marker.data);
  }, []);

  // Early return if no valid data
  if (!citydetail || markers.length === 0) {
    return <></>;
  }

  return (
    <div className="relative w-full">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[1000] bg-white rounded-lg px-4 py-2 shadow-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <span>Close Map</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div style={{ height: heightt }} className="w-full">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <MapController center={center} markers={markers} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />

          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={createCustomIcon(marker.price)}
              eventHandlers={{
                click: () => handleMarkerClick(marker),
              }}
            >
              <Popup className="listing-popup">
                <Link
                  href={`/${marker.data.city.name.toLowerCase()}/${
                    marker.data.slug
                  }`}
                  className="block"
                >
                  <div className="w-[280px]">
                    <div className="relative h-[180px]">
                      <img
                        src={
                          marker.data.images?.[0]?.split(",")[0] ||
                          "/noimage.webp"
                        }
                        alt={marker.data.project_name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                        {marker.data.price_starting_from === 0
                          ? "TBD"
                          : `$${marker.price}`}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-base mb-1 line-clamp-1">
                        {marker.data.project_name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {marker.data.project_address}
                      </p>
                    </div>
                  </div>
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <style jsx global>{`
          .custom-marker {
            background: transparent;
            border: none;
          }
          .listing-popup .leaflet-popup-content-wrapper {
            padding: 0;
            overflow: hidden;
            border-radius: 8px;
          }
          .listing-popup .leaflet-popup-content {
            margin: 0;
          }
          .listing-popup .leaflet-popup-close-button {
            color: white;
            top: 4px;
            right: 4px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            z-index: 10;
          }
        `}</style>
      </div>
    </div>
  );
}
