import React, { useEffect, useState } from "react";
import "./styles.css";
import RequestSent from "../RequestSent";
import AcceptedRequest from "../AcceptedRequest";
import RejectedRequest from "../RejectedRequest";
import DriveFinished from "../DriveFinished";
function RequestStatus({
  driverRequestStatusSent,
  setShowDrivers,
  setDriverRequestStatusSent,
  setRequestStatus,
  requestStatus,
}) {
  const [showAcceptScreen, setShowAcceptScreen] = useState(null);
  const [showRejectScreen, setShowRejectScreen] = useState(null);
  useEffect(() => {}, [driverRequestStatusSent]);
  return (
    <div>
      {!driverRequestStatusSent && (
        <RequestSent
          setRequestStatus={setRequestStatus}
          requestStatus={requestStatus}
          setShowAcceptScreen={setShowAcceptScreen}
          setShowRejectScreen={setShowRejectScreen}
        />
      )}
      <AcceptedRequest
        requestStatus={requestStatus}
        showAcceptScreen={showAcceptScreen}
      />
      <RejectedRequest
        requestStatus={requestStatus}
        showRejectScreen={showRejectScreen}
      />
      <DriveFinished
        setShowDrivers={setShowDrivers}
        setDriverRequestStatusSent={setDriverRequestStatusSent}
        requestStatus={requestStatus}
      />
    </div>
  );
}

export default RequestStatus;
