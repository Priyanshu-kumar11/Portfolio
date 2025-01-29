import React from 'react';
import About from '../About/About';
import './Home.css';
import img from '../../assets/lapto.jpeg';
import TechnicalSkills from '../TechnicalSkills/TechnicalSkills';

const Home = () => {
  return (
    <>
      <h2 className='title'>Portfolio</h2>

      {/* Hero Image Section */}
      <div className='hero-image'>
        <img src={img} alt="Laptop Workspace" />
      </div>

      {/* Download Resume Button */}
      <div className="resume-button-container">
        <a href="/resume.pdf" download="resume.pdf" className="resume-button">
          Download Resume
        </a>
      </div>

      {/* About Section */}
      <div className="content">
        <About />
      </div>

      <TechnicalSkills />
    </>
  );
};

export default Home;
