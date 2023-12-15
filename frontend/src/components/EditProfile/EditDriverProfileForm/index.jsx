import React, { useEffect, useState } from "react"
import defaultPic from "../../../assets/images/Default_pfp.jpg"
import InputField from "../../common/InputField"
import Button from "../../common/Button"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { requestData } from "../../../core/axios"
import { setUser } from "../../../core/redux/user/userSlice"

const EditDriverProfileForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [error, setError] = useState({ msg: "", status: false })
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        phone_number: "",
        car_name: "",
        model: "",
        color: "",
        plate_number: "",
    })

    useEffect(() => {
        const token = localStorage.getItem("token")
        const headers = {
            Authorization: token,
        }
        if (!token) {
            navigate("/")
        }

        const getUser = async () => {
            try {
                const res = await requestData("get_user", "get", {}, headers)
                if (res.status == "success") {
                    dispatch(setUser(res.user))
                    setValues({
                        name: res.user.name,
                        email: res.user.email,
                        password: "",
                        confirmPassword: "",
                        location: res.user.location,
                        phone_number: res.user.phone_number,
                        car_name: res.car.name,
                        model: res.car.model,
                        color: res.car.color,
                        plate_number: res.car.plate_number,
                    })
                }
            } catch (err) {
                setError({
                    msg: "Something went Wrong",
                    status: true,
                })
            }
        }
        getUser()
    }, [])

    const handleEdit = async () => {
        const token = localStorage.getItem("token")
        const headers = {
            Authorization: token,
        }
        if (!token) {
            navigate("/")
        }
        if (values.confirmPassword !== values.password) {
            setError({
                msg: "passwords doesnt match",
                status: true,
            })
            return
        }
        console.log(values)
        try {
            const res = await requestData(
                "edit_driver",
                "post",
                values,
                headers
            )
            if (res.status == "success") {
                dispatch(setUser(res.user))
            }
        } catch (err) {
            setError({
                msg: "Something went Wrong",
                status: true,
            })
        }
    }

    const HandleOnInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <form className='edit-form'>
            <div className='profile-header'>
                <div className='edit-pfp-pic'>
                    <img src={defaultPic} alt='Profile Picture' />
                </div>
                <div className='edit-info'>
                    <div className='edit-name'>John Doe</div>
                    <div className='edit-email'>John@email.com</div>
                    <div className='upload-img-btn'>
                        <label className='btn btn-primary' htmlFor='pfp-img'>
                            Upload Photo
                        </label>
                        <input
                            type='file'
                            name='pfp-img'
                            id='pfp-img'
                            placeholder='Upload Photo'
                        />
                    </div>
                </div>
                <div className='edit-role'>Driver</div>
            </div>
            <div className='profile-body'>
                <div className='editform-pair'>
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
                <div className='editform-pair'>
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
                <div className='editform-pair'>
                    <InputField
                        type={"text"}
                        name={"location"}
                        text={"Location"}
                        value={values.location}
                        handleChange={HandleOnInputChange}
                    />
                    <InputField
                        type={"text"}
                        name={"phone_number"}
                        text={"Phone Number"}
                        value={values.phone_number}
                        handleChange={HandleOnInputChange}
                    />
                </div>
                <div className='editform-pair'>
                    <InputField
                        type={"text"}
                        name={"model"}
                        text={"Car Name"}
                        value={values.car_name}
                        handleChange={HandleOnInputChange}
                    />
                    <InputField
                        type={"text"}
                        name={"model"}
                        text={"Car Model"}
                        value={values.model}
                        handleChange={HandleOnInputChange}
                    />
                </div>
                <div className='editform-pair'>
                    <InputField
                        text={"Car Color"}
                        type={"text"}
                        name={"color"}
                        value={values.color}
                        handleChange={HandleOnInputChange}
                    />
                    <InputField
                        text={"Plate Number"}
                        type={"text"}
                        name={"plate_number"}
                        value={values.plate_number}
                        handleChange={HandleOnInputChange}
                    />
                </div>
                {error.status ? <span className='error'>{error.msg}</span> : ""}
                <div className='submit-btn-wrapper'>
                    <Button
                        text={"Edit Profile"}
                        type={"submit"}
                        handleOnClick={handleEdit}
                    />
                </div>
            </div>
        </form>
    )
}

export default EditDriverProfileForm
