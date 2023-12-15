import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BackButton } from "../common/BackButton";
import { drivers } from "../../core/mockData";
import "./style.css";
import { AnalyticCart } from "../common/AnalyticCart";
import { OrdersTable } from "../OrdersTable";
import { UserInfo } from "../UserInfo";
import { requestData } from "../../core/axios";
export const ViewDriver = () => {
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
        const results = await requestData("driver_analytics", "post", { id }, header);
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
      <UserInfo id={id} />
      <div className="flex cards-row">
        <AnalyticCart title="Orders/Day" percent="⬆23%" amount={analytics.average_orders_per_day} />
        <AnalyticCart title="Orders/Month" percent="⬆11%" amount={analytics.average_orders_per_month} />
        <AnalyticCart title="Total Orders" percent="⬆60%" amount={analytics.total_orders} />
        <AnalyticCart title="Cancelled Orderes" percent="⬆35%" amount={analytics.canceled_orders} />
      </div>
      <div className="flex cards-row">
        <AnalyticCart title="Profit/Day" percent="⬆44%" amount={analytics.average_profit_per_day} />
        <AnalyticCart title="Profit/Month" percent="⬆5%" amount={analytics.average_profit_per_month} />
        <AnalyticCart title="Total profit" percent="⬆32%" amount={analytics.total_profit} />
        <AnalyticCart title="Average Rating" percent="⬆10%" amount={analytics.average_rating} />
      </div>

      <OrdersTable id={id} />
    </div>
  );
};
