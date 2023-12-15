import React from "react"
import NavBar from "../../components/common/NavBar"
import Footer from "../../components/common/Footer"
import LoginForm from "../../components/auth/LoginForm"
import "./styles.css"

const Login = () => {
    return (
        <div className='page'>
            <NavBar />
            <main className='login-main'>
                <LoginForm />
            </main>
            <Footer />
        </div>
    )
}

export default Login
