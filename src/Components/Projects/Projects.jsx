import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';
import img1 from '../../assets/agronexus.png';
import img2 from '../../assets/fina.jpg';
import img3 from '../../assets/yummmy.jpg';

const projects = [
  {
    name: 'Finance Track Website',
    tech: ['HTML', 'CSS', 'JavaScript', 'React JS', 'Firebase'],
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
    tech: ['HTML', 'TailwindCSS', 'JavaScript', 'React JS', 'Redux'],
    description: [
      'Displays a wide variety of food items with prices.',
      'Ensured mobile-first design with cross-browser compatibility by leveraging TailwindCSS for custom styling and layout.',
    ],
    image: img3,
  },
  {
    name: 'AgroNexus',
    tech: ['HTML', 'TailwindCSS', 'JavaScript', 'React JS', 'NodeJS', 'MongoDB'],
    description: [
      'Developed a smart agricultural system for monitoring soil parameters (moisture, temperature, and pH) in real-time, aiding farmers in decision-making.',
      'Integrated RandomForest Regressor for crop suitability prediction based on real-time environmental data.',
    ],
    image: img1,
  },{
    name:'Quick cart',
    tech:['HTML','CSS','Javascript','ReactJS'],
    description:[
    'Developed a responsive e-commerce web application using React.js, CSS, and JavaScript for an enhanced shopping experience.',
    'Implemented dynamic product listings with category filtering, ensuring intuitive navigation and improved user engagement.',
    'Designed a user authentication system with Google OAuth for secure login and logout functionality.'
    ]
  },{
    name:'Blinkit Sales Dashboard',
    tech:['Power BI'],
    description:[
      'Designed an interactive Power BI dashboard to visualize total sales, average sales, item distribution, and outlet performance across multiple dimensions.',
      'Integrated multiple KPIs (Total Sales, Average Sales, Number of Items, and Ratings) for real-time business performance tracking.',
      'Implemented advanced data visualizations such as bar charts, pie charts, and trend lines for insightful sales analysis.'
    ]
  }
];

const Projects = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleCardClick = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index); // Toggle flip
  };

  return (
    <div className="projects-container">
      <h2 className="projects-title gradient-text">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`project-card ${flippedIndex === index ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <div className="front">
              <h3 className="project-name gradient-text">{project.name}</h3>
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
