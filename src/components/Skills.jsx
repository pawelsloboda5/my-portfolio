// src/components/Skills.jsx
import React from 'react';
import { FaReact, FaNodeJs, FaPython, FaJava } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiSqlite, SiTypescript, SiNextdotjs, SiMicrosoftazure } from 'react-icons/si';

function Skills() {
  return (
    <section id="skills" className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
        <div className="flex flex-wrap justify-center space-x-4">
          {/* Skill Item */}
          <div className="m-4">
            <FaReact className="text-6xl mx-auto mb-2 text-blue-500" />
            <p>React</p>
          </div>
          <div className="m-4">
            <SiTailwindcss className="text-6xl mx-auto mb-2 text-teal-500" />
            <p>Tailwind CSS</p>
          </div>
          <div className="m-4">
            <FaNodeJs className="text-6xl mx-auto mb-2 text-green-500" />
            <p>Node.js</p>
          </div>
          <div className="m-4">
            <SiMongodb className="text-6xl mx-auto mb-2 text-green-700" />
            <p>MongoDB</p>
          </div>
          <div className="m-4">
            <FaPython className="text-6xl mx-auto mb-2 text-yellow-500" />
            <p>Python</p>
          </div>
          <div className="m-4">
            <FaJava className="text-6xl mx-auto mb-2 text-red-500" />
            <p>Java</p>
          </div>
          {/* New Skill Items */}
          <div className="m-4">
            <SiSqlite className="text-6xl mx-auto mb-2 text-blue-600" />
            <p>SQLite</p>
          </div>
          <div className="m-4">
            <SiTypescript className="text-6xl mx-auto mb-2 text-blue-600" />
            <p>TypeScript</p>
          </div>
          <div className="m-4">
            <SiNextdotjs className="text-6xl mx-auto mb-2 text-black" />
            <p>Next.js</p>
          </div>
          {/* Azure */}
          <div className="m-4">
            <SiMicrosoftazure className="text-6xl mx-auto mb-2 text-blue-500" />
            <p>Azure</p>
          </div>
          {/* Certifications */}
        </div>

        <h3 className="text-2xl font-bold mt-12 mb-4">Certifications</h3>
        <div className="flex flex-wrap justify-center">
          <div className="m-4 p-4 border rounded-lg shadow bg-white dark:bg-gray-800">
            <p className="font-semibold">Azure AI Fundamentals (AI‑900)</p>
          </div>
          <div className="m-4 p-4 border rounded-lg shadow bg-white dark:bg-gray-800">
            <p className="font-semibold">Azure Fundamentals (AZ‑900)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
