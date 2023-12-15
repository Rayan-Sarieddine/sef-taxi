import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BackButton } from "../common/BackButton";
import { drivers } from "../../core/mockData";
import { AnalyticCart } from "../common/AnalyticCart";
import { OrdersTable } from "../OrdersTable";
import { PassengerInfo } from "../PassengerInfo/PassengerInfo";
import { requestData } from "../../core/axios";
export const ViewPassenger = () => {
  const { id } = useParams();
  const [analytics, setAnalytics] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const header = {
      Authorization: token,
    };

    if (!token) {
      console.error("Token not available");
      return;
    }

    const driver_analytics = async () => {
      try {
        const results = await requestData("passenger_analytics", "post", { id }, header);
        setAnalytics(results);
        console.log(results);
      } catch (e) {
        console.log(e);
      }
    };
    driver_analytics();
  }, []);

  return (
    <div className="content-container">
      <BackButton />
      <PassengerInfo id={id} />
      <div className="flex cards-row">
        <AnalyticCart title="Orders/Day" percent="⬆23%" amount={analytics.average_orders_per_day} />
        <AnalyticCart title="Orders/Month" percent="⬆11%" amount={analytics.average_orders_per_month} />
        <AnalyticCart title="Total Orders" percent="⬆60%" amount={analytics.total_orders} />
        <AnalyticCart title="Cancelled Orderes" percent="⬆35%" amount={analytics.canceled_orders} />
      </div>
    </div>
  );
};
