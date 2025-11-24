import React from 'react';
import FeatureCard from '../../../components/common/FeatureCard.jsx';

const JourneySection = () => {
  const cards = [
    {
      id: 'requirements',
      title: 'Requirements & Research',
      description:
        'We started by observing how local shops operate: manual ledgers, frequent price changes, and limited time for complex tools. Requirements were kept practical — fast product entry, instant invoice generation, and easy stock visibility so merchants can adopt the system immediately.',
    },
    {
      id: 'architecture',
      title: 'Architecture & Design (MVC mindset)',
      description:
        'The application is structured using the MVC mindset for clear separation of concerns. Data models are defined in MongoDB, server-side controllers (Node + Express) expose REST endpoints, and the React frontend provides the UI layer. This structure helps keep the codebase modular, maintainable, and scalable.',
    },
    {
      id: 'implementation',
      title: 'Implementation & Development',
      description:
        'Built incrementally using the MERN stack: React for UI, Node/Express for APIs, and MongoDB for storage. Feature branches, pull requests, and code reviews ensured quality. Core flows like auth, product CRUD, orders, and invoice export were prioritized and delivered iteratively.',
    },
    {
      id: 'security',
      title: 'Security & Auth',
      description:
        'Authentication is JWT-based with protected server routes, hashed passwords, and token verification middleware. Sensitive actions require role checks and server-side validation to prevent unauthorized access and ensure data integrity.',
    },
    {
      id: 'testing',
      title: 'Testing & QA',
      description:
        'We applied unit tests for utilities and integration tests for main flows (login, create order). Manual UAT with real shopkeepers helped refine UX and catch edge cases early before deployment.',
    },
    {
      id: 'scaling',
      title: 'Scaling & Maintainability',
      description:
        'To keep the app production-ready we organized controllers and services with single-responsibility, used environment-driven configuration, and added pagination and DB indexes where needed to maintain performance as data grows.',
    },
  ];

  return (
    <section className="about-section" aria-labelledby="journey-heading">
      <h2 id="journey-heading" className="section-heading">How we built Vyaparsathi</h2>

      <div className="journey-grid" role="list" aria-label="Development journey cards">
        {cards.map((c) => (
          <div key={c.id} role="listitem" aria-label={c.title}>
            <FeatureCard title={c.title} description={c.description} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default JourneySection;
