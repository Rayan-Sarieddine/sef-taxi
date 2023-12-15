import React, { useState } from "react"
import "./styles.css"
import InputField from "../../common/InputField"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../common/Button"
import { requestData } from "../../../core/axios"
import { useDispatch } from "react-redux"
import { setUser } from "../../../core/redux/user/userSlice"

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [error, setError] = useState({ msg: "", status: false })
    const [values, setValues] = useState({
        email: "",
        password: "",
    })
    const HandleOnInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleLogin = async () => {
        try {
            const res = await requestData("login", "post", values)
            if (res.status == "success") {
                localStorage.setItem(
                    "token",
                    `Bearer ${res.authorisation.token}`
                )
                dispatch(setUser(res.user))
                navigate("/")
            }
        } catch (err) {
            setError({
                msg: "Wrong Credentials",
                status: true,
            })
        }
    }

    return (
        <form className='login-form'>
            <h2 className='form-title'>Enter Your Credentials</h2>
            <div className='form-body'>
                <div className='email-field-wrapper'>
                    <InputField
                        type={"email"}
                        name={"email"}
                        text={"Email"}
                        value={values.email}
                        handleChange={HandleOnInputChange}
                    />
                </div>
                <div className='password-field-wrapper'>
                    <InputField
                        type={"password"}
                        name={"password"}
                        text={"Password"}
                        value={values.password}
                        handleChange={HandleOnInputChange}
                    />
                </div>
                {error.status ? <span className='error'>{error.msg}</span> : ""}
                <div className='btn-wrapper'>
                    <Button
                        text={"Login"}
                        handleOnClick={handleLogin}
                        type={"submit"}
                    />
                    <p>
                        Don't have an account?
                        <Link to={"/register"}>Register here.</Link>
                    </p>
                </div>
            </div>
        </form>
    )
}
export default LoginForm
