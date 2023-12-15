import React, { useEffect, useState } from "react"
import defaultPic from "../../../assets/images/Default_pfp.jpg"
import InputField from "../../common/InputField"
import Button from "../../common/Button"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { requestData } from "../../../core/axios"
import { setUser } from "../../../core/redux/user/userSlice"

const EditPassengerProfileForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [file, setFile] = useState(null)
    const [img, setImg] = useState(null)
    const [error, setError] = useState({ msg: "", status: false })
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        phone_number: "",
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
                    setImg(res.user.img_url)
                    setValues({
                        name: res.user.name,
                        email: res.user.email,
                        password: "",
                        confirmPassword: "",
                        location: res.user.location,
                        phone_number: res.user.phone_number,
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

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const handleFileUpload = async () => {
        const token = localStorage.getItem("token")
        const headers = {
            Authorization: token,
        }
        const formData = new FormData()
        formData.append("picture", file)

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/upload_pic",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        ...headers,
                    },
                }
            )

            if (response.ok) {
                const result = await response.json()
                console.log("Upload successful:", result)
                setImg(result.picture_path)
            } else {
                console.error("Upload failed:", response.statusText)
            }
        } catch (error) {
            console.error("Error during upload:", error.message)
        }
    }

    const HandleOnInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

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

        try {
            const res = await requestData(
                "edit_passenger",
                "post",
                values,
                headers
            )
            if (res.status == "success") {
                handleFileUpload()
                dispatch(setUser(res.user))
                setError({ msg: "", status: false })
            }
        } catch (err) {
            setError({
                msg: "Something went Wrong",
                status: true,
            })
        }
    }
    return (
        <form className='edit-form'>
            <div className='profile-header'>
                <div className='edit-pfp-pic'>
                    <img
                        src={`http://127.0.0.1:8000/storage/${img}`}
                        alt='Profile Picture'
                    />
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
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className='edit-role'>Passenger</div>
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

export default EditPassengerProfileForm
