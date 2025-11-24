import React from 'react';
import FounderImg from '../../../assets/founder.jpg';
import './FounderSection.css';

const FounderSection = () => {
  return (
    <section className="founder" aria-labelledby="founder-heading">
      <h2 id="founder-heading" className="founder-title">About the Founder</h2>

      <div className="founder-content">
        {/* Left Side — Text */}
        <div className="founder-info">
          <h3 className="founder-name">Tejas Tupe</h3>
          <p className="founder-role">Founder of Vyaparsathi</p>

          <p className="founder-desc">
            I’m a Software Engineering student passionate about building
            scalable, impactful digital products. I created <strong>Vyaparsathi </strong> 
            to help small businesses handle inventory, billing, and customers easily.
          </p>

          <p className="founder-desc">
            I followed complete <strong>SDLC practices</strong>, structured it using 
            <strong> MVC architecture</strong>, integrated <strong>JWT-based authentication</strong>,
            and deployed via <strong>Dockerized CI/CD</strong> on the cloud for scalability.
          </p>
        </div>

        {/* Right Side — Photo */}
        <div className="founder-photo-box">
          <img
            src={FounderImg}
            alt="Tejas Tupe — Founder of Vyaparsathi"
            className="founder-photo"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
