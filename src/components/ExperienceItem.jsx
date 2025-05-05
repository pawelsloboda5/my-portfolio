import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

function ExperienceItem({ exp, index, isActive, toggleOpen, isMobile }) {
  // Determine if the current item should render on the left or right side of the timeline (desktop only)
  const isLeft = index % 2 === 0;

  // Shared card styles
  const cardBaseClass =
    'bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer transition-transform md:transform md:hover:scale-[1.02]';

  // Wrapper classes that position the card left / right of the central timeline for md+ screens
  const wrapperClass = isLeft
    ? 'md:pr-8 md:mr-auto md:text-right'
    : 'md:pl-8 md:ml-auto md:text-left';

  return (
    <div
      className={`relative my-8 md:w-1/2 ${wrapperClass}`}
      onClick={isMobile ? toggleOpen : undefined}
    >
      {/* Timeline Dot for desktop: positioned at the edge towards the central line */}
      <span
        className={`hidden md:block absolute top-4 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-800 ${isLeft ? 'right-[-8px]' : 'left-[-8px]'}`}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className={cardBaseClass}
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          <img
            src={exp.companyLogo}
            alt={`${exp.company} Logo`}
            className="w-12 h-12 object-contain flex-shrink-0"
          />
          <div className="text-left md:text-inherit flex-1">
            <h3 className="text-xl font-bold leading-tight">
              {exp.role}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {exp.company}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {exp.duration}
            </p>
          </div>
          {/* Mobile Arrow */}
          {isMobile && (
            isActive ? <FiChevronUp className="text-xl ml-2" /> : <FiChevronDown className="text-xl ml-2" />
          )}
        </div>

        {/* Collapsible section */}
        <motion.div
          initial={false}
          animate={isMobile && !isActive ? { height: 0, opacity: 0 } : { height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {/* Description bullets */}
          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {exp.description.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>

          {/* Skill Logos */}
          {exp.skills?.length > 0 && (
            <div className="flex flex-wrap mt-4">
              {exp.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 mr-2 mb-2 flex items-center justify-center"
                  title={skill.name}
                >
                  <img
                    src={skill.logo}
                    alt={`${skill.name} Logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ExperienceItem; 