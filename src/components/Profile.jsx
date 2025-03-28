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
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en'); // Default to English
  
  // Determine the preferred language (default to English)
  function getBrowserLanguage() {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return 'en'; // Default for server-side rendering
    }
    
    // Check if localStorage has a saved preference
    try {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage) return savedLanguage;
    } catch (error) {
      console.warn('Error accessing localStorage:', error);
    }
    
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang && browserLang.startsWith('pt') ? 'pt' : 'en';
  }
  
  // Initialize language from browser settings once component is mounted (client-side only)
  useEffect(() => {
    setLanguage(getBrowserLanguage());
  }, []);
  
  // Store language preference (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('preferredLanguage', language);
      } catch (error) {
        console.warn('Error saving to localStorage:', error);
      }
    }
  }, [language]);
  
  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'pt' : 'en');
  };
  
  // Fetch profile data from JSON file
  useEffect(() => {
    // Try to fetch from public directory first
    fetch('/profile-data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Profile data loaded successfully from public directory');
        setProfileData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading profile data from public directory:', error);
        
        // Fallback: try fetching from src/assets
        import('../assets/profile-data.json')
          .then(module => {
            console.log('Profile data loaded successfully from assets directory');
            setProfileData(module.default);
            setIsLoading(false);
          })
          .catch(assetError => {
            console.error('Error loading profile data from assets:', assetError);
            setError(`Failed to load profile data: ${error.message}`);
            setIsLoading(false);
          });
      });
  }, []);

  // Show loading state if no data yet
  if (!profileData) {
    return <div className="loading" aria-live="polite" role="status">Loading profile data...</div>;
  }
  
  // Check if profile data has multilingual structure
  const isMultilingual = profileData.personal && 
    (profileData.personal.en || profileData.personal.pt);
  
  // Get text content based on current language
  const getText = (field, defaultValue = '') => {
    if (!field) return defaultValue;
    
    if (isMultilingual) {
      return field[language] || field.en || defaultValue;
    }
    
    return field;
  };
  
  // Get UI text
  const getUI = (key, defaultValue) => {
    if (profileData.ui && profileData.ui[language] && profileData.ui[language][key]) {
      return profileData.ui[language][key];
    }
    return defaultValue;
  };
  
  // Check if skills are in the new format (objects instead of strings)
  const hasNewSkillsFormat = profileData.skills && 
    profileData.skills.length > 0 && 
    typeof profileData.skills[0] === 'object';
    
  // Skill descriptions - highlighting Low-code Architecture and Cloud Architecture
  const skillDescriptions = {
    "Low-code Development": "Creating robust applications with minimal traditional coding, using visual interfaces and pre-built components to accelerate development while maintaining flexibility and scalability.",
    "Cloud Computing": "Designing and implementing solutions leveraging distributed computing resources provided over the internet, including Infrastructure (IaaS), Platform (PaaS), and Software as a Service (SaaS).",
    "Microsoft Azure": "Expertise in Microsoft's cloud computing platform for building, deploying, and managing applications and services through Microsoft-managed data centers.",
    "Microsoft Power Platform": "Creating business solutions using Power Apps, Power Automate, Power BI, and Power Virtual Agents to analyze data, build solutions, automate processes, and create virtual agents.",
    "Power BI": "Data visualization and business intelligence tool that transforms data from various sources into interactive dashboards and business analytics reports.",
    "Power Automate": "Cloud-based service that allows users to create automated workflows between apps and services to synchronize files, get notifications, collect data and more.",
    "Data Science": "Extracting knowledge and insights from structured and unstructured data using scientific methods, algorithms, processes, and systems.",
    "Azure AI Services": "Suite of AI services and APIs to help developers create intelligent applications without direct ML expertise, including vision, speech, language, and decision services.",
    "Cloud Architecture": "Designing high-level cloud computing systems that ensure optimal performance, reliability, security, and cost-efficiency while leveraging cloud-native capabilities.",
    "Dynamics 365": "Microsoft's line of enterprise resource planning and customer relationship management applications.",
    "Databricks": "Unified analytics platform for large-scale data processing and machine learning, optimized for Spark workloads.",
    "RAG": "Retrieval-Augmented Generation: An AI framework that enhances large language models by retrieving relevant information from external knowledge sources to generate more accurate and contextual responses.",
    "LLM Integration": "Integrating Large Language Models into applications and systems, enabling them to process, understand, and generate human-like text for various use cases."
  };
  
  return (
    <div className="profile-container">
      {/* Language Selector */}
      <div className="language-selector">
        <button 
          className={`language-btn ${language === 'en' ? 'active' : ''}`} 
          onClick={() => setLanguage('en')}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button 
          className={`language-btn ${language === 'pt' ? 'active' : ''}`} 
          onClick={() => setLanguage('pt')}
          aria-label="Mudar para Português"
        >
          PT
        </button>
      </div>
      
      {/* Header Section - Personal Info */}
      <header className="profile-header">
        <div className="profile-intro">
          <div className="profile-image">
            <img src="/images/profile.png" alt="Ricardo Almeida" className="rounded-profile-image" />
          </div>
          <h1 className="profile-name">
            {isMultilingual 
              ? profileData.personal[language]?.name || profileData.personal.en.name
              : profileData.personal.name
            }
          </h1>
          <h2 className="profile-title highlight">
            {isMultilingual 
              ? profileData.personal[language]?.title || profileData.personal.en.title
              : profileData.personal.title
            }
          </h2>
          <p className="profile-location">
            <span aria-label="Location" role="img" aria-hidden="true">📍</span>
            {isMultilingual 
              ? profileData.personal[language]?.location || profileData.personal.en.location
              : profileData.personal.location
            }
          </p>
          <div className="profile-links">
            <a 
              href={`https://${profileData.personal.profileUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-link"
              aria-label={isMultilingual 
                ? `LinkedIn profile of ${profileData.personal[language]?.name || profileData.personal.en.name}`
                : `LinkedIn profile of ${profileData.personal.name}`
              }
            >
              LinkedIn
            </a>
          </div>
        </div>
      </header>
      
      {/* About Section */}
      <section className="profile-section" aria-labelledby="about-heading">
        <h2 className="section-title" id="about-heading">{getUI('about', 'About')}</h2>
        <p className="profile-about">{getText(profileData.about)}</p>
      </section>
      
      {/* Skills Section */}
      {profileData.skills && profileData.skills.length > 0 && (
        <section className="profile-section" aria-labelledby="skills-heading">
          <h2 className="section-title" id="skills-heading">{getUI('skills', 'Skills')}</h2>
          
          {hasNewSkillsFormat ? (
            <div className="skills-list" role="list">
              {profileData.skills.map((skill, index) => {
                const skillData = isMultilingual ? skill[language] || skill.en : skill;
                const description = skillDescriptions[skillData.name] || `Expertise in ${skillData.name}`;
                const isHighlighted = skillData.name === "Low-code Development" || 
                                      skillData.name === "Cloud Architecture" ||
                                      skillData.name === "Cloud Computing" ||
                                      skillData.name === "RAG" ||
                                      skillData.name === "LLM Integration";
                
                return (
                  <span 
                    key={index} 
                    className={`skill-item skill-level-${skillData.level?.toLowerCase()}`} 
                    role="listitem"
                    data-category={skillData.category}
                    data-description={description}
                    data-highlight={isHighlighted ? "true" : "false"}
                    title={`${skillData.name} - ${skillData.level}`}
                  >
                    {skillData.name}
                    {skillData.credentialID && skillData.credentialURL && (
                      <a 
                        href={skillData.credentialURL} 
                        className="skill-credential-link" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={`Credential for ${skillData.name}`}
                      >
                        <span aria-hidden="true">🔗</span>
                      </a>
                    )}
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="skills-list" role="list">
              {profileData.skills.map((skill, index) => {
                const description = skillDescriptions[skill] || `Expertise in ${skill}`;
                const isHighlighted = skill === "Low-code Development" || 
                                      skill === "Cloud Computing" ||
                                      skill === "Cloud Architecture" ||
                                      skill === "RAG" ||
                                      skill === "LLM Integration";
                
                return (
                  <span 
                    key={index} 
                    className="skill-item" 
                    role="listitem"
                    data-description={description}
                    data-highlight={isHighlighted ? "true" : "false"}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          )}
        </section>
      )}
      
      {/* Experience Section */}
      {profileData.experience && profileData.experience.length > 0 && (
        <section className="profile-section" aria-labelledby="experience-heading">
          <h2 className="section-title" id="experience-heading">{getUI('experience', 'Experience')}</h2>
          <div className="timeline">
            {profileData.experience.map((exp, index) => {
              const experience = isMultilingual ? exp[language] || exp.en : exp;
              
              return (
                <article key={index} className="timeline-item">
                  <div className="timeline-marker" aria-hidden="true"></div>
                  <div className="timeline-content">
                    <h3 className="item-title">{experience.title}</h3>
                    <h4 className="item-subtitle highlight">{experience.company}</h4>
                    <div className="item-metadata">
                      {experience.duration && (
                        <span className="item-duration">
                          <span aria-label="Duration" role="img" aria-hidden="true">🗓️</span> {experience.duration}
                        </span>
                      )}
                      {experience.duration && experience.location && (
                        <span className="item-separator" aria-hidden="true">•</span>
                      )}
                      {experience.location && (
                        <span className="item-location">
                          <span aria-label="Location" role="img" aria-hidden="true">📍</span> {experience.location}
                        </span>
                      )}
                    </div>
                    {experience.description && <p className="item-description">{experience.description}</p>}
                    {experience.skills && (
                      <div className="item-skills">
                        <span className="skills-label">{getUI('skills', 'Skills')}:</span> {experience.skills}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
      
      {/* Education Section */}
      {profileData.education && profileData.education.length > 0 && (
        <section className="profile-section" aria-labelledby="education-heading">
          <h2 className="section-title" id="education-heading">{getUI('education', 'Education')}</h2>
          <div className="timeline">
            {profileData.education.map((edu, index) => {
              const education = isMultilingual ? edu[language] || edu.en : edu;
              
              return (
                <article key={index} className="timeline-item">
                  <div className="timeline-marker" aria-hidden="true"></div>
                  <div className="timeline-content">
                    <h3 className="item-title">{education.school}</h3>
                    <h4 className="item-subtitle highlight">{education.degree}</h4>
                    {education.duration && (
                      <div className="item-metadata">
                        <span className="item-duration">
                          <span aria-label="Duration" role="img" aria-hidden="true">🗓️</span> {education.duration}
                        </span>
                      </div>
                    )}
                    {education.grade && (
                      <p className="item-detail">
                        {getUI('grade', 'Grade')}: {education.grade}
                      </p>
                    )}
                    {education.thesis && (
                      <p className="item-detail">
                        {getUI('thesis', 'Thesis')}: {education.thesis}
                      </p>
                    )}
                    {education.skills && (
                      <div className="item-skills">
                        <span className="skills-label">{getUI('skills', 'Skills')}:</span> {education.skills}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
      
      {/* Certifications Section */}
      {profileData.certifications && profileData.certifications.length > 0 && (
        <section className="profile-section" aria-labelledby="certifications-heading">
          <h2 className="section-title" id="certifications-heading">{getUI('certifications', 'Certifications')}</h2>
          <div className="timeline">
            {profileData.certifications.map((cert, index) => {
              const certification = isMultilingual ? cert[language] || cert.en : cert;
              
              return (
                <article key={index} className="timeline-item">
                  <div className="timeline-marker" aria-hidden="true"></div>
                  <div className="timeline-content">
                    <h3 className="item-title">{certification.title}</h3>
                    <h4 className="item-subtitle highlight">{certification.issuer}</h4>
                    {(certification.issued || certification.expires) && (
                      <div className="item-metadata">
                        {certification.issued && (
                          <span className="item-duration">
                            <span aria-label="Issued" role="img" aria-hidden="true">🗓️</span> {getUI('issued', 'Issued')}: {certification.issued}
                          </span>
                        )}
                        {certification.issued && certification.expires && (
                          <span className="item-separator" aria-hidden="true">•</span>
                        )}
                        {certification.expires && (
                          <span className="item-expires">
                            <span aria-label="Expires" role="img" aria-hidden="true">⏳</span> {getUI('expires', 'Expires')}: {certification.expires}
                          </span>
                        )}
                      </div>
                    )}
                    {certification.credentialID && (
                      <p className="item-detail">
                        {getUI('credential', 'Credential ID')}: {certification.credentialURL ? (
                          <a 
                            href={certification.credentialURL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="credential-link highlight"
                          >
                            {certification.credentialID}
                          </a>
                        ) : (
                          certification.credentialID
                        )}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
      
      {/* Languages Section */}
      {profileData.languages && profileData.languages.length > 0 && (
        <section className="profile-section" aria-labelledby="languages-heading">
          <h2 className="section-title" id="languages-heading">{getUI('languages', 'Languages')}</h2>
          <ul className="languages-list">
            {profileData.languages.map((lang, index) => {
              const languageData = isMultilingual ? lang[language] || lang.en : lang;
              
              return (
                <li key={index} className="language-item">
                  <span className="language-name">{languageData.language}</span>
                  <span className="language-proficiency">{languageData.proficiency}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      
      {/* Show error if any */}
      {error && (
        <div className="error-message" role="alert">
          <p>Note: {error}</p>
        </div>
      )}
      
      {/* Loading indicator that's visually hidden when content is loaded */}
      {isLoading && (
        <div className="loading" aria-live="polite" role="status">
          Loading profile data...
        </div>
      )}
    </div>
  );
}

export default Profile; 