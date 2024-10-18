// Map.js
import React from "react";
import MyGoogleMap from "./GoogleMap"; // Updated import
import "../css/Map.css";

export function Map() {
  return (
    <div className="map-holder">
      <div className="my-map">
        <h1>Google Maps App</h1>
        <MyGoogleMap googleMapApiKey={import.meta.env.VITE_GoogleMapKey} />
      </div>
    </div>
  );
}
