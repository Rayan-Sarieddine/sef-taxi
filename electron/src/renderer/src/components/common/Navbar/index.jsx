import React, { useEffect, useState } from "react"
import "./style.css"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { extractUserSlice, setUser } from "../../../core/redux/user/userSlice"
import { requestData } from "../../../core/axios"
import PfpDropDown from "./PfpDropDown"

const Navbar = () => {
    const location = useLocation()
    const [display, setDisplay] = useState(false)
    const dispatch = useDispatch()
    const userState = useSelector(extractUserSlice)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isHidden, setIsHidden] = useState(true)
    useEffect(() => {
        if (location.pathname != "/") {
            setDisplay(true)
        } else setDisplay(false)
        const token = localStorage.getItem("token")
        const header = {
            Authorization: token,
        }

        if (!token) {
            console.error("Token not available")
            setIsLoggedIn(false)
            return
        }
        const refresh = async () => {
            try {
                const res = await requestData("refresh", "post", {}, header)
                if (res.status == "success") {
                    dispatch(setUser(res.user))
                    setIsLoggedIn(true)
                }
            } catch (err) {
                console.log(err)
            }
        }
        refresh()
    }, [location.pathname])

    const handleOnClickProfile = () => {
        setIsHidden((prev) => !prev)
    }
    return display ? (
        <div className='flex navbar'>
            <h1>Taxi Driver</h1>
            <div className='flex center profile'>
                <p>{userState.name}</p>
                <img
                    src={`http://127.0.0.1:8000/storage/uploads/default.jpg`}
                    alt=''
                    onClick={handleOnClickProfile}
                />
                <PfpDropDown
                    isHidden={isHidden}
                    setIsLoggedIn={setIsLoggedIn}
                />
            </div>
        </div>
    ) : (
        <></>
    )
}

export default Navbar
