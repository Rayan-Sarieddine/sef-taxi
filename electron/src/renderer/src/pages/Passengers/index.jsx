import React, { useEffect, useState } from "react";
import "./style.css";
import { CurrentUsersTable } from "../../components/CurrentUsersTable";
import { requestData } from "../../core/axios";
export const Passengers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setUsers();
    const token = localStorage.getItem("token");
    const header = {
      Authorization: token,
    };

    if (!token) {
      console.error("Token not available");
      return;
    }
    const getPassengers = async () => {
      try {
        const results = await requestData("get_all_passengers", "get", {}, header);
        setUsers(results.passengers);
        setIsLoading(false);
        console.log(results);
      } catch (e) {
        console.log(e);
      }
    };
    getPassengers();
  }, []);

  return (
    <div className="content-container">
      <h1>Passengers</h1>
      {isLoading ? (
        <CurrentUsersTable user_role={"passenger"} users={loading} />
      ) : (
        <CurrentUsersTable user_role={"passenger"} users={users} />
      )}
      ;
    </div>
  );
};

const loading = [
  {
    id: "Loading...",
    name: "Loading...",
    email: "Loading..",
  },
];
