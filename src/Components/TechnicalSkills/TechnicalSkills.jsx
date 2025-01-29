import React from 'react';
import './TechnicalSkills.css';

const TechnicalSkills = () => {
  return (
    <div className="skills-container">
      <h2 className="skills-title">Technical Skills</h2>
      
      <div className="skills-category">
        <h3>Programming Languages</h3>
        <ul>
          <li>C++</li>
          <li>Python</li>
          <li>JavaScript</li>
        </ul>
      </div>

      <div className="skills-category">
        <h3>Frontend Technologies</h3>
        <ul>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Tailwind CSS</li>
          <li>React.js</li>
        </ul>
      </div>

      <div className="skills-category">
        <h3>Database</h3>
        <ul>
          <li>SQL</li>
        </ul>
      </div>

      <div className="skills-category">
        <h3>Visualization Tool</h3>
        <ul>
          <li>Power BI</li>
        </ul>
      </div>

      <div className="skills-category">
        <h3>Version Control System</h3>
        <ul>
          <li>Git</li>
          <li>GitHub</li>
        </ul>
      </div>

      <div className="skills-category">
        <h3>Productivity Tools</h3>
        <ul>
          <li>MS Office (Word, Excel, PowerPoint)</li>
        </ul>
      </div>

      <div className="skills-category">
        <h3>Soft Skills</h3>
        <ul>
          <li>Critical thinking</li>
          <li>Data-driven decision making</li>
          <li>Team Player</li>
          <li>Problem solving</li>
        </ul>
      </div>
    </div>
  );
}

export default TechnicalSkills;
