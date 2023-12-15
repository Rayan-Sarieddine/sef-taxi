import React, { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import L from "leaflet";
import Map from "../Map/Map.jsx";

function UserMarker({ userLocation, userDestinationTrigger }) {
  const map = useMap();

  L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  useEffect(() => {
    if (userLocation && map) {
      map.flyTo(userLocation, 15); // Fly to the user's location with a zoom level of 15
    }
  }, [userLocation, map]); // Run this effect whenever userLocation or map changes

  return (
    <>
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>
            Your location. <br /> Latitude: {userLocation[0]}, Longitude:{" "}
            {userLocation[1]}
          </Popup>
        </Marker>
      )}
    </>
  );
}
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
function CustomerMap({ userLocation, userDestinationTrigger }) {
  const [anchor, setAnchor] = useState([50.879, 4.6997]);
  useEffect(() => {
    console.log("d");
  }, [userDestinationTrigger]);
  return (
    <div className="map-container">
      {!userDestinationTrigger ? (
        <MapContainer
          className="markercluster-map"
          center={[51.0, 19.0]}
          zoom={15}
          maxZoom={18}
          style={{ height: 536 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          <UserMarker userLocation={userLocation} />
        </MapContainer>
      ) : (
        <Map />
      )}
    </div>
  );
}

export default CustomerMap;
