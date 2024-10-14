import React from 'react';
import './Projects.css'; 
import img1 from '../../assets/expense.jpg';
import img2 from '../../assets/food.jpeg';
import img3 from '../../assets/pokemon.jpeg';

const Projects = () => {
  const projectList = [
    {
      title: 'Expense Website',
      description: 'This is a brief description of the Expense Website project.',
      link: '#project1',
      image: img1, // Add the imported image
    },
    {
      title: 'Yummy Food',
      description: 'This is a brief description of the Yummy Food project.',
      link: '#project2',
      image: img2, // Add the imported image
    },
    {
      title: 'Pokemon List',
      description: 'This is a brief description of the Pokemon List project.',
      link: '#project3',
      image: img3, // Add the imported image
    },
  ];

  return (
    <div className="projects">
      <h2>My Projects</h2>
      <div className="project-list">
        {projectList.map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-details"> {/* Wrapping the text content in a div for better layout control */}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} className="project-link">View Project</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
