// src/components/Projects.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme CSS
import mvp1_image1 from '../assets/mvp1_image1.png';
import mvp1_image2 from '../assets/mvp1_image2.png';
import mvp1_image3 from '../assets/mvp1_image3.png';
import landing_image1 from '../assets/uiVs1.png';
import landing_image2 from '../assets/uiVs2.png';
import landing_image3 from '../assets/uiVs3.png';
import mvp2_image1 from '../assets/mvp2_image1.png';
import mvp2_image2 from '../assets/mvp2_image2.png';
import mvp2_image3 from '../assets/mvp2_image3.png';
import model1 from '../assets/model1.jpg';
import model2 from '../assets/model2.jpg';
import model3 from '../assets/model3.jpg';
import apicus1 from '../assets/apicus-1-ss.png';
import apicus2 from '../assets/apicus-2-ss.png';
import apicus3 from '../assets/apicus-3-ss.png';
import sie1 from '../assets/sie-wellness-1.png';
import sie2 from '../assets/sie-wellness-2.png';

function Projects() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  const projects = [
    {
      title: 'MarketBump.io - MVP 1',
      description: `Developed a full-stack web application for personalized stock market news and social interactions.

- Built a backend API using Flask and MongoDB to store user data, portfolios, and news articles fetched from the Polygon.io API.
- Implemented a dynamic, personalized newsfeed based on user portfolios, likes, quotes, and favorites.
- Integrated social features allowing users to like, quote ('ReBump'), and favorite articles.
- Utilized Next.js for a framework and SEO-friendly frontend with dynamic routing and server-side rendering.`,
      images: [mvp1_image1, mvp1_image2, mvp1_image3],
      projectUrl: 'https://marketbump.io',
      githubUrl: 'https://github.com/pawelsloboda5/marketBump-backend',
    },
    {
      title: 'MarketBump.io - Landing Page',
      description: `Created a landing page for MarketBump using React, Vite, and Tailwind CSS.

- Designed a responsive and visually appealing interface to attract potential users.
- Provided information about the platform and its features.`,
      images: [landing_image1, landing_image2, landing_image3],
      projectUrl: 'https://marketbump.io',
      githubUrl: 'https://github.com/pawelsloboda5/marketbump-front/tree/master',
    },
    {
      title: 'MarketBump.io - MVP 2',
      description: `Developed an enhanced version of MarketBump with new features.

- Implemented OCR using a BERT model to extract stock tickers from screenshots (e.g., Robinhood portfolio).
- Built a backend using SQLite to store and retrieve articles related to extracted stock tickers.
- Improved frontend to display articles based on user's portfolio extracted from the screenshot.
- Waiting to be deployed.`,
      images: [mvp2_image1, mvp2_image2, mvp2_image3],
      projectUrl: 'https://marketbump.io',
      githubUrl: 'https://github.com/pawelsloboda5/marketBump-backend',
    },
    {
      title: 'Player Detection Model - Real-time Object Detection at 30 FPS',
      description: `Developed and fine-tuned a YOLO-based model for real-time detection of player objects in a gaming environment, achieving robust performance metrics.
  
  - Leveraged CUDA and GPU acceleration for efficient model training and inference, ensuring real-time performance at 30 frames per second.
- Utilized a tech stack including Python, PyTorch, and Albumentations for data preprocessing, augmentation, and model fine-tuning.
- Achieved high precision (0.96131) and recall (0.87715), with mAP@50 (0.93558) and mAP@50-95 (0.71452) after extensive training over 237 epochs.
- Fine-tuned with a base confidence threshold of 0.7 and dynamically adjusted confidence for distant and partially occluded players.
- Model evaluation across 237 epochs showed consistent reduction in validation loss: 
  - Box loss: 0.44047, Class loss: 0.46528, and Distribution Focal Loss (DFL): 0.9074.
- Integrated dynamic learning rate adjustments and data augmentation techniques to improve model robustness and detection accuracy under varying in-game conditions.`,
      images: [model1, model2, model3],
      projectUrl: 'https://github.com/pawelsloboda5/player-detection',
      githubUrl: 'https://github.com/pawelsloboda5/player-detection',
    },
    {
      title: 'Apicus.ai Automation Visualizer',
      description: `Built an AI-powered workflow designer for a no-code automation startup.

- Implemented FastAPI backend with vector search (1M+ combinations) and sub‑100 ms responses.
- Designed front‑end visualizer allowing users to describe a workflow and instantly generate automation flows.
- Integrated ROI calculator to quantify automation impact and boost engagement 60%.`,
      images: [apicus1, apicus2, apicus3],
      projectUrl: 'https://apicus.ai',
      githubUrl: '#',
    },
    {
      title: 'SIE Wellness Landing Page',
      description: `Developed responsive landing page for healthcare fintech startup.

- Used React + Tailwind with Lighthouse 95+ mobile score.
- Features dynamic hero, feature grid, and bilingual waitlist CTAs.`,
      images: [sie1, sie2],
      projectUrl: '#',
      githubUrl: '#',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true, // Allow slider to adjust height based on content
  };

  return (
    <section id="projects" className="py-16 bg-white dark:bg-gray-900">
      <div className="mx-auto px-4 max-w-screen-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
        <div className="flex flex-wrap justify-center">
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-full p-4 cursor-pointer"
              onClick={() => setSelectedProjectIndex(selectedProjectIndex === index ? null : index)}
            >
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl mx-auto overflow-hidden">
                {/* Project Title and Summary */}
                <div className="p-8 text-left hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm mb-2 whitespace-pre-line">{project.description.split('\n')[0]}</p>
                  {/* Animated Arrow Icon on Hover */}
                  <div className="text-center text-gray-600 dark:text-gray-400">
                    {selectedProjectIndex === index ? null : (
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="inline-block mt-4"
                      >
                        <FiChevronDown />
                      </motion.div>
                    )}
                  </div>
                </div>
                {/* Full Details (Slider + Description) */}
                <AnimatePresence>
                  {selectedProjectIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative overflow-hidden"
                    >
                      {/* Image Slider */}
                      <Slider {...settings}>
                        {project.images.map((image, idx) => (
                          <div key={idx}>
                            <img
                              src={image}
                              alt={`${project.title} Screenshot ${idx + 1}`}
                              className="w-full h-64 lg:h-80 object-cover"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </Slider>
                      {/* Content */}
                      <div className="p-8 text-left">
                        <p className="text-sm mb-4 whitespace-pre-line">{project.description}</p>
                        <div className="flex">
                          {project.projectUrl && project.projectUrl !== '#' && (
                            <a
                              href={project.projectUrl}
                              className="text-blue-500 hover:underline mr-4"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Live Demo
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              className="text-blue-500 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                      {/* Arrow pointing up to collapse */}
                      <div className="text-center text-gray-600 dark:text-gray-400 mt-4">
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 10, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="inline-block"
                        >
                          <FiChevronUp />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
