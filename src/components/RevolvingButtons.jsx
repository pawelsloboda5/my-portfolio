// src/components/RevolvingButtons.jsx
import React from 'react';

const RevolvingButtons = () => {
  const sections = ['Experience', 'Projects', 'Skills', 'About', 'Contact'];

  return (
    <div className="revolving-buttons">
      {sections.map((section, index) => (
        <a
          key={index}
          href={`#${section.toLowerCase()}`}
          className={`button button-${index}`}
        >
          {section}
        </a>
      ))}
    </div>
  );
};

export default RevolvingButtons;