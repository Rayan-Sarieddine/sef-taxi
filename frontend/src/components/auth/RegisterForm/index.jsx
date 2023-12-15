import React, { useState } from "react"
import "./styles.css"
import PassengerForm from "./PassengerForm"
import DriverForm from "./DriverForm"

const RegisterForm = () => {
    const [active, setActive] = useState("p")

    return (
        <div className='register-form'>
            <div className='change-role'>
                <div
                    onClick={() => {
                        setActive("p")
                    }}
                    className={active === "p" ? "role active" : "role"}>
                    <span>As a Passenger</span>
                </div>
                <div
                    onClick={() => {
                        setActive("d")
                    }}
                    className={active === "d" ? "role active" : "role"}>
                    <span>As a Driver</span>
                </div>
            </div>
            <h2 className='form-title'>Enter Your Information</h2>
            <div className='form-body'>
                {active === "p" ? <PassengerForm /> : <DriverForm />}
            </div>
        </div>
    )
}

export default RegisterForm
