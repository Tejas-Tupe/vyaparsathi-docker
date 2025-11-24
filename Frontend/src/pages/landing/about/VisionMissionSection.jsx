import React from 'react';
import FeatureCard from '../../../components/common/FeatureCard.jsx';

const VisionMissionSection = () => {
  const items = [
    {
      id: 'vision',
      title: 'Vision',
      description:
        'To empower small and medium enterprises across India to confidently join the digital economy through affordable, reliable, and scalable tools that grow with their needs. The long-term goal is to offer valuable business insights without adding complexity.',
    },
    {
      id: 'mission',
      title: 'Mission',
      description:
        'To make digital business management accessible and useful for small shop owners — reduce friction, save time, and let them focus on customers. Vyaparsathi should be simple enough to learn in minutes yet powerful enough to handle daily business needs.',
    },
    {
      id: 'values',
      title: 'Values',
      description:
        'We focus on practical, real-world problems; keep things simple and easy to use; maintain security and data privacy by design; and continuously improve the platform through small, meaningful updates based on user feedback.',
    },
  ];

  return (
    <section className="about-section" aria-labelledby="vision-heading">
      <h2 id="vision-heading" className="section-heading">Vision · Mission · Values</h2>

      <div className="vision-grid" role="list" aria-label="Vision and mission cards">
        {items.map((item) => (
          <div key={item.id} role="listitem" aria-label={item.title}>
            <FeatureCard title={item.title} description={item.description} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisionMissionSection;
