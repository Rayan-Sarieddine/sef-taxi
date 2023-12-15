import React from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../../../core/redux/user/userSlice";
import { requestData } from "../../../../core/axios";
import { useDispatch } from "react-redux";

const PfpDropDown = ({ isHidden, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: token,
      };

      if (!token) {
        console.error("Token not available");
        setIsLoggedIn(false);
        return;
      }
      const res = await requestData("logout", "post", {}, headers);
      if (res.status == "success") {
        dispatch(clearUser(res.user));
        localStorage.removeItem("token");

        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={isHidden ? "pfp-drop-down" : "pfp-drop-down pfp-show"}>
      <Link className="pfp-drop-down-item" onClick={handleOnClick}>
        Log out
      </Link>
    </div>
  );
};

export default PfpDropDown;
