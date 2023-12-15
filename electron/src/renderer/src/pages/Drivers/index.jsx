import React, { useEffect, useState } from "react";
import { DriverRequests } from "../../components/DriverRequests";
import { CurrentUsersTable } from "../../components/CurrentUsersTable";
import { requestData } from "../../core/axios";
export const Drivers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const header = {
      Authorization: token,
    };
    if (!token) {
      console.error("Token not available");
      return;
    }

    const getDrivers = async () => {
      try {
        const results = await requestData("get_all_drivers", "get", {}, header);
        setUsers(results.drivers);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    const getRequests = async () => {
      const result = await requestData("get_driver_registration_requests", "get", {}, header);
      setDrivers(result.register_requests);
    };

    getDrivers();
    getRequests();
  }, []);

  return (
    <div className="content-container">
      <h1>Drivers</h1>
      <DriverRequests users={drivers} />
      {isLoading ? (
        <CurrentUsersTable user_role={"driver"} users={loading} />
      ) : (
        <CurrentUsersTable user_role="driver" users={users} />
      )}
      ;
    </div>
  );
};

const loading = [
  {
    id: "Loading...",
    name: "Loading...",
    email: "Loading...",
    driver: {
      car: { model: "Loading..." },
    },
  },
];
