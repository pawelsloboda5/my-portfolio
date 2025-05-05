import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useEffect } from 'react';

// Custom Arrow Components
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      type="button"
      className={`${className} absolute bottom-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer transition-colors`}
      style={{ ...style }}
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
      className={`${className} absolute bottom-4 left-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer transition-colors`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Previous slide"
    >
      <FiChevronLeft size={20} />
    </button>
  );
}

function ProjectCard({ project, index, selected, onSelect, autoHover = false }) {
  const sliderRef = useRef(null);

  const handleToggle = (event) => {
    event.preventDefault();
    onSelect(selected ? null : index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const isHovered = autoHover; // programmatic hover state

  // Refresh slider after expand/collapse animation to recalculate width
  useEffect(() => {
    if (selected && sliderRef.current) {
      const timer = setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.slickGoTo(0);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  return (
    <div className={`w-full sm:w-auto ${selected ? 'sm:col-span-2 md:col-span-3' : ''}`}>
      {/* Card (Default + Hover) */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        className={`relative cursor-pointer rounded-xl overflow-hidden shadow-lg group border-4 border-transparent hover:border-indigo-500 transition-colors`}
        onClick={handleToggle}
      >
        {/* Cover Image */}
        <img
          src={project.images[0]}
          alt={`${project.title} cover`}
          className={`w-full h-56 md:h-64 lg:h-72 object-cover group-hover:brightness-110 transition-all duration-300 ${isHovered ? 'brightness-110' : ''}`}
          loading="lazy"
        />

        {/* Overlay (Visible on hover) */}
        <div className={`absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 ${isHovered ? 'opacity-100' : ''}`}>
          <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">{project.title}</h3>
          <p className="text-xs text-gray-200 line-clamp-2 whitespace-pre-line">
            {project.description.split('\n')[0]}
          </p>
          <div className="flex justify-center mt-2 text-white">
            {selected ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>
      </motion.div>

      {/* Expanded Details */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md max-w-5xl mx-auto"
          >
            {/* Image Slider */}
            <div className="relative project-slider-container">
              <Slider ref={sliderRef} {...settings}>
                {project.images.map((img, idx) => (
                  <div key={idx}>
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full h-64 md:h-80 object-cover rounded-t-lg"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Text */}
            <div className="p-6">
              <p className="text-sm whitespace-pre-line mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-4">
                {project.projectUrl && project.projectUrl !== '#' && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectCard; 