import React from "react";
import FeatureCard from "../../../components/common/Featurecard.jsx";

const IntroSection = () => {
  const features = [
    {
      title: "Inventory & Billing",
      description:
        "Manage stock levels, create invoices, and track daily sales seamlessly from one place.",
    },
    {
      title: "Customer Management",
      description:
        "Maintain customer records and purchase history to improve service and follow-ups.",
    },
    {
      title: "Secure & Simple",
      description:
        "Designed for non-technical users with focus on security, speed, and data reliability.",
    },
  ];

  return (
    <section className="about-section" aria-labelledby="intro-heading">
      <h2 id="intro-heading" className="section-heading">
        What is Vyaparsathi?
      </h2>

      <p className="intro-paragraph">
        <strong>Vyaparsathi</strong> is a simple, practical business management
        app built for small and medium shop owners. It combines inventory,
        billing, and basic order management in one place so shopkeepers can
        reduce paperwork and run daily operations faster.
      </p>

      <p className="intro-paragraph">
        The app is designed to be easy to use add products, track stock, create
        invoices, and keep customer records all without complicated setup. The
        goal is to bring reliable, secure digital tools to local businesses so
        they can save time and grow.
      </p>

      <div className="intro-features">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default IntroSection;
