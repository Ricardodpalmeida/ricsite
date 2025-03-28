import React, { useEffect } from 'react';
import '../styles/infinite-scroll.css';

function StaticProfile() {
  // Add useEffect to log when component mounts
  useEffect(() => {
    console.log('StaticProfile component mounted at', new Date().toISOString());
  }, []);

  // Hard-coded profile data
  const profileData = {
    personal: {
      name: "Ricardo Almeida",
      title: "Software Developer",
      location: "Portugal",
      profileUrl: "linkedin.com/in/ricardodpalmeida"
    },
    about: "Software developer with experience in web technologies and a passion for creating efficient and user-friendly applications."
  };

  console.log('StaticProfile rendering');

  return (
    <div className="infinite-scroll-container">
      <div className="profile-header">
        <h1>{profileData.personal.name}</h1>
        <h2 className="highlight">{profileData.personal.title}</h2>
        <p>{profileData.personal.location}</p>
        <p><a href={`https://${profileData.personal.profileUrl}`} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
      </div>
      
      <div className="profile-about">
        <h2>About</h2>
        <p>{profileData.about}</p>
      </div>
      
      <div className="profile-section">
        <h2>Experience</h2>
        <div className="profile-experience">
          <h3>Software Developer</h3>
          <h4 className="highlight">Example Company</h4>
          <p>2020 - Present | Remote</p>
          <p>Developing web applications using modern technologies.</p>
          <p className="skills">Skills: JavaScript, React, Node.js</p>
        </div>
      </div>
      
      <div className="profile-section">
        <h2>Education</h2>
        <div className="profile-education">
          <h3>University of Example</h3>
          <h4 className="highlight">Bachelor's in Computer Science</h4>
          <p>2014 - 2018</p>
          <p>Grade: Good Standing</p>
          <p>Thesis: Web Application Development</p>
        </div>
      </div>
    </div>
  );
}

export default StaticProfile; 