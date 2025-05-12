import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import the same project images used in Projects.jsx
import mvp1_image1 from '../assets/mvp1-image1.png';
import landing_image1 from '../assets/uiVs1.png';
import mvp2_image1 from '../assets/mvp2_image1.png';
import model1 from '../assets/model1.jpg';
import apicus1 from '../assets/apicus-1-ss.png';
import sie1 from '../assets/sie-wellness-1.png';
import castleidle from '../assets/castleidle.png';
import calworks1 from '../assets/calWorks-1.png';

// Custom Arrow Components
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      type="button"
      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full cursor-pointer transition-colors"
      onClick={onClick}
      aria-label="Next slide"
    >
      <FiChevronRight size={20} />
    </button>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      type="button"
      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full cursor-pointer transition-colors"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <FiChevronLeft size={20} />
    </button>
  );
}

function ProjectGallery() {
  const sliderRef = useRef(null);

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
      title: 'CalWORKs Analysis',
      image: calworks1,
      index: 0,
      tech: 'Python, Data Viz'
    },
    { 
      title: 'MarketBump.io',
      image: mvp1_image1,
      index: 1,
      tech: 'Full-stack App'
    },
    { 
      title: 'Landing Page',
      image: landing_image1,
      index: 2,
      tech: 'React, Vite, Tailwind'
    },
    { 
      title: 'MarketBump MVP 2',
      image: mvp2_image1, 
      index: 3,
      tech: 'OCR, BERT Model'
    },
    { 
      title: 'Player Detection',
      image: model1,
      index: 4,
      tech: 'YOLO, PyTorch'
    },
    { 
      title: 'Apicus.ai',
      image: apicus1,
      index: 5,
      tech: 'FastAPI, Vector Search'
    },
    { 
      title: 'SIE Wellness',
      image: sie1,
      index: 6,
      tech: 'Next.js, React, AI Chat'
    },
    { 
      title: 'Childhood Games',
      image: castleidle,
      index: 7,
      tech: 'HTML5, Stencyl'
    }
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="relative px-4 md:px-6">
      <Slider ref={sliderRef} {...settings} className="project-gallery-slider">
        {projectPreviews.map((project, idx) => (
          <div key={idx} className="px-2">
            <motion.div 
              whileHover={{ 
                y: -5,
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx + 0.5 }}
              className="cursor-pointer relative group rounded-lg shadow-lg h-full"
              onClick={() => scrollToProjects(project.index)}
            >
              <div className="overflow-hidden rounded-lg aspect-video bg-gray-900">
                <img 
                  src={project.image} 
                  alt={project.title}
                  width="640"
                  height="360"
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
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProjectGallery; 