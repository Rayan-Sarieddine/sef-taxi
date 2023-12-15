import React from "react"
import "./styles.css"
import AcceptedRequest from "../../CustomerPage/AcceptedRequest"
import RejectedRequest from "../../CustomerPage/RejectedRequest"
import { useDispatch, useSelector } from "react-redux"
import { setReceiver, extractReceiverSlice } from "../../../core/redux/receiver/receiverSlice"
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from "axios"
function ShowRequests({
    setshowMaps,
    setreqInfo,
    reqInfo,
    passInfo,
    setPassInfo,
    setuserLocation,
    setuserDestination,
}) {
    function date(timestamp) {
        let n = new Date(timestamp)
        return n
    }
    let requests = reqInfo
    function acceptRequest(from_lat, from_long, to_lat, to_long) {
        setuserLocation([from_lat, from_long])
        setuserDestination([to_lat, to_long])
        setshowMaps(true)
        axios
            .get("http://127.0.0.1:8000/api/accept-request-ride", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    function rejectRequest() {
        axios
            .get("http://127.0.0.1:8000/api/reject-request-ride", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log(response)
            })
    }
    function finishRequest() {
        axios
            .get("http://127.0.0.1:8000/api/finish-request-ride", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log(response)
            })
    }
    const [pass, setInfo] = useState({})
    const dispatch = useDispatch()
    const receiver = useSelector(extractReceiverSlice)
    console.log('This is receiver')
    console.log(receiver)
    function refresh() {
        axios
            .get("http://127.0.0.1:8000/api/get-ride-request", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log(response.data)
                setPassInfo(response.data.passenger_info)
                setInfo(response.data.passenger_Info)
                setreqInfo(response.data.request)
            })
    }

    const navigate = useNavigate();
    return (
        <>
            <div className='driver-requests'>
                {requests.length === 0 ? (
                    <>
                        <p className='no-requests'>
                            There are no orders at the moment.
                        </p>
                        <button
                            className='refresh-request'
                            onClick={() => {
                                refresh()
                            }}>
                            REFRESH
                        </button>
                    </>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Order_nb</th>
                                    <th>Ordered at</th>
                                    <th>Price</th>
                                    <th>ETA</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {requests?.map((request, index) => {
                                    return (
                                        <tr key={request.id}>
                                            <td>
                                                <p>{request.id}</p>
                                            </td>
                                            <td>
                                                {date(
                                                    request.created_at
                                                ).toString()}
                                            </td>
                                            <td>${request.price}</td>
                                            <td>{request.duration} min</td>

                                            <button
                                                className='accept-request'
                                                onClick={() => {
                                                    acceptRequest(
                                                        request.from_lat,
                                                        request.from_long,
                                                        request.to_lat,
                                                        request.to_long
                                                    )
                                                }}>
                                                ACCEPT
                                            </button>
                                            <button
                                                className='reject-request'
                                                onClick={() => {
                                                    rejectRequest()
                                                }}>
                                                REJECT
                                            </button>
                                            <button
                                                className='finish-request'
                                                onClick={() => {
                                                    finishRequest()
                                                }}>
                                                FINISH
                                            </button>
                                            <button
                                                className='finish-request'
                                                onClick={() => {
                                                    const id = passInfo[index].id;
                                                    // console.log(id)
                                                    console.log(passInfo)
                                                    if (id) {
                                                        navigate(`/chatroom/${id}`)
                                                    } else {
                                                        console.log(passInfo)
                                                    }
                                                    dispatch(setReceiver(passInfo[index]))
                                                    console.log(receiver)
                                                }}>
                                                CHAT
                                            </button>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <button
                            className='refresh-request'
                            onClick={() => {
                                refresh()
                            }}>
                            REFRESH
                        </button>
                    </>
                )}
            </div>
        </>
    )
}

export default ShowRequests
