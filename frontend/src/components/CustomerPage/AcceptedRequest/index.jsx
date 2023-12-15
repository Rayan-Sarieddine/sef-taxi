import React, { useEffect } from "react";
import "./styles.css";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { extractReceiverSlice, setReceiver } from "../../../core/redux/receiver/receiverSlice";
import { useNavigate } from "react-router";
function AcceptedRequest({ showAcceptScreen, requestStatus }) {
  useEffect(() => { }, [showAcceptScreen]);
  const receiver = useSelector(extractReceiverSlice)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function getDriverId() {
    console.log('Clicked')
    fetch(`http://127.0.0.1:8000/api/getDriverId`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify({ driver_id: receiver.id })
    }).then(response => response.json())
      .then(data => {
        dispatch(setReceiver(data.user))
        console.log(receiver)
        navigate(`/chatroom/${data.user.id}`)
      })
  }
  return (
    <>
      {showAcceptScreen && (
        <div className="accepted-request">
          <p>Driver accepted your request and is on the way!</p>
          <Loader />
          <button className="btn-animated chat_btn" onClick={() => {
            getDriverId()
          }}>
            {/* here */}
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
            <span className="btn__invisible">chat with driver</span>
          </button>
        </div>
      )}
    </>
  );
}

export default AcceptedRequest;
