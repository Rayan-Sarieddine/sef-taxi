import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

class Map extends Component {
  state = { map: null };

  componentDidUpdate(prevProps, prevState) {
    const { map } = this.state;
    if (prevState.map !== map && map) {
      map.on("click", function (e) {
        console.log(e.latlng.lat);
        alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
      });
    }
  }

  render() {
    const DEFAULT_LATITUDE = 32.313268;
    const DEFAULT_LONGITUDE = 35.022895;
    const latitude = this.props.coords
      ? this.props.coords.latitude
      : DEFAULT_LATITUDE;
    const longitude = this.props.coords
      ? this.props.coords.latitude
      : DEFAULT_LONGITUDE;

    return (
      <MapContainer
        className="leaflet-map"
        center={[33.8937913, 35.5017767]}
        zoom={17}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
        whenCreated={(map) => this.setState({ map })}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[33.8937913, 35.5017767]}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    );
  }
}

export default Map;
