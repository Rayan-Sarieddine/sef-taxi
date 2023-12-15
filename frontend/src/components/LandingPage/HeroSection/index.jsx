import React from "react";
import "./styles.css";
import hero from "../HeroSection/hero.png";
import SkewedBtn from "../../common/SkewedBtn";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <img src={hero} alt="" />
      <div className="hero-section-content">
        <h1>
          Trusted &{" "}
          <span className="skewed">
            Cheapest <span className="bg-grey"></span>
          </span>
          <br />
          Service Company
        </h1>
        <SkewedBtn text={"Find A Taxi"} />
      </div>
    </section>
  );
};

export default HeroSection;
