import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Toggle Button */}
      <button className="toggle-btn gradient-text" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖ Close" : "☰ Menu"}
      </button>

      {/* Navigation Links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
            Projects
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
