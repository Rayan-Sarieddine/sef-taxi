import React, { useEffect } from "react"
import NavBar from "../../components/common/NavBar"
import Footer from "../../components/common/Footer"
import EditPassengerProfileForm from "../../components/EditProfile/EditPassengerProfileForm"
import "./styles.css"
import { useSelector } from "react-redux"
import { extractUserSlice } from "../../core/redux/user/userSlice"
import EditDriverProfileForm from "../../components/EditProfile/EditDriverProfileForm"
import { useNavigate } from "react-router"

const EditProfile = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/")
        }
    }, [])
    const userState = useSelector(extractUserSlice)
    return (
        <div className='page'>
            <NavBar />
            <main className='edit-main'>
                {userState.role_id == 3 ? (
                    <EditDriverProfileForm />
                ) : (
                    <EditPassengerProfileForm />
                )}
            </main>
            <Footer />
        </div>
    )
}

export default EditProfile
