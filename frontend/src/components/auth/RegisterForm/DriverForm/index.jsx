import React, { useState } from "react"
import InputField from "../../../common/InputField"
import Button from "../../../common/Button"
import { Link, useNavigate } from "react-router-dom"
import { requestData } from "../../../../core/axios"

const DriverForm = () => {
    const navigate = useNavigate()

    const [error, setError] = useState({ msg: "", status: false })
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "beirut",
        phone_number: "",
        car_name: "",
        model: "",
        color: "",
        plate_number: "",
    })

    const HandleOnInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        console.log(values)
    }

    const handleRegister = async () => {
        if (values.confirmPassword !== values.password) {
            setError({
                msg: "passwords doesnt match",
                status: true,
            })
            return
        }
        try {
            const res = await requestData("register_driver", "post", values)
            if (res.status == "success") {
                Notification.requestPermission().then((perm) => {
                    if (perm === "granted")
                        new Notification("Your request is now pending")
                })
                navigate("/")
            }
        } catch (err) {
            setError({
                msg: "Something went Wrong",
                status: true,
            })
        }
    }
    return (
        <form className='reg-form'>
            <div className='registerform-pair'>
                <InputField
                    type={"text"}
                    name={"name"}
                    text={"Name"}
                    value={values.name}
                    handleChange={HandleOnInputChange}
                />
                <InputField
                    type={"email"}
                    name={"email"}
                    text={"Email"}
                    value={values.email}
                    handleChange={HandleOnInputChange}
                />
            </div>
            <div className='registerform-pair'>
                <InputField
                    type={"password"}
                    name={"password"}
                    text={"Password"}
                    value={values.password}
                    handleChange={HandleOnInputChange}
                />
                <InputField
                    type={"password"}
                    name={"confirmPassword"}
                    text={"Confirm Password"}
                    value={values.confirmPassword}
                    handleChange={HandleOnInputChange}
                />
            </div>
            <div className='registerform-pair'>
                <InputField
                    type={"text"}
                    name={"phone_number"}
                    text={"Phone Number"}
                    value={values.phone_number}
                    handleChange={HandleOnInputChange}
                />
                <InputField
                    type={"text"}
                    name={"car_name"}
                    text={"Car Name"}
                    value={values.car_name}
                    handleChange={HandleOnInputChange}
                />
            </div>
            <div className='registerform-pair'>
                <InputField
                    type={"text"}
                    name={"model"}
                    text={"Car Model"}
                    value={values.model}
                    handleChange={HandleOnInputChange}
                />
                <InputField
                    text={"Car Color"}
                    type={"text"}
                    name={"color"}
                    value={values.color}
                    handleChange={HandleOnInputChange}
                />
            </div>
            <div className='registerform-pair'>
                <InputField
                    text={"Plate Number"}
                    type={"text"}
                    name={"plate_number"}
                    value={values.plate_number}
                    handleChange={HandleOnInputChange}
                />
                <select
                    className='select-input'
                    name={"location"}
                    id={"location"}
                    value={values.location}
                    onChange={HandleOnInputChange}>
                    <option value='beirut'>Beirut</option>
                    <option value='tripoli'>Tripoli</option>
                    <option value='batroun'>Batroun</option>
                    <option value='sayda'>Sayda</option>
                    <option value='chouf'>Chouf</option>
                    <option value='south'>South</option>
                </select>
            </div>
            {error.status ? <span className='error'>{error.msg}</span> : ""}
            <div className='submit-btn-wrapper'>
                <Button
                    type={"submit"}
                    handleOnClick={handleRegister}
                    text={"Register"}
                />
                <p>
                    Already Have an Account?{" "}
                    <Link to={"/login"}>Login Here.</Link>
                </p>
            </div>
        </form>
    )
}

export default DriverForm
