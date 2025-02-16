import React from 'react';
import { motion } from 'framer-motion';
import About from '../About/About';
import './Home.css';
import img from '../../assets/lapto.jpeg';
import TechnicalSkills from '../TechnicalSkills/TechnicalSkills';

const Home = () => {
  return (
    <>
      <motion.h2 
        className='title gradient-text'
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        Portfolio
      </motion.h2>

      <motion.div 
        className='hero-image'
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1 }}
      >
        <img src={img} alt="Laptop Workspace" />
      </motion.div>

      <motion.div 
        className="resume-button-container"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <a 
          href="https://drive.google.com/file/d/1GoadW6KxtRhrZYjhWxJzLy4I6NGWzqKP/view?usp=drivesdk" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="resume-button"
        >
          Resume
        </a>
      </motion.div>

      <motion.div 
        className="content"
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1, delay: 0.7 }}
      >
        <About />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1, delay: 1 }}
      >
        <TechnicalSkills />
      </motion.div>
    </>
  );
};

export default Home;
