import React, { useEffect, useState } from "react";
import "./styles.css";
import Loader from "../Loader";
import axios from "axios";
function RequestSent({ setShowRejectScreen, setShowAcceptScreen }) {
  const [stillPendingMsgshow, setstillPendingMsgshow] = useState(false);
  function getStatus() {
    let data = {
      user_id: 4,
    };

    axios
      .post("http://127.0.0.1:8000/api/ride-request-status", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data.request_status.status);
        if (response.data.request_status.status === "accepted") {
          setShowAcceptScreen(true);
        }
        if (response.data.request_status.status === "denied") {
          setShowRejectScreen(true);
        }
        if (response.data.request_status.status === "pending") {
          setstillPendingMsgshow(true);
          setTimeout(() => {
            setstillPendingMsgshow(false);
          }, 1500);
        }
      });
  }
  useEffect(() => {}, []);
  return (
    <div className="accepted-request">
      <p>Request Sent kindly wait for driver's response shortly</p>
      <Loader />
      <button
        className="btn-animated refresh_btn"
        onClick={() => {
          getStatus();
        }}
      >
        <span class="btn__visible">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c2.602 0 5.082-1.016 6.938-2.862l-2.535-2.535C14.41 18.418 13.262 19 12 19c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8h-2l4 4 4-4h-2c0-5.514-4.486-10-10-10z" />
          </svg>
        </span>
        <span
          className="btn__invisible"
          onClick={() => {
            getStatus();
          }}
        >
          REFRESH REQUEST
        </span>
      </button>
      {stillPendingMsgshow && (
        <p className="wait-msg">Request is still pending, Kindly wait...</p>
      )}
    </div>
  );
}

export default RequestSent;
