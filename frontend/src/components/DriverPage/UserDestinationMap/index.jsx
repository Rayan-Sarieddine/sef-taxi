import React, { useEffect } from "react";
import "./styles.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
function UserMarker({ userDestination, userDestinationTrigger }) {
  const map = useMap();

  L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  useEffect(() => {
    map.flyTo(userDestination, 15); // Fly to the user's location with a zoom level of 15
  }, [userDestination, map]); // Run this effect whenever userDestination or map changes

  return (
    <>
      {userDestination && (
        <Marker position={userDestination}>
          <Popup>
            Your location. <br /> Latitude: {userDestination[0]}, Longitude:{" "}
            {userDestination[1]}
          </Popup>
        </Marker>
      )}
    </>
  );
}
function UserDestinationMap({ userDestination }) {
  return (
    <div className="user-destination_map">
      <p>Drop-Off Location:</p>
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

        <UserMarker userDestination={userDestination} />
      </MapContainer>
    </div>
  );
}

export default UserDestinationMap;
