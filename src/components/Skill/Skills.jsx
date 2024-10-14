import React from 'react';
import './Skills.css'; // Assuming you have a separate CSS file for styling

const Skills = () => {
  const skillsList = [
    'HTML',
    'CSS',
    'JavaScript',
    'ReactJS',
    'Redux',
    'Python',
    'C++',
    'SQL',
  ];

  return (
    <div className="skills">
      <h2>My Skills</h2>
      <div className="skills-grid">
        {skillsList.map((skill, index) => (
          <div key={index} className="skill-item">
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
