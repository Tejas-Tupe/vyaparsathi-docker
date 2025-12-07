import React from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import Hero from "../../components/home/Hero.jsx";
import Footer from "../../components/layout/Footer.jsx";
import FeatureCard from "../../components/common/Featurecard.jsx";
import "./home.css";
import "../../components/common/common.css";

// Feature Data Array
const FEATURES = [
  {
    title: "Inventory made easy",
    description:
      "Quickly add products, manage stock, and track value — all on one screen.",
  },
  {
    title: "Orders & Billing",
    description:
      "Create invoices, accept payments, and export reports without leaving the app.",
  },
  {
    title: "Customers & Loyalty",
    description:
      "Keep customer notes, history, and offer repeat-customer perks.",
  },
  {
    title: "Secure & Local",
    description:
      "Secure JWT authentication and data export options for backups.",
  },
];

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero onPrimaryClick={() => (window.location.href = "/register")} />

      <section className="home-features container">
        <h2 className="section-heading">Why Vyaparsathi?</h2>

        {/* Dynamic Feature Rendering */}
        <div className="features-grid">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
