import React, { useEffect, useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { useNavigate, useParams } from "react-router";
import { requestData } from "../../core/axios";
export const PassengerInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: "",
    email: "",
    password: "",
    name: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };
    if (!token) {
      navigate("/");
    }
    const getUser = async () => {
      try {
        const user = await requestData("get_user", "post", { id: id }, headers);
        if (user.status == "success") {
          setValues({
            id: user.user.id,
            email: user.user.email,
            password: user.user.email,
            name: user.user.name,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
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
      const res = await requestData("edit_user", "post", values, headers);

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
        console.log("Passenger Deleted Successfully");
        navigate("/passengers");
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
            <InputField type={"text"} name={"id"} text={"Id"} value={values.id} />
            <label htmlFor="email">Email</label>
            <InputField type={"email"} name={"email"} text={"Email"} value={values.email} handleChange={HandleOnInputChange} />
          </div>
          <div className="right-inputs">
            <label htmlFor="name">Name</label>
            <InputField type={"name"} name={"name"} text={"Name"} value={values.name} handleChange={HandleOnInputChange} />
            <label htmlFor="password">Password</label>
            <InputField
              type={"password"}
              name={"password"}
              text={"Password"}
              value={values.password}
              handleChange={HandleOnInputChange}
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
