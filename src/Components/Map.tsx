
import GoogleMap from "./GoogleMap";
import "../css/Map.css";
import React from "react";



export function Map() {
  return (
    <div className="map-holder">
    <div className="my-map">
      <h1>Google Maps App</h1>
      <GoogleMap />
    </div>
    </div>
  );
}