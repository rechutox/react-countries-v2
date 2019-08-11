import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";

function CountryMap({ lat = 0, lng = 0, zoom = 4 }) {
  const position = [lat, lng];
  return (
    <div className="CountryMap">
      <Map center={position} zoom={zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
      </Map>
    </div>
  );
}

export default CountryMap;
