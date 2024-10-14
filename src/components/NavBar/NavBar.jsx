import React from 'react';
import './NavBar.css'; // Import the CSS for custom styles

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Portfolio</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto"> {/* Align items to the right */}
          <li className="nav-item">
            <a className="nav-link text-white" href="#home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#projects">Projects</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#skills">Skills</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
