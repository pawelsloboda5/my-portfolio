// src/components/Projects.jsx
import React from 'react';
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

function Projects() {
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
    // Add more projects if needed
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
            <div key={index} className="w-full p-4">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl mx-auto overflow-hidden">
                {/* Image Slider */}
                <div className="relative">
                  <Slider {...settings}>
                    {project.images.map((image, idx) => (
                      <div key={idx}>
                        <img
                          src={image}
                          alt={`${project.title} Screenshot ${idx + 1}`}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
                {/* Content */}
                <div className="p-8 text-left">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm mb-4 whitespace-pre-line">
                    {project.description}
                  </p>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;