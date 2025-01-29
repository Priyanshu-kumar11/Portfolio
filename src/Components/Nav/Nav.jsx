import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <ul>
      <li className="nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
      </li>
    </ul>
  );
};

export default Nav;
