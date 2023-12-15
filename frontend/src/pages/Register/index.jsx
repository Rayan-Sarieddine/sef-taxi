import React from "react"
import "./styles.css"
import NavBar from "../../components/common/NavBar"
import Footer from "../../components/common/Footer"
import RegisterForm from "../../components/auth/RegisterForm"

const Register = () => {
    return (
        <div>
            <NavBar />
            <main className='register-main'>
                <RegisterForm />
            </main>
            <Footer />
        </div>
    )
}

export default Register
