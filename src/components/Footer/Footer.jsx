import React from 'react';
import './Footer.css'; // Assuming you have a separate CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <h2>Contact</h2>
      <p>If you have any questions or comments, feel free to reach out!</p>
      <p>Email: <a href="mailto:priyanshuk1601@gmail.com" className="footer-link">priyanshuk1601@gmail.com</a></p>
      <p>LinkedIn: <a href="https://www.linkedin.com/in/priyanshu-kumar-0aa259227/" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
      <p>Phone: <a href="tel:+7646091624" className="footer-link">7646091624</a></p>
    </footer>
  );
}

export default Footer;
