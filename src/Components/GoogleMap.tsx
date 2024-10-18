// GoogleMap.js
import React, { useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745, // Default latitude
  lng: -38.523, // Default longitude
};

export default function MyGoogleMap({ googleMapApiKey }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(center);
  const searchBoxRef = useRef(null);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length) {
      const place = places[0];
      setMarker({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      map.panTo(marker);
    }
  };

  return (
    <LoadScript googleMapsApiKey={googleMapApiKey} libraries={["places"]}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={marker}
        zoom={10}
        onLoad={onLoad}
      >
        <StandaloneSearchBox
          ref={searchBoxRef}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search places..."
            style={{
              boxSizing: "border-box",
              border: "1px solid transparent",
              width: "240px",
              height: "32px",
              padding: "0 12px",
              borderRadius: "3px",
              outline: "none",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          />
        </StandaloneSearchBox>
        <Marker position={marker} />
      </GoogleMap>
    </LoadScript>
  );
}
