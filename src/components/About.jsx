// src/components/About.jsx
import React from 'react';
import adobe_photo_professional_1 from '../assets/adobe_photo_professional_1.png';

function About() {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <div className="flex flex-col md:flex-row items-center">
          {/* Image or Illustration */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="w-64 h-64 mx-auto overflow-hidden rounded-full">
              <img 
                src={adobe_photo_professional_1}
                alt="Your Name" 
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: '50% 30%' }} // Adjust these values to fine-tune the focus
              />
            </div>
          </div>
          {/* Text Content */}
          <div className="w-full md:w-2/3 md:pl-6">
            <p className="mb-4">
              {/* Insert your summary here */}
              Hi, I'm Pawel Sloboda, a developer with a passion for creating beautiful and functional web applications, ML models and AI.
            </p>
            {/* Add more details about your education and experience */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
