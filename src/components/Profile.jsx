import React, { useState, useEffect } from 'react';
import '../styles/profile.css';

/**
 * Profile Component
 * 
 * Displays the user's profile information in a clean, minimal layout
 * with dark background and light text according to the design requirements.
 * Fetches data from a JSON file for easy updates.
 * 
 * @returns {JSX.Element} The Profile component
 */
function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  
  // Fallback data in case fetch fails
  const fallbackData = {
    personal: {
      name: "Ricardo Almeida",
      title: "Software Developer",
      location: "Portugal",
      profileUrl: "linkedin.com/in/ricardodpalmeida"
    },
    about: "Software developer with experience in web technologies and a passion for creating efficient and user-friendly applications.",
    experience: [
      {
        title: "Software Developer",
        company: "Example Company",
        duration: "2020 - Present",
        location: "Remote",
        description: "Developing web applications using modern technologies.",
        skills: "JavaScript, React, Node.js"
      },
      {
        title: "Junior Developer",
        company: "Previous Company",
        duration: "2018 - 2020",
        location: "Lisbon",
        description: "Worked on frontend development for various clients.",
        skills: "HTML, CSS, JavaScript"
      }
    ],
    education: [
      {
        school: "University of Example",
        degree: "Bachelor's in Computer Science",
        duration: "2014 - 2018",
        grade: "Good Standing",
        thesis: "Web Application Development"
      }
    ]
  };

  // Fetch profile data from JSON file
  useEffect(() => {
    // Start with fallback data immediately
    setProfileData(fallbackData);
    
    // Then try to fetch the JSON file
    fetch('/profile-data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Profile data loaded successfully');
        setProfileData(data);
      })
      .catch(error => {
        console.error('Error loading profile data:', error);
        setError(error.message);
        // Fallback data already loaded, so no need to set it again
      });
  }, []);

  // Show loading state if no data yet
  if (!profileData) {
    return <div className="loading">Loading profile data...</div>;
  }

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <h1>{profileData.personal.name}</h1>
        <h2 className="highlight">{profileData.personal.title}</h2>
        <p>{profileData.personal.location}</p>
        <p>
          <a 
            href={`https://${profileData.personal.profileUrl}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>
      
      {/* About Section */}
      <div className="profile-section">
        <h2>About</h2>
        <p>{profileData.about}</p>
      </div>
      
      {/* Experience Section */}
      <div className="profile-section">
        <h2>Experience</h2>
        {profileData.experience.map((exp, index) => (
          <div key={index} className="profile-item">
            <h3>{exp.title}</h3>
            <h4 className="highlight">{exp.company}</h4>
            <p>{exp.duration} | {exp.location}</p>
            <p>{exp.description}</p>
            <p className="skills">Skills: {exp.skills}</p>
          </div>
        ))}
      </div>
      
      {/* Education Section */}
      <div className="profile-section">
        <h2>Education</h2>
        {profileData.education.map((edu, index) => (
          <div key={index} className="profile-item">
            <h3>{edu.school}</h3>
            <h4 className="highlight">{edu.degree}</h4>
            <p>{edu.duration}</p>
            <p>Grade: {edu.grade}</p>
            <p>Thesis: {edu.thesis}</p>
          </div>
        ))}
      </div>
      
      {/* If there are skills in the data, display them */}
      {profileData.skills && (
        <div className="profile-section">
          <h2>Skills</h2>
          <div className="skills-list">
            {profileData.skills.map((skill, index) => (
              <span key={index} className="skill-item">{skill}</span>
            ))}
          </div>
        </div>
      )}
      
      {/* If there are languages in the data, display them */}
      {profileData.languages && (
        <div className="profile-section">
          <h2>Languages</h2>
          <ul className="languages-list">
            {profileData.languages.map((lang, index) => (
              <li key={index}>
                <span className="language-name">{lang.language}</span>: {lang.proficiency}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Show error if any */}
      {error && (
        <div className="error-message">
          <p>Note: Using fallback data. There was an error loading the profile: {error}</p>
        </div>
      )}
    </div>
  );
}

export default Profile; 