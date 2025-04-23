// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white px-4"
    >
      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-lg w-full"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight text-center max-w-xs sm:max-w-none mx-auto">
          Pawel Sloboda
        </h1>
        <p className="text-xl sm:text-3xl font-semibold mb-6 leading-snug whitespace-normal max-w-md sm:max-w-none mx-auto">
          Machine Learning Engineer&nbsp;&amp;&nbsp;<span className="block sm:inline">Software Developer</span>
        </p>

        {/* Short bio */}
        <p className="max-w-md mx-auto text-base sm:text-lg opacity-90 mb-6">
          I build AI‑powered and cloud‑native solutions that elevate cybersecurity training and automate complex workflows.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <a
            href="https://drive.google.com/file/d/1Zmn5VA7xDCxftKDOydrYiv8TBbjpbT0U/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-100 transition-colors text-sm"
          >
            Download Resume
          </a>
          <a
            href="https://www.linkedin.com/in/pawel-sloboda-383181216/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-blue-500 transition-colors text-sm"
          >
            View LinkedIn
          </a>
        </div>

        {/* Quick links */}
        <div className="flex justify-center gap-4 mt-6 flex-wrap text-lg">
          <a href="#experience" className="underline text-white/90 hover:text-white">Experience</a>
          <span className="text-white/60">•</span>
          <a href="#projects" className="underline text-white/90 hover:text-white">Projects</a>
          <span className="text-white/60">•</span>
          <a href="#skills" className="underline text-white/90 hover:text-white">Skills</a>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
