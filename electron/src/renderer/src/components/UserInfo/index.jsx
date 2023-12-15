import React, { useEffect, useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { useNavigate, useParams } from "react-router";
import { requestData, requestDataShared } from "../../core/axios";

export const UserInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: "",
    email: "",
    password: "",
    name: "",
    car: "",
    status: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };
    if (!token) {
      navigate("/");
    }
    console.log("sss");
    const getDriver = async () => {
      try {
        const driver = await requestData("get_user", "post", { id: id }, headers);
        if (driver.status == "success") {
          setValues({
            id: driver.user.id,
            email: driver.user.email,
            password: driver.user.email,
            name: driver.user.name,
            model: driver.car.model,
            status: driver.user.driver.availability,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDriver();
  }, []);

  const HandleOnInputChange = (e) => {
    setValues((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }));
    console.log(values);
  };

  const handleEdit = async (e) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };
    if (!token) {
      navigate("/");
    }

    console.log(values);
    try {
      const res = await requestData("edit_driver", "post", values, headers);

      if (res.status == "success") {
        console.log("success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };
    if (!token) {
      navigate("/");
    }
    console.log(values);
    try {
      const res = await requestData("delete_user", "post", values, headers);
      if (res.status == "success") {
        console.log(" Driver Deleted Successfully");
        navigate("/drivers");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="info flex center">
      <img src="" alt="" />

      <form className="reg-form">
        <div className="registerform-pair flex center">
          <div className="left-inputs">
            <label htmlFor="id">Id</label>
            <InputField
              type={"text"}
              name={"id"}
              text={"Id"}
              value={values.id}
              handleChange={HandleOnInputChange}
              disabled={true}
            />
            <label htmlFor="email">Email</label>
            <InputField type={"email"} name={"email"} text={"Email"} value={values.email} handleChange={HandleOnInputChange} />
            <label htmlFor="password">Password</label>
            <InputField
              type={"password"}
              name={"password"}
              text={"Password"}
              value={values.password}
              handleChange={HandleOnInputChange}
            />
          </div>
          <div className="right-inputs">
            <label htmlFor="name">Name</label>
            <InputField type={"name"} name={"name"} text={"Name"} value={values.name} handleChange={HandleOnInputChange} />
            <label htmlFor="model">model</label>
            <InputField type={"text"} name={"model"} text={"model"} value={values.model} handleChange={HandleOnInputChange} />
            <label htmlFor="Status"> Status</label>
            <InputField
              type={"text"}
              name={"status"}
              text={"status "}
              value={values.status}
              handleChange={HandleOnInputChange}
              disabled={true}
            />
          </div>
        </div>
      </form>
      <div className="flex column info-right">
        <Button className={"viewDriverButton"} buttonText="Submit" text={"Edit"} handleOnClick={handleEdit} />
        <Button className={"viewDriverButton"} buttonText="Submit" text={"Delete"} handleOnClick={handleDelete} />
      </div>
    </div>
  );
};

// handleOnClick={handleDelete}
