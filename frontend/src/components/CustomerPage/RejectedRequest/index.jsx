import React, { useEffect } from "react";
import "./styles.css";

function RejectedRequest({ showRejectScreen }) {
  useEffect(() => {}, [showRejectScreen]);
  return (
    <>
      {showRejectScreen && (
        <div className="rejected-request">
          <p>
            Driver is unable to take your request at the moment, please select
            another driver
          </p>
          <button className="btn-animated select_another_btn">
            <span class="btn__visible">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18l-4-4H3V5h18v4l4 4v-7c0-1.1-.9-2-2-2zm-2 9h-2v-2h2v2zm-4 0h-8v-2h8v2zm4-5H5V7h14v4z" />
              </svg>
            </span>
            <span className="btn__invisible">SELECT DRIVER</span>
          </button>
        </div>
      )}
    </>
  );
}

export default RejectedRequest;
