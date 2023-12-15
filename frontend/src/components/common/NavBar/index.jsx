import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PfpDropDown from "./PfpDropDown"
import { useDispatch, useSelector } from "react-redux"
import { extractUserSlice, setUser } from "../../../core/redux/user/userSlice"
import { requestData } from "../../../core/axios"
import "./styles.css"

const NavBar = () => {
  const dispatch = useDispatch()
  const userState = useSelector(extractUserSlice)

  const [isHidden, setIsHidden] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const headers = {
      Authorization: token,
    }
    if (!token) {
      setIsLoggedIn(false)
      return
    }
    const refresh = async () => {
      try {
        const res = await requestData("refresh", "post", {}, headers)
        if (res.status == "success") {
          dispatch(setUser(res.user))
          setIsLoggedIn(true)
        }
      } catch (err) { }
    }
    refresh()
  }, [])
  const handleOnClickProfile = () => {
    setIsHidden((prev) => !prev)
  }
  return (
    <nav className='nav-bar'>
      <Link to={"/"}>
        <span className='logo'>Taxi App</span>
      </Link>
      <div className='nav-items'>
        <ul>
          <li>
            <Link to={"/"} className='nav-item'>
              Home
            </Link>
          </li>
          {userState.role_id === 2 || userState.role_id === 1 ? (
            <li>
              <Link className='nav-item' to={"/customer"}>
                Call A Ride
              </Link>
            </li>
          ) : userState.role_id === 3 ? (
            <li>
              <Link className='nav-item' to={"/driver"}>
                Start Working
              </Link>
            </li>
          ) : (
            ""
          )}

          <li>
            <Link to={"/chatroom"} className='nav-item'>
              Contact us
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className='nav-item-nolink'>
                {userState.name}
              </li>
              <li>
                <div
                  className='pfp-pic'
                  onClick={handleOnClickProfile}>
                  <img
                    src={`http://127.0.0.1:8000/storage/${userState.img_url}`}
                    alt=''
                  />
                </div>
                <PfpDropDown
                  isHidden={isHidden}
                  setIsLoggedIn={setIsLoggedIn}
                />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/login"} className='nav-item'>
                  Login
                </Link>
              </li>
              <li>
                <Link to={"/register"} className='nav-item'>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar