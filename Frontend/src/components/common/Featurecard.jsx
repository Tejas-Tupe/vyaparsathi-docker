import React from "react";
import "./Featurecard.css";
const FeatureCard = ({ title, description }) => {
  return (
    <div className="feature">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
