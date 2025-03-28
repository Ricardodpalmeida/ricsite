import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import profileDataImport from '../assets/profile-data.json';

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
    
    // Setup event listener for language changes from the main site header
    const handleLanguageChange = (event) => {
      if (event.detail && event.detail.language) {
        setLanguage(event.detail.language);
      }
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  // Load profile data from imported JSON
  useEffect(() => {
    try {
      // Set the imported data directly (more reliable in production)
      setProfileData(profileDataImport);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading profile data:', error);
      setError('Failed to load profile data. Please try refreshing the page.');
      setIsLoading(false);
    }
  }, []);

  // Show loading state if no data yet
  if (isLoading) {
    return <div className="loading" aria-live="polite" role="status">Loading profile data...</div>;
  }
  
  // Show error if any
  if (error) {
    return <div className="error-message" role="alert"><p>Error: {error}</p></div>;
  }

  // If no profile data loaded
  if (!profileData) {
    return <div className="error-message" role="alert"><p>Profile data could not be loaded.</p></div>;
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
  
  // Safety check function to prevent "Cannot read properties of undefined" errors
  const safeGet = (obj, path, defaultValue = '') => {
    try {
      if (!obj) return defaultValue;
      
      const keys = path.split('.');
      let result = obj;
      
      for (const key of keys) {
        if (result === undefined || result === null) return defaultValue;
        result = result[key];
      }
      
      return result === undefined || result === null ? defaultValue : result;
    } catch (e) {
      console.error('Error in safeGet:', e);
      return defaultValue;
    }
  };
  
  return (
    <div className="profile-container">
      {/* Header Section - Personal Info */}
      <header className="profile-header">
        <div className="profile-intro">
          <div className="profile-image">
            <img src="/images/profile.png" alt="Ricardo Almeida" className="rounded-profile-image" />
          </div>
          <h1 className="profile-name">
            {isMultilingual 
              ? safeGet(profileData, `personal.${language}.name`) || safeGet(profileData, 'personal.en.name', 'Ricardo Almeida')
              : safeGet(profileData, 'personal.name', 'Ricardo Almeida')
            }
          </h1>
          <h2 className="profile-title highlight">
            {isMultilingual 
              ? safeGet(profileData, `personal.${language}.title`) || safeGet(profileData, 'personal.en.title', 'Data & AI Manager | Cloud Solution Architect')
              : safeGet(profileData, 'personal.title', 'Data & AI Manager | Cloud Solution Architect')
            }
          </h2>
          <p className="profile-location">
            <span aria-label="Location" role="img" aria-hidden="true">📍</span>
            {isMultilingual 
              ? safeGet(profileData, `personal.${language}.location`) || safeGet(profileData, 'personal.en.location', 'Lisbon, Portugal')
              : safeGet(profileData, 'personal.location', 'Lisbon, Portugal')
            }
          </p>
          <div className="profile-links">
            <a 
              href={`https://${safeGet(profileData, 'personal.profileUrl', 'www.linkedin.com/in/ricardodpa')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-link"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </header>
      
      {/* About Section */}
      <section className="profile-section about-section" aria-labelledby="about-heading">
        <h2 className="section-title" id="about-heading">{getUI('about', 'About')}</h2>
        <div className="profile-about-container">
          <p className="profile-about">{getText(profileData.about)}</p>
        </div>
      </section>
      
      {/* Skills Section */}
      {profileData.skills && profileData.skills.length > 0 && (
        <section className="profile-section" aria-labelledby="skills-heading">
          <h2 className="section-title" id="skills-heading">{getUI('skills', 'Skills')}</h2>
          
          {hasNewSkillsFormat ? (
            <div className="skills-list" role="list">
              {profileData.skills.map((skill, index) => {
                // Safely access properties with fallbacks
                const skillName = typeof skill === 'object' ? 
                  safeGet(skill, `${language}.name`) || safeGet(skill, 'en.name') || 'Skill' : 
                  skill;
                
                const skillLevel = typeof skill === 'object' ? 
                  safeGet(skill, `${language}.level`) || safeGet(skill, 'en.level') : 
                  '';
                
                const skillCategory = typeof skill === 'object' ? 
                  safeGet(skill, `${language}.category`) || safeGet(skill, 'en.category') : 
                  '';
                
                const description = skillDescriptions[skillName] || `Expertise in ${skillName}`;
                
                const isHighlighted = skillName === "Low-code Development" || 
                                      skillName === "Cloud Architecture" ||
                                      skillName === "Cloud Computing" ||
                                      skillName === "RAG" ||
                                      skillName === "LLM Integration";
                
                return (
                  <span 
                    key={index} 
                    className={`skill-item ${skillLevel ? `skill-level-${skillLevel.toLowerCase()}` : ''}`} 
                    role="listitem"
                    data-category={skillCategory}
                    data-description={description}
                    data-highlight={isHighlighted ? "true" : "false"}
                    title={skillLevel ? `${skillName} - ${skillLevel}` : skillName}
                  >
                    {skillName}
                    {typeof skill === 'object' && skill.credentialID && skill.credentialURL && (
                      <a 
                        href={skill.credentialURL} 
                        className="skill-credential-link" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={`Credential for ${skillName}`}
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
                const skillName = typeof skill === 'string' ? skill : 'Skill';
                const description = skillDescriptions[skillName] || `Expertise in ${skillName}`;
                const isHighlighted = skillName === "Low-code Development" || 
                                      skillName === "Cloud Computing" ||
                                      skillName === "Cloud Architecture" ||
                                      skillName === "RAG" ||
                                      skillName === "LLM Integration";
                
                return (
                  <span 
                    key={index} 
                    className="skill-item" 
                    role="listitem"
                    data-description={description}
                    data-highlight={isHighlighted ? "true" : "false"}
                  >
                    {skillName}
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
              // Safely extract experience data
              const title = isMultilingual ? 
                safeGet(exp, `${language}.title`) || safeGet(exp, 'en.title', '') :
                safeGet(exp, 'title', '');
                
              const company = isMultilingual ?
                safeGet(exp, `${language}.company`) || safeGet(exp, 'en.company', '') :
                safeGet(exp, 'company', '');
                
              const duration = isMultilingual ?
                safeGet(exp, `${language}.duration`) || safeGet(exp, 'en.duration', '') :
                safeGet(exp, 'duration', '');
                
              const location = isMultilingual ?
                safeGet(exp, `${language}.location`) || safeGet(exp, 'en.location', '') :
                safeGet(exp, 'location', '');
                
              const description = isMultilingual ?
                safeGet(exp, `${language}.description`) || safeGet(exp, 'en.description', '') :
                safeGet(exp, 'description', '');
                
              const skills = isMultilingual ?
                safeGet(exp, `${language}.skills`) || safeGet(exp, 'en.skills', '') :
                safeGet(exp, 'skills', '');
              
              return (
                <article key={index} className="timeline-item">
                  <div className="timeline-marker" aria-hidden="true"></div>
                  <div className="timeline-content">
                    <h3 className="item-title">{title}</h3>
                    <h4 className="item-subtitle highlight">{company}</h4>
                    <div className="item-metadata">
                      {duration && (
                        <span className="item-duration">
                          <span aria-label="Duration" role="img" aria-hidden="true">🗓️</span> {duration}
                        </span>
                      )}
                      {duration && location && (
                        <span className="item-separator" aria-hidden="true">•</span>
                      )}
                      {location && (
                        <span className="item-location">
                          <span aria-label="Location" role="img" aria-hidden="true">📍</span> {location}
                        </span>
                      )}
                    </div>
                    {description && <p className="item-description">{description}</p>}
                    {skills && (
                      <div className="item-skills">
                        <span className="skills-label">{getUI('skills', 'Skills')}:</span> {skills}
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
              // Safely extract education data
              const school = isMultilingual ?
                safeGet(edu, `${language}.school`) || safeGet(edu, 'en.school', '') :
                safeGet(edu, 'school', '');
              
              const degree = isMultilingual ?
                safeGet(edu, `${language}.degree`) || safeGet(edu, 'en.degree', '') :
                safeGet(edu, 'degree', '');
              
              const duration = isMultilingual ?
                safeGet(edu, `${language}.duration`) || safeGet(edu, 'en.duration', '') :
                safeGet(edu, 'duration', '');
              
              const grade = isMultilingual ?
                safeGet(edu, `${language}.grade`) || safeGet(edu, 'en.grade', '') :
                safeGet(edu, 'grade', '');
              
              const thesis = isMultilingual ?
                safeGet(edu, `${language}.thesis`) || safeGet(edu, 'en.thesis', '') :
                safeGet(edu, 'thesis', '');
              
              const skills = isMultilingual ?
                safeGet(edu, `${language}.skills`) || safeGet(edu, 'en.skills', '') :
                safeGet(edu, 'skills', '');
              
              return (
                <article key={index} className="timeline-item">
                  <div className="timeline-marker" aria-hidden="true"></div>
                  <div className="timeline-content">
                    <h3 className="item-title">{school}</h3>
                    <h4 className="item-subtitle highlight">{degree}</h4>
                    {duration && (
                      <div className="item-metadata">
                        <span className="item-duration">
                          <span aria-label="Duration" role="img" aria-hidden="true">🗓️</span> {duration}
                        </span>
                      </div>
                    )}
                    {grade && (
                      <p className="item-detail">
                        {getUI('grade', 'Grade')}: {grade}
                      </p>
                    )}
                    {thesis && (
                      <p className="item-detail">
                        {getUI('thesis', 'Thesis')}: {thesis}
                      </p>
                    )}
                    {skills && (
                      <div className="item-skills">
                        <span className="skills-label">{getUI('skills', 'Skills')}:</span> {skills}
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
              // Safely extract certification data
              const title = isMultilingual ?
                safeGet(cert, `${language}.title`) || safeGet(cert, 'en.title', '') :
                safeGet(cert, 'title', '');
              
              const issuer = isMultilingual ?
                safeGet(cert, `${language}.issuer`) || safeGet(cert, 'en.issuer', '') :
                safeGet(cert, 'issuer', '');
              
              const issued = isMultilingual ?
                safeGet(cert, `${language}.issued`) || safeGet(cert, 'en.issued', '') :
                safeGet(cert, 'issued', '');
              
              const expires = isMultilingual ?
                safeGet(cert, `${language}.expires`) || safeGet(cert, 'en.expires', '') :
                safeGet(cert, 'expires', '');
              
              const credentialID = isMultilingual ?
                safeGet(cert, `${language}.credentialID`) || safeGet(cert, 'en.credentialID', '') :
                safeGet(cert, 'credentialID', '');
              
              const credentialURL = isMultilingual ?
                safeGet(cert, `${language}.credentialURL`) || safeGet(cert, 'en.credentialURL', '') :
                safeGet(cert, 'credentialURL', '');
              
              return (
                <article key={index} className="timeline-item">
                  <div className="timeline-marker" aria-hidden="true"></div>
                  <div className="timeline-content">
                    <h3 className="item-title">{title}</h3>
                    <h4 className="item-subtitle highlight">{issuer}</h4>
                    {(issued || expires) && (
                      <div className="item-metadata">
                        {issued && (
                          <span className="item-duration">
                            <span aria-label="Issued" role="img" aria-hidden="true">🗓️</span> {getUI('issued', 'Issued')}: {issued}
                          </span>
                        )}
                        {issued && expires && (
                          <span className="item-separator" aria-hidden="true">•</span>
                        )}
                        {expires && (
                          <span className="item-expires">
                            <span aria-label="Expires" role="img" aria-hidden="true">⏳</span> {getUI('expires', 'Expires')}: {expires}
                          </span>
                        )}
                      </div>
                    )}
                    {credentialID && (
                      <p className="item-detail">
                        {getUI('credential', 'Credential ID')}: {credentialURL ? (
                          <a 
                            href={credentialURL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="credential-link highlight"
                          >
                            {credentialID}
                          </a>
                        ) : (
                          credentialID
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
              // Safely extract language data
              const langName = isMultilingual ?
                safeGet(lang, `${language}.language`) || safeGet(lang, 'en.language', '') :
                safeGet(lang, 'language', '');
              
              const proficiency = isMultilingual ?
                safeGet(lang, `${language}.proficiency`) || safeGet(lang, 'en.proficiency', '') :
                safeGet(lang, 'proficiency', '');
              
              return (
                <li key={index} className="language-item">
                  <span className="language-name">{langName}</span>
                  <span className="language-proficiency">{proficiency}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

export default Profile; 