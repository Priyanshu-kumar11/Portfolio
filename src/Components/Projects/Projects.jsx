import React, { useState } from 'react';
import './Projects.css';
import img1 from '../../assets/agronexus.png';
import img2 from '../../assets/fina.jpg';
import img3 from '../../assets/yummmy.jpg';

const projects = [
  {
    name: 'Finance Track Website',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'React JS', 'Firebase'],
    description: [
      'Easily add and track your daily, weekly, or monthly income and expenses.',
      'Built a comprehensive expense management application using React.js for a modern and interactive user experience.',
      'Enabled secure user registration, login, and account management using Firebase Authentication.',
      'Implemented interactive charts and graphs to visually represent financial data.',
    ],
    image: img2,
  },
  {
    name: 'Yummy Food',
    tech: ['HTML5', 'TailwindCSS', 'JavaScript', 'React JS', 'Redux'],
    description: [
      'Displays a wide variety of food items with prices.',
      'Ensured mobile-first design with cross-browser compatibility by leveraging TailwindCSS for custom styling and layout.',
    ],
    image: img3,
  },
  {
    name: 'AgroNexus',
    tech: ['HTML5', 'TailwindCSS', 'JavaScript', 'React JS', 'NodeJS', 'MongoDB'],
    description: [
      'Developed a smart agricultural system for monitoring soil parameters (moisture, temperature, and pH) in real-time, aiding farmers in decision-making.',
      'Integrated RandomForest Regressor for crop suitability prediction based on real-time environmental data.',
    ],
    image: img1,
  },
];

const Projects = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleCardClick = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index); // Toggle flip
  };

  return (
    <div className="projects-container">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`project-card ${flippedIndex === index ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="front">
              <h3 className="project-name">{project.name}</h3>
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-item">
                    <i className={`fa fa-${tech.toLowerCase()} tech-icon`} /> {tech}
                  </span>
                ))}
              </div>
              <ul className="project-description">
                {project.description.map((desc, i) => (
                  <li key={i}>
                    <span className="checkmark">✓</span> {desc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="back">
              <img src={project.image} alt={project.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
