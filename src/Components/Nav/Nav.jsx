import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar ">
      {/* Toggle Button */}
      <button className="toggle-btn gradient-text" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖ Close" : "☰ Menu"}
      </button>

      {/* Navigation Links (Hidden/Visible based on state) */}
      <ul className={`nav-links gradient-text ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" activeClassName="active">
            Projects
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
