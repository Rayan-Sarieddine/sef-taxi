import React from "react"
import "./styles.css"

import NavBar from "../../components/common/NavBar"
import Footer from "../../components/common/Footer"
import HeroSection from "../../components/LandingPage/HeroSection"
import AboutUs from "../../components/LandingPage/AboutUs"

const LandingPage = () => {
    return (
        <div className='page'>
            <NavBar />
            <HeroSection />
            <AboutUs />
            <Footer />
        </div>
    )
}

export default LandingPage
