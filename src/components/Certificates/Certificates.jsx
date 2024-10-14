import React from 'react';
import './Certificates.css'; // Assuming you will style separately

const Certificates = () => {
  const certificateList = [
    {
      title: 'Programming for Everybody (Getting Started with Python)',
      verificationLink: 'https://www.coursera.org/account/accomplishments/verify/F67TVRWGQSQQ',
    },
    {
      title: 'SQL (BASIC)',
      verificationLink: 'https://www.hackerrank.com/certificates/590a54c0a762',
    },
    
  ];

  return (
    <div className="certificates">
      <h2>Certificates</h2>
      <div className="certificate-list">
        {certificateList.map((cert, index) => (
          <div key={index} className="certificate-card">
            <h3>{cert.title}</h3>
           
            <a href={cert.verificationLink} target="_blank" rel="noopener noreferrer" className="certificate-link">
              Verify Certificate
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
