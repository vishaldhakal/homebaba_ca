"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((module) => module.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((module) => module.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((module) => module.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((module) => module.Popup),
  { ssr: false }
);

//leaflet marker icon custoum

import L from "leaflet";

let DefaultIcon = L.icon({
  iconUrl: "/icons/home_address.png",
  iconSize: [41, 41],
  iconAnchor: [41, 41],
  popupAnchor: [1, -34],
});

export default function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: parseFloat(props.latitudeval) || 27.666997,
    longitude: parseFloat(props.longitudeval) || 85.290863,
    zoom: 16,
  });

  const position = [viewport.latitude, viewport.longitude];

  return (
    <div>
      <MapContainer
        center={position}
        zoom={viewport.zoom}
        scrollWheelZoom={false}
        className="z-10"
        style={{ height: props.heightt, width: "100%" }}
      >
        <TileLayer url="https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
        <Marker icon={DefaultIcon} position={position}>
          <Popup>
            <b>{props.title}</b>
            <br />
            {props.address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
