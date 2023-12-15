import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import { drivers } from "../../core/mockData";
import { requestData } from "../../core/axios";
import { useNavigate } from "react-router";

export const DriverRequests = ({ users }) => {
  const navigate = useNavigate();

  const handleAccept = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not available");
      setIsLoggedIn(false);
      return;
    }
    const headers = {
      Authorization: token,
    };
    const result = await requestData("approve", "post", { id }, headers);
    navigate(0);
  };
  const handleDeny = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not available");
      setIsLoggedIn(false);
      return;
    }
    const headers = {
      Authorization: token,
    };
    const result = await requestData("deny", "post", { id }, headers);
    navigate(0);
  };

  return (
    <table>
      <thead>
        <tr>
          <th className="table-header" colSpan="7">
            Potential Driver Requests
          </th>
        </tr>
        <tr>
          <th>Driver</th>
          <th>Email</th>
          <th>Location</th>
          <th>Car</th>
          <th>Color</th>
          <th>Plate</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((driver, index) => (
          <tr key={index}>
            <td className="img-name">
              <img src={`http://127.0.0.1:8000/storage/${driver.img_url}`} alt="" />
              {driver.name}
            </td>
            <td>{driver.email}</td>
            <td>{driver.location}</td>
            <td>{driver.model}</td>
            <td>{driver.color}</td>
            <td>{driver.plate_number}</td>
            <td className="status flex">
              <Button text={"Accept"} handleOnClick={() => handleAccept(driver.id)} className="accept-btn" />
              <Button text={"Deny"} handleOnClick={() => handleDeny(driver.id)} className={"accept-btn"} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
