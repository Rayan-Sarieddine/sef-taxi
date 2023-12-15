import React from "react";
import "./styles.css";
import pic2 from "../../../assets/images/pic-2.jpg";
import pic3 from "../AboutUs/taxi.png";

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-us-imgs">
        <img src={pic3} alt="" className="img-1" />
        <img src={pic2} alt="" className="img-2" />
      </div>
      <div className="about-us-content">
        <div className="about-us-header">
          <div className="about-us-lines">
            <div className="line-1"></div>
            <div className="line-2"></div>
          </div>
          <h2>About Us</h2>
        </div>
        <div className="about-us-slogon">
          We Are Your <br /> Business Partners
        </div>
        <div className="about-us-body">
          <p>
            We've been in the market since who knows when and you will be very
            happy with us I promise
          </p>
          <p className="about-us-footer">
            Ali Hakim <span className="ceo">-CEO</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
