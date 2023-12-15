import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { extractReceiverSlice, setReceiver } from "../../../core/redux/receiver/receiverSlice"
import { useNavigate } from "react-router"
import "./styles.css"
import axios from "axios"
function AvailableDrivers({
    showDrivers,
    setDriverRequestStatusSent,
    driverRequestStatusSent,
    availableDrivers,
    userLocation,
}) {
    let drivers = availableDrivers
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const receiver = useSelector(extractReceiverSlice)
    console.log('This is receiver')
    console.log(receiver)
    function sendRequest(id, price, eta) {
        setDriverRequestStatusSent(false)
        let data = {
            driver_id: id,
            from_lat: userLocation[0],
            from_long: userLocation[1],
            to_lat: 33.9437913,
            to_long: 35.5017767,
            price: price,
            duration: eta,
        }
        createDriveRequest(data)
    }

    function createDriveRequest(data) {
        console.log(data)
        axios
            .post("http://127.0.0.1:8000/api/create-ride-request", data, {
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

    useEffect(() => {
        console.log(drivers)
    }, [showDrivers, availableDrivers])

    return (
        <>
            {showDrivers && driverRequestStatusSent && availableDrivers && (
                <div className='available-drivers'>
                    <table>
                        <thead>
                            <tr>
                                <th>Driver</th>
                                <th>Car</th>
                                <th>Price</th>
                                <th>ETA</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {drivers?.map((driver, index) => {
                                return (
                                    <tr key={driver.driver_id}>
                                        <td>
                                            <div className='driver-info'>
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${driver.img_url}`}
                                                    alt={driver.driver_name}
                                                />
                                                <p>{driver.driver_name}</p>
                                            </div>
                                        </td>
                                        <td>
                                            {driver.car_color} {driver.car_name}
                                        </td>
                                        <td>${driver.price}</td>
                                        <td>{driver.eta} min</td>
                                        <button
                                            className='select-driver_btn'
                                            onClick={() => {
                                                sendRequest(
                                                    driver.driver_id,
                                                    driver.price,
                                                    driver.eta
                                                )
                                                const { driver_id: id } = driver;
                                                dispatch(setReceiver({ id }))
                                                // navigate(`/chatroom/${id}`)
                                            }}>
                                            Select
                                        </button>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default AvailableDrivers
