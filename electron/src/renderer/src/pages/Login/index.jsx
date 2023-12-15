import React from "react";
import LoginForm from "../../components/LoginForm";
import "./styles.css";
const Login = () => {
  return (
    <div className="flex center column login">
      <h1 className="admin-login-title">Taxi App</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
