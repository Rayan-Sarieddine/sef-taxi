import React from "react"
import "./styles.css"

const Footer = () => {
    return (
        <footer>
            <div className='footer-body'>
                <div className='footer-part footer-part-1'>
                    <div className='footer-tite'>Quick Links</div>
                    <div className='footer-link footer-text'>➜ Home</div>
                    <div className='footer-link footer-text'>➜ Login</div>
                    <div className='footer-link footer-text'>➜ Register</div>
                    <div className='footer-link footer-text'>➜ Call A Ride</div>
                    <div className='footer-link footer-text'>➜ Contact Us</div>
                </div>
                <div className='footer-part footer-part-2'>
                    <div className='footer-tite'>About Us</div>
                    <p className='footer-text'>
                        Welcome to Taxi App, where we redefine transportation
                        with reliability, safety, and exceptional service. Our
                        well-maintained fleet and professional drivers ensure a
                        comfortable and timely journey, making us your trusted
                        partners in reaching your destination with ease.
                    </p>
                </div>
            </div>
            <div className='copy-rights'>
                Made by: Ali Hakim, Ali El Chab, Nadim Ridaii, Rayan Sarieddine
                ©
            </div>
        </footer>
    )
}

export default Footer
