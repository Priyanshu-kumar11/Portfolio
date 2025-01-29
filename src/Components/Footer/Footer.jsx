import React from "react";
import "./Footer.css";
import Nav from "../Nav/Nav";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Design and Develop by <span>Priyanshu Kumar</span>
        </p>
        <div className="footer-links">
          <p>Connect with me:</p>
          <a href="https://www.linkedin.com/in/priyanshu-kumar-0aa259227" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <Nav />
    </footer>
  );
};

export default Footer;
