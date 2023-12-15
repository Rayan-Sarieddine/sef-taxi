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
function UserMarker({ userLocation, userDestinationTrigger }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(userLocation, 15); // Fly to the user's location with a zoom level of 15
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
function UserLocationMap({ userLocation }) {
  function goToUser() {}
  return (
    <div className="user-location_map">
      <p
        onClick={() => {
          goToUser();
        }}
      >
        Go to user location
      </p>
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
    </div>
  );
}

export default UserLocationMap;
