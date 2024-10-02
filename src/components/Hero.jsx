// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import StarsBackground from './StarsBackground';

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <StarsBackground />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center text-black dark:text-white px-4"
      >
        <h1 className="text-5xl font-bold mb-4 dark:text-white light:text-black">Welcome to My Portfolio</h1>
        <p className="text-xl">I'm a passionate developer.</p>
        {/* Add more content or call-to-action buttons here */}
      </motion.div>
    </section>
  );
}

export default Hero;
