import React from 'react';
import { motion } from 'framer-motion';

// Import the same project images used in Projects.jsx
import mvp1_image1 from '../assets/mvp1_image1.png';
import landing_image1 from '../assets/uiVs1.png';
import mvp2_image1 from '../assets/mvp2_image1.png';
import model1 from '../assets/model1.jpg';
import apicus1 from '../assets/apicus-1-ss.png';
import sie1 from '../assets/sie-wellness-1.png';

function ProjectGallery() {
  // Function to scroll to projects section when a preview is clicked
  const scrollToProjects = (index) => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
      
      // Set timeout to allow scroll to complete before triggering the project selection
      setTimeout(() => {
        // Find the ProjectCard component's select handler and trigger it
        const event = new CustomEvent('openProject', { detail: { index } });
        document.dispatchEvent(event);
      }, 800);
    }
  };

  // Project previews data - simplified version of the projects in Projects.jsx
  const projectPreviews = [
    { 
      title: 'MarketBump.io',
      image: mvp1_image1,
      index: 0,
      tech: 'Full-stack App'
    },
    { 
      title: 'Landing Page',
      image: landing_image1,
      index: 1,
      tech: 'React, Vite, Tailwind'
    },
    { 
      title: 'MarketBump MVP 2',
      image: mvp2_image1, 
      index: 2,
      tech: 'OCR, BERT Model'
    },
    { 
      title: 'Player Detection',
      image: model1,
      index: 3,
      tech: 'YOLO, PyTorch'
    },
    { 
      title: 'Apicus.ai',
      image: apicus1,
      index: 4,
      tech: 'FastAPI, Vector Search'
    },
    { 
      title: 'SIE Wellness',
      image: sie1,
      index: 5,
      tech: 'React, Tailwind'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {projectPreviews.map((project, idx) => (
        <motion.div 
          key={idx}
          whileHover={{ 
            y: -5,
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * idx + 0.5 }}
          className="cursor-pointer relative group rounded-lg shadow-lg"
          onClick={() => scrollToProjects(project.index)}
        >
          <div className="overflow-hidden rounded-lg aspect-video bg-gray-900">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          
          {/* Always visible label */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-black/60 p-3 rounded-b-lg">
            <span className="text-white text-sm font-medium block mb-1 line-clamp-1">
              {project.title}
            </span>
            <span className="text-blue-300 text-xs block opacity-80">
              {project.tech}
            </span>
          </div>
          
          {/* Hover overlay with CTA */}
          <div className="absolute inset-0 bg-indigo-900/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium py-2 px-3 rounded-full border border-white/40">
              View Project
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ProjectGallery; 