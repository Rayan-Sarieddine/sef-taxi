import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { requestData } from "../../core/axios"

export const OrdersTable = () => {
    const { id } = useParams()

    const [orders, setOrders] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token")
        const header = {
            Authorization: token,
        }

        if (!token) {
            console.error("Token not available")
            return
        }
        const get_user_orders = async () => {
            try {
                const res = await requestData(
                    "get_user_orders",
                    "post",
                    { id },
                    header
                )
                setOrders(res.orders)
            } catch (e) {
                console.log(e)
            }
        }
        get_user_orders()
    }, [])
    const date = Date(orders.created_at).toLocaleString()
    return (
        <table>
            <thead>
                <tr>
                    <th className='table-header' colSpan='8'>
                        Orders
                    </th>
                </tr>
                <tr>
                    <th>Order ID</th>
                    <th>Passenger</th>
                    <th>Picked up</th>
                    <th>Drop off</th>
                    <th>Ride Time</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={index} className='table-row'>
                        <td>{order.id}</td>
                        <td className='img-name'>
                            <img
                                src={`http://127.0.0.1:8000/storage/${order.img_url}`}
                                alt=''
                            />
                            {order.user_id}
                        </td>
                        <td>
                            {order.from_long},{order.from_lat}
                        </td>
                        <td>
                            {order.to_long}, {order.to_lat}
                        </td>
                        <td>{order.duration}</td>
                        <td>{date}</td>
                        <td>{order.status}</td>
                        <td>{order.rate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
