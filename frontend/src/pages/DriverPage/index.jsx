import React, { useState } from "react";
import "./styles.css";
import NavBar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import ShowRequests from "../../components/DriverPage/ShowRequests";
import UserLocationMap from "../../components/DriverPage/UserLocationMap/UserLocationMap";
import UserDestinationMap from "../../components/DriverPage/UserDestinationMap";
function DriverPage() {
  const [showmaps, setshowMaps] = useState(false);
  const [reqInfo, setreqInfo] = useState("");
  const [passInfo, setPassInfo] = useState("");
  const [userLocation, setuserLocation] = useState("");
  const [userDestination, setuserDestination] = useState("");
  return (
    <div>
      <NavBar />
      <ShowRequests
        setshowMaps={setshowMaps}
        setreqInfo={setreqInfo}
        reqInfo={reqInfo}
        passInfo={passInfo}
        setPassInfo={setPassInfo}
        setuserLocation={setuserLocation}
        setuserDestination={setuserDestination}
      />
      {showmaps && (
        <div className="driver-maps">
          <UserLocationMap userLocation={userLocation} />
          <UserDestinationMap userDestination={userDestination} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default DriverPage;
