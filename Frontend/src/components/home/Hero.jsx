import React from "react";
import "../../pages/landing/home.css";
import Button from "../common/Button.jsx";

const Hero = ({ onPrimaryClick }) => {
  return (
    <section className="home-hero">
      <div className="hero-inner container">
        <div className="hero-left">
          <h1 className="hero-title">
            Manage your business the simple, local-first way
          </h1>
          <p className="hero-sub">
            Vyaparsathi helps small businesses manage inventory, orders, and
            customers — fast and secure. Start free and grow at your pace.
          </p>

          <div className="hero-cta">
            <Button variant="primary" onClick={onPrimaryClick}>
              Get Started — It's Free
            </Button>

            <a href="/about" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Learn more</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
