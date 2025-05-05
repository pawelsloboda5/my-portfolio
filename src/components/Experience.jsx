// src/components/Experience.jsx
import React, { useState, useEffect } from 'react';
import pandasLogo from '../assets/pandas.png';
import pytorchLogo from '../assets/pytorch.png';
import xgboostLogo from '../assets/xgboost.png';
import matplotlibLogo from '../assets/matplotlib.png';
import seabornLogo from '../assets/seaborn.png';
import outreachLogo from '../assets/outreach.png';
import salesforceLogo from '../assets/salesforce.png';
import teamsLogo from '../assets/teams.png';
import slackLogo from '../assets/slack.png';
import linkedinLogo from '../assets/linkedin.png';
import customerServiceLogo from '../assets/customer_service.png';
import teamManagementLogo from '../assets/team_management.png';
import communicationLogo from '../assets/communication.png';
import adobeLogo from '../assets/adobe.png';
import geekSquadLogo from '../assets/geek_squad.png';
import nduLogo from '../assets/NDU_CIC_logo.png';
// Add a logo for WEB 3 if available
import web3Logo from '../assets/web3_logo.png';  
import ExperienceItem from './ExperienceItem';

function Experience() {
  // Track screen width to enable auto‑expanded view on desktop
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track which card is open on mobile
  const [openIndex, setOpenIndex] = useState(null);

  const experiences = [
    {
      role: 'Cybersecurity Engineer',
      company: 'National Defense University (DoD)',
      duration: 'Mar 2025 - Present',
      description: [
        'Upgraded 80+ laptops from Windows 7 ➜ Windows 11 for DoD cyber‑warfare simulations, including legacy VM setups (Win 2000, XP, Ubuntu).',
        'Configured Kali Linux, Metasploit, Wireshark and automated .bat launch scripts, boosting lab readiness.',
        'Built an on‑prem Retrieval‑Augmented‑Generation bot integrated with SharePoint for rapid doc lookup.',
      ],
      skills: [
        { name: 'Kali Linux', logo: web3Logo },
        { name: 'Metasploit', logo: web3Logo },
        { name: 'Wireshark', logo: web3Logo },
      ],
      companyLogo: nduLogo,
    },
    {
      role: 'Technical Account Manager Intern',
      company: 'Adobe',
      duration: 'May 2024 - Aug 2024',
      description: [
        'Ingested 1.5M+ data points from 4 dashboards into ML pipeline (Pandas).',
        'Tuned PyTorch / XGBoost models to predict engagement, cutting processing time 40%.',
        'Visualized insights with Matplotlib & Seaborn for exec reporting.',
      ],
      skills: [
        { name: 'Pandas', logo: pandasLogo },
        { name: 'PyTorch', logo: pytorchLogo },
        { name: 'XGBoost', logo: xgboostLogo },
        { name: 'Matplotlib', logo: matplotlibLogo },
        { name: 'Seaborn', logo: seabornLogo },
      ],
      companyLogo: adobeLogo,
    },
    {
      role: 'Remote Tech Sales Intern',
      company: 'Adobe',
      duration: 'May 2023 - August 2023',
      description: [
        'Developed and implemented an AI framework to automate and personalize email marketing campaigns, increasing engagement rates.',
        'Utilized tools like Outreach, Salesforce, Microsoft Teams, Slack, and LinkedIn Navigator for efficient communication and CRM.',
        'Conducted outbound calls to C-level executives, VPs, and Directors, effectively communicating value propositions and generating interest in Adobe Enterprise Software.',
        'Proficient in B2B sales techniques, including lead generation, prospecting, and client acquisition.',
      ],
      skills: [
        { name: 'Outreach', logo: outreachLogo },
        { name: 'Salesforce', logo: salesforceLogo },
        { name: 'Microsoft Teams', logo: teamsLogo },
        { name: 'Slack', logo: slackLogo },
        { name: 'LinkedIn Navigator', logo: linkedinLogo },
      ],
      companyLogo: adobeLogo,
    },
    {
      role: 'Advanced Repair Agent',
      company: 'Geek Squad',
      duration: 'November 2023 - February 2024',
      description: [
        'Fostered customer satisfaction by establishing strong connections, understanding their needs, and delivering targeted solutions.',
        'Collaborated with the Geek Squad Manager to delegate tasks effectively, ensuring client support, diagnostics, repairs, and follow-ups were conducted efficiently and to a high standard.',
        'Ensured clear and timely communication of department goals and relevant company information to the team, promoting a well-informed and unified working environment.',
        'Addressed and resolved escalated customer service issues, upholding the brand\'s commitment to exceptional care.',
      ],
      skills: [
        { name: 'Customer Service', logo: customerServiceLogo },
        { name: 'Team Management', logo: teamManagementLogo },
        { name: 'Communication', logo: communicationLogo },
      ],
      companyLogo: geekSquadLogo,
    },
  ];

  return (
    <section id="experience" className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Experience</h2>
        {/* Timeline Wrapper (central vertical line on desktop) */}
        <div className="relative">
          {/* Vertical line for md+ screens */}
          <span className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-600" />

          {/* Experience items */}
          {experiences.map((exp, index) => {
            const isMobile = windowWidth < 768;
            const isActive = isMobile ? openIndex === index : true;
            const toggleOpen = () => {
              if (!isMobile) return;
              setOpenIndex(openIndex === index ? null : index);
            };

            return (
              <ExperienceItem
                key={index}
                exp={exp}
                index={index}
                isActive={isActive}
                toggleOpen={toggleOpen}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;