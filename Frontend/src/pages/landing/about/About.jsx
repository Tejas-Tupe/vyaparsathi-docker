import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../../components/layout/Navbar.jsx';
import Footer from '../../../components/layout/Footer.jsx';
import IntroSection from './Introsection.jsx';
import JourneySection from './JourneySection.jsx';
import FounderSection from './FounderSection.jsx';
import VisionMissionSection from './VisionMissionSection.jsx';

import './about.css';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <>
      <Navbar />

      {/* Page Container with smooth fade */}
      <motion.main
        className="about-wrapper container"
        role="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Section 1: Intro */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <IntroSection />
        </motion.div>

        {/* Section 2: Journey */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <JourneySection />
        </motion.div>

        {/* Section 3: Founder */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        >
          <FounderSection />
        </motion.div>

        {/* Section 4: Vision, Mission, Values */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <VisionMissionSection />
        </motion.div>
      </motion.main>

      <Footer />
    </>
  );
};

export default About;
