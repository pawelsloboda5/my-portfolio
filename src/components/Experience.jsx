// src/components/Experience.jsx
import React from 'react';
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

function Experience() {
  const experiences = [
    {
      role: 'Technical Account Manager Intern',
      company: 'Adobe',
      duration: 'May 2024 - August 2024',
      description: (
        <>
          Built a data pipeline using <strong>pandas</strong> to process over 1.5 million data points from 4 dashboards. Developed machine learning models using <strong>PyTorch</strong>, <strong>XGBoost</strong>, and <strong>RandomForest</strong> to predict customer engagement and proactive support signals. Engineered features such as Escalation Ratio, Support Case Impact, and Engagement Intensity. Created visualizations using <strong>Matplotlib</strong> and <strong>Seaborn</strong> to present results to stakeholders.
        </>
      ),
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
      description: (
        <>
          Developed and implemented an <strong>AI framework</strong> to automate and personalize email marketing campaigns, increasing engagement rates. Utilized tools like <strong>Outreach</strong>, <strong>Salesforce</strong>, <strong>Microsoft Teams</strong>, <strong>Slack</strong>, and <strong>LinkedIn Navigator</strong> for efficient communication and CRM. Conducted outbound calls to C-level executives, VPs, and Directors, effectively communicating value propositions and generating interest in Adobe Enterprise Software. Proficient in B2B sales techniques, including lead generation, prospecting, and client acquisition.
        </>
      ),
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
      description: (
        <>
          Fostered customer satisfaction by establishing strong connections, understanding their needs, and delivering targeted solutions. Collaborated with the Geek Squad Manager to delegate tasks effectively, ensuring client support, diagnostics, repairs, and follow-ups were conducted efficiently and to a high standard. Ensured clear and timely communication of department goals and relevant company information to the team, promoting a well-informed and unified working environment. Addressed and resolved escalated <strong>customer service</strong> issues, upholding the brand's commitment to exceptional care.
        </>
      ),
      skills: [
        { name: 'Customer Service', logo: customerServiceLogo },
        { name: 'Team Management', logo: teamManagementLogo },
        { name: 'Communication', logo: communicationLogo },
      ],
      companyLogo: geekSquadLogo,
    },
    // Add more experiences as needed
  ];

  return (
    <section id="experience" className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col md:flex-row"
            >
              {/* Company Logo */}
              <div className="md:w-1/4 flex items-center justify-center mb-4 md:mb-0">
                <img
                  src={exp.companyLogo}
                  alt={`${exp.company} Logo`}
                  className="w-24 h-24 object-contain"
                />
              </div>
              {/* Content */}
              <div className="md:w-3/4 md:pl-6">
                <h3 className="text-2xl font-bold">
                  {exp.role} at {exp.company}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {exp.duration}
                </p>
                <p className="mt-4">{exp.description}</p>
                {/* Skills Logos */}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
