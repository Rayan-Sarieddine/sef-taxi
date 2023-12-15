import React, { useState } from "react";
import "./styles.css";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import CustomerRequest from "../../components/CustomerPage/CustomerRequest";
import AvailableDrivers from "../../components/CustomerPage/AvailableDrivers";
import CustomerMap from "../../components/CustomerPage/CustomerMap";
import RequestSent from "../../components/CustomerPage/RequestSent";
import RequestStatus from "../../components/CustomerPage/RequestStatus";
function CustomerPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [userDestinationTrigger, setUserDestinationTrigger] = useState(null);
  const [showDrivers, setShowDrivers] = useState(false);
  const [driverRequestStatusSent, setDriverRequestStatusSent] = useState(true);
  const [driverRequestStatus, setDriverRequestStatus] = useState("");
  const [availableDrivers, setAvailableDrivers] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  return (
    <div>
      <NavBar />
      <div className="customer-interaction">
        <CustomerRequest
          setUserLocation={setUserLocation}
          setUserDestinationTrigger={setUserDestinationTrigger}
          setShowDrivers={setShowDrivers}
          setAvailableDrivers={setAvailableDrivers}
        />
        <CustomerMap
          userLocation={userLocation}
          userDestinationTrigger={userDestinationTrigger}
        />
      </div>
      <AvailableDrivers
        showDrivers={showDrivers}
        setDriverRequestStatusSent={setDriverRequestStatusSent}
        driverRequestStatusSent={driverRequestStatusSent}
        availableDrivers={availableDrivers}
        userLocation={userLocation}
      />
      {!driverRequestStatusSent && (
        <RequestStatus
          driverRequestStatusSent={driverRequestStatusSent}
          setShowDrivers={setShowDrivers}
          setDriverRequestStatusSent={setDriverRequestStatusSent}
          driverRequestStatus={driverRequestStatus}
          setRequestStatus={setRequestStatus}
          requestStatus={requestStatus}
        />
      )}
      <Footer />
    </div>
  );
}

export default CustomerPage;
