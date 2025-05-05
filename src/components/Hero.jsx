// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
// Import directly using the full path to be safe
import meteorGifPath from '../assets/meteor-gif-shower.gif';
import ProjectGallery from './ProjectGallery';

function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[#090029] via-[#050013] to-[#010009]">
      {/* Background GIF */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <img 
          src={meteorGifPath} 
          alt="Meteor shower background" 
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 flex flex-col">
        {/* Hero Content - reduced height */}
        <div 
          id="hero"
          className="flex flex-col items-center justify-center text-white pt-16 pb-8 min-h-[70vh]"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="relative z-10 text-center max-w-2xl w-full"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.35)]">
              Pawel&nbsp;Sloboda
            </h1>
            <p className="text-xl sm:text-3xl font-semibold mb-6 leading-snug whitespace-normal max-w-md sm:max-w-none mx-auto">
              Machine Learning Engineer&nbsp;&amp;&nbsp;<span className="block sm:inline">Software Developer</span>
            </p>

            {/* Short bio */}
            <p className="max-w-xl mx-auto text-base sm:text-lg opacity-90 mb-8 backdrop-blur-md bg-black/30 rounded-lg py-4 px-6">
              I build AI-powered and cloud-native solutions that elevate cybersecurity training and automate complex workflows.
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <a
                href="https://drive.google.com/file/d/1Zmn5VA7xDCxftKDOydrYiv8TBbjpbT0U/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-100 transition-colors text-sm"
                aria-label="View my resume"
              >
                View Resume
              </a>
              <a
                href="https://www.linkedin.com/in/pawel-sloboda-383181216/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-blue-500 transition-colors text-sm"
                aria-label="Visit my LinkedIn profile"
              >
                View LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        {/* Project Gallery - visibly connected to the hero section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full pb-12"
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
              <a 
                href="#projects" 
                className="bg-indigo-600 text-white hover:bg-indigo-500 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center"
                aria-label="View all my projects"
              >
                Explore All Projects
              </a>
            </div>
            
            {/* The ProjectGallery component will render the grid of project previews */}
            <ProjectGallery />
          </div>
        </motion.div>
        
       
      </div>
    </section>
  );
}

export default Hero;
