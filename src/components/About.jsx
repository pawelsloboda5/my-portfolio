// src/components/About.jsx
import React from 'react';
import adobe_photo_professional_1 from '../assets/adobe-photo-professional-1.png';
import aiData from '../data/aiBotData.json';

function About() {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900 min-h-[50vh]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">About Me</h2>
        <div className="flex flex-col md:flex-row items-center">
          {/* Image or Illustration */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="w-128 h-128 mx-auto overflow-hidden rounded-full">
              <img 
                src={adobe_photo_professional_1}
                width="128"
                height="128"
                alt="Your portrait"
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: '50% 30%' }} // fine-tune the focus
              />
            </div>
          </div>
          {/* Text Content */}
          <div className="w-full md:w-2/3 md:pl-6">
            <p className="text-base md:text-lg lg:text-xl mb-4">
              {/* Insert your summary here */}
              {aiData.personalInfo.aboutMe}
            </p>
            {/*  details about your education and experience */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
