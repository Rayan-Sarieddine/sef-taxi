import React, { useState } from "react";
import "./styles.css";
import InputField from "../common/InputField";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { setUser } from "../../core/redux/user/userSlice";
import { useDispatch } from "react-redux";
import { requestData } from "../../core/axios";
// import axios from "axios";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const HandleOnInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  const handleLogin = async () => {
    try {
      const res = await requestData("login", "post", values);
      if (res.status == "success") {
        localStorage.setItem("token", `Bearer ${res.authorisation.token}`);
        console.log(res.user);
        dispatch(setUser(res.user));
        navigate("/drivers");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="login-form">
      <h2 className="form-title">Enter Admin Credentials</h2>
      <div className="form-body">
        <div className="email-field-wrapper">
          <InputField
            name={"email"}
            type={"email"}
            text={"Email"}
            value={values.email}
            handleChange={(e) => {
              HandleOnInputChange(e);
            }}
          />
        </div>
        <div className="password-field-wrapper">
          <InputField
            name={"password"}
            type={"password"}
            text={"Password"}
            value={values.password}
            handleChange={(e) => {
              HandleOnInputChange(e);
            }}
          />
        </div>
        <div className="btn-wrapper">
          <Button text={"Login"} handleOnClick={handleLogin} type={"submit"} />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
