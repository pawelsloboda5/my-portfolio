// src/components/Projects.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';
import mvp1_image1 from '../assets/mvp1-image1.png';
import mvp1_image2 from '../assets/mvp1-image2.png';
import mvp1_image3 from '../assets/mvp1-image3.png';
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
import castleidle from '../assets/castleidle.png';
import idlewalk from '../assets/idlewalk.png';
import warriors1 from '../assets/warriorsbattle1.png';
import warriors2 from '../assets/warriorsbattle2.png';
import calworks1 from '../assets/calWorks-1.png';
import calworks2 from '../assets/calWorks-2.png';
import calworks3 from '../assets/calWorks-3.png';

function Projects() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [autoHoverIndex, setAutoHoverIndex] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: '-100px' }); // trigger a bit before fully in view

  // Listen for custom event from ProjectGallery
  useEffect(() => {
    const handleOpenProject = (event) => {
      const { index } = event.detail;
      setSelectedProjectIndex(index);
    };

    document.addEventListener('openProject', handleOpenProject);
    
    return () => {
      document.removeEventListener('openProject', handleOpenProject);
    };
  }, []);

  // Trigger sequential auto-hover when section enters the viewport
  useEffect(() => {
    if (!isInView) {
      // Reset auto-hover when not in view
      setAutoHoverIndex(null);
      return;
    }

    let current = 0;
    setAutoHoverIndex(0);

    const interval = setInterval(() => {
      current += 1;
      if (current >= projects.length) {
        // Stop after highlighting all cards once
        clearInterval(interval);
        setAutoHoverIndex(null);
      } else {
        setAutoHoverIndex(current);
      }
    }, 4000); // 4 seconds per card (between 3-5 sec requested)

    return () => clearInterval(interval);
  }, [isInView]);

  const projects = [
    {
      title: 'San Francisco CalWORKs Housing Affordability & Eligibility Analysis',
      description: `Led a data-driven policy study assessing CalWORKs eligibility against regional housing affordability across California, with a deep dive into San Francisco — insights presented to 10 program stakeholders.

- Ingested 2022 ACS PUMS micro-data (167k households / 391k persons) via Census API, then pipelined ETL using Pandas, Polars, and NumPy, completing full state-wide crunch in 30s on an M2 Pro dev machine.
- Geo-joined households to PUMA boundaries using GeoPandas and Shapely, enabling side-by-side metrics for San Francisco's 4,479 sampled households.
- Engineered 45+ features (income per adult, housing-cost-burden ratio, MBSAC threshold overages, SNAP participation, work status) and validated definitions against CalWORKs regulatory criteria.
- Built a modular analytics package (PEP 517 pyproject.toml, unit-tested with PyTest & Coverage.py, CI via GitHub Actions) and published Docker image for reproducible runs.
- Surfaced insights with interactive Plotly dashboards (income funnels, eligibility heatmaps, household treemaps) and exported static Matplotlib/Seaborn figures for reports.
- Key findings: SF eligibility rate 25.2% vs state 27.7%; median monthly income SF $8.3k vs state $5.9k; housing cost burden remains 1.41× higher in SF; visual heatmaps reveal eligibility gaps concentrated in 1-person households.`,
      images: [calworks1, calworks2, calworks3],
      projectUrl: 'https://github.com/pawelsloboda5/calworks-analysis',
      githubUrl: 'https://github.com/pawelsloboda5/calworks-analysis',
    },
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
      projectUrl: 'https://github.com/pawelsloboda5/rust-YOLOv8-PlayerDetection',
      githubUrl: 'https://github.com/pawelsloboda5/rust-YOLOv8-PlayerDetection',
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
      title: 'SIE Wellness: AI-Powered Holistic Health Platform',
      description: `Developed SIE Wellness, a Next.js 15 and React 19 web application featuring AI-driven chat functionalities tailored for prospective patients and healthcare providers. The platform provides separate landing pages and user journeys for general visitors, patients seeking holistic wellness advice, and providers looking to join the network.

- Implemented a sophisticated AI chat interface for patients, leveraging OpenAI (GPT models via @ai-sdk/openai) for personalized wellness recommendations. Patient intake data and chat history are stored locally using Dexie.js (IndexedDB wrapper).
- Engineered a two-step AI response processing system: the primary AI call generates content with markdown links, and a secondary, lightweight regex-based API endpoint (/api/extract-links) efficiently parses these links for display as clickable sources, minimizing LLM calls.
- Built with Next.js App Router, utilizing React Server Components and TypeScript for a modern, type-safe codebase. Styling is achieved with Tailwind CSS v4 and the shadcn/ui component library, enhanced with Lucide icons and Framer Motion for animations.
- Features distinct API routes for AI interactions (/api/chat) and utility functions. The frontend captures user input through forms (validated with Zod) and manages state with React.
- The project structure includes separate pages for different user segments (/patient, /provider) and leverages shared components for UI consistency. Deployed on Vercel.`,
      images: [sie1, sie2],
      projectUrl: 'https://www.sie2.com/patient',
      githubUrl: 'https://github.com/pawelsloboda5/sie-wellness',
    },
    {
      title: 'Early Kongregate Games (2012-2014)',
      description: `A nostalgic collection of HTML5/JavaScript and Stencyl games I built in middle school and published to Kongregate, clocking up tens-of-thousands of plays.

- Castle Idle – incremental empire builder
- Idle Walk – endless runner
- Warrior's Battle – clicker RPG`,
      images: [castleidle, idlewalk, warriors1, warriors2],
      projectUrl: '#',
      githubUrl: '#',
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-16 bg-white dark:bg-gray-900">
      <div className="mx-auto px-4 max-w-screen-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              selected={selectedProjectIndex === index}
              onSelect={setSelectedProjectIndex}
              autoHover={autoHoverIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
