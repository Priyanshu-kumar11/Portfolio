import React from 'react';
import './Hero.css'; 

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Hi, I'm <span className="highlight-name">Priyanshu Kumar</span></h1>
        <p>Front-End Developer | UI/UX Enthusiast</p>
        <a href="#projects" className="cta-btn">View My Work</a>
        <a href="#contact" className="cta-btn secondary">Contact Me</a>
      </div>
    </section>
  );
};

export default Hero;
