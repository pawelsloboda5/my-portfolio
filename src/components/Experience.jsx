// src/components/Experience.jsx
import React from 'react';

function Experience() {
  const experiences = [
    {
      role: 'Technical Account Manager Intern',
      company: 'Adobe',
      duration: 'June 2023 - August 2023',
      description: 'Built machine learning models to predict customer engagement.',
    },
    {
      role: 'Remote Tech Sales Intern',
      company: 'Adobe',
      duration: 'June 2023 - August 2023',
      description: 'Developed and implemented an AI framework to automate email marketing campaigns.',
    },
    // Add more experiences as needed
  ];

  return (
    <section id="experience" className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold">{exp.role} at {exp.company}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{exp.duration}</p>
              <p className="mt-4">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
