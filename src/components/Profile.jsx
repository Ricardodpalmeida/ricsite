import React, { useState, useEffect } from 'react';
import '../styles/profile.css';

/**
 * Profile Component
 * 
 * Displays the user's profile information in a clean, minimal layout
 * with dark background and light text according to the design requirements.
 * Receives data from parent Astro component for better optimization.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.profileData - The profile data object from content collection
 * @param {string} props.currentLanguage - The current language (en or pt)
 * @param {boolean} props.hideHeader - Whether to hide the header section (optional)
 * @returns {JSX.Element} The Profile component
 */
function Profile({ profileData, currentLanguage = 'en', hideHeader = false }) {
  const [language, setLanguage] = useState(currentLanguage);
  
  // Initialize touch tooltip functionality
  useEffect(() => {
    // Import the TouchTooltips module dynamically to avoid SSR issues
    import('../components/TouchTooltips.js').then(module => {
      const initTouchTooltips = module.default;
      // Initialize tooltips after the component has rendered
      initTouchTooltips();
    }).catch(err => {
      console.warn('Could not load touch tooltips:', err);
    });
  }, []);
  
  // Update local state when currentLanguage prop changes
  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);
  
  // If no profile data provided
  if (!profileData) {
    return <div className="error-message" role="alert"><p>Profile data could not be loaded.</p></div>;
  }
  
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
  
  // Check if profile data has multilingual structure - now always false since we use separate language files
  const isMultilingual = false;
  
  // Get text content based on current language - simplified since we're in a language-specific file
  const getText = (field, defaultValue = '') => {
    if (!field) return defaultValue;
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
    
  // Get skill descriptions from the data file
  const getSkillDescription = (skillName) => {
    // Look up the description using appropriate object based on language
    if (language === 'pt' && profileData.skillDescriptionsPt && profileData.skillDescriptionsPt[skillName]) {
      return profileData.skillDescriptionsPt[skillName];
    }
    // Check if we have the description in English
    else if (profileData.skillDescriptions && profileData.skillDescriptions[skillName]) {
      return profileData.skillDescriptions[skillName];
    }
    
    // Fallback for skills without descriptions
    return language === 'pt' 
      ? `${skillName} - Experiência e conhecimento profissional` 
      : `${skillName} - Professional expertise and experience`;
  };

  // Calculate duration based on start and end dates
  const calculateDuration = (startDate, endDate, language) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    if (language === 'en') {
      if (years > 0 && months > 0) {
        return `${years} yr ${months} mo`;
      } else if (years > 0) {
        return `${years} yr`;
      } else {
        return `${months} mo`;
      }
    } else {
      // Portuguese translations
      if (years > 0 && months > 0) {
        return `${years} ${years === 1 ? 'ano' : 'anos'} ${months} ${months === 1 ? 'mês' : 'meses'}`;
      } else if (years > 0) {
        return `${years} ${years === 1 ? 'ano' : 'anos'}`;
      } else {
        return `${months} ${months === 1 ? 'mês' : 'meses'}`;
      }
    }
  };

  return (
    <div className="profile-container">
      {/* Header Section - Personal Info */}
      {!hideHeader && (
        <header className="profile-header">
          <div className="profile-intro">
            <div className="profile-image">
              <img src="/images/profile.png" alt="Ricardo Almeida" className="rounded-profile-image" />
            </div>
            <h1 className="profile-name">
              {safeGet(profileData, 'personal.name', 'Ricardo Almeida')}
            </h1>
            <h2 className="profile-title highlight">
              {safeGet(profileData, 'personal.title', 'Manager, Data & AI | Smart Products, Automation and Gen AI')}
            </h2>
            {/* Hide location since it's always Lisbon, Portugal */}
            {/* <p className="profile-location">
              <span aria-label="Location" role="img" aria-hidden="true">📍</span>
              {safeGet(profileData, 'personal.location', 'Lisbon, Portugal')}
            </p> */}
            <div className="profile-links">
              <a 
                href={`https://${safeGet(profileData, 'personal.profileUrl', 'www.linkedin.com/in/ricardodpa')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-social-link"
                aria-label="LinkedIn profile"
              >
                <img src="/icons/linkedin.svg" alt="LinkedIn" className="social-icon" width="16" height="16" />
              </a>
              <a 
                href="https://github.com/Ricardodpalmeida" 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-social-link"
                aria-label="GitHub profile"
              >
                <img src="/icons/github.svg" alt="GitHub" className="social-icon" width="16" height="16" />
              </a>
            </div>
          </div>
        </header>
      )}
      
      {/* About Section - Only show when not hiding header */}
      {!hideHeader && (
        <section className="profile-section no-title" aria-labelledby="about-content">
          <div className="profile-about-container">
            {/* Dynamically render paragraphs from the data */}
            {Array.isArray(getText(profileData.about)) ? (
              // If about is an array, render each item as a paragraph
              getText(profileData.about).map((paragraph, index) => (
                <p key={index} className="profile-about about-paragraph no-hover">{paragraph}</p>
              ))
            ) : (
              // Fallback to original behavior for backward compatibility
              getText(profileData.about)
                .split('\n\n')
                .map((paragraph, index) => (
                  <p key={index} className="profile-about about-paragraph no-hover">{paragraph.trim()}</p>
                ))
            )}
          </div>
        </section>
      )}
      
      {/* Skills and Technologies Section */}
      {((profileData.skills && profileData.skills.length > 0) || 
         (profileData.technologies && profileData.technologies.length > 0)) && (
        <section className="profile-section" aria-labelledby="skills-heading">
          <h2 className="section-title" id="skills-heading">{getUI('skills', 'Skills')} {getUI('and', 'and')} {getUI('technologies', 'Technologies')}</h2>
          
          {/* Skills list */}
          {profileData.skills && profileData.skills.length > 0 && (
            <div className="skills-list" role="list">
              {hasNewSkillsFormat ? (
                profileData.skills.map((skill, index) => {
                  // Safely access properties with fallbacks
                  const skillName = typeof skill === 'object' ? 
                    safeGet(skill, 'name') || 'Skill' : 
                    skill;
                  
                  const skillLevel = typeof skill === 'object' ? 
                    safeGet(skill, 'level') : 
                    '';
                  
                  const skillCategory = typeof skill === 'object' ? 
                    safeGet(skill, 'category') : 
                    '';
                  
                  const description = getSkillDescription(skillName);
                  
                  // Use the highlight flag from the data instead of hardcoding
                  const isHighlighted = safeGet(skill, 'highlight', false);
                  
                  return (
                    <span 
                      key={index} 
                      className={`skill-item ${skillLevel ? `skill-level-${skillLevel.toLowerCase()}` : ''}`} 
                      role="listitem"
                      data-category={skillCategory}
                      data-description={description}
                      data-highlight={isHighlighted}
                    >
                      {skillName}
                    </span>
                  );
                })
              ) : (
                profileData.skills.map((skill, index) => (
                  <span key={index} className="skill-item" role="listitem">{skill}</span>
                ))
              )}
            </div>
          )}
          
          {/* Divider between Skills and Technologies */}
          {profileData.skills && profileData.skills.length > 0 && 
           profileData.technologies && profileData.technologies.length > 0 && (
            <hr className="section-divider" style={{ height: '1px', background: 'rgba(255, 248, 231, 0.1)', margin: '1.5rem 0', border: 'none' }} />
          )}
          
          {/* Technologies list */}
          {profileData.technologies && profileData.technologies.length > 0 && (
            <div className="skills-list" role="list">
              {profileData.technologies.map((tech, index) => {
                const techName = safeGet(tech, 'name', '');
                const techDescription = safeGet(tech, 'description', '');
                
                return (
                  <span 
                    key={index} 
                    className="skill-item" 
                    role="listitem"
                    data-description={techDescription}
                  >
                    {techName}
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
              const title = safeGet(exp, 'title', '');
              const company = safeGet(exp, 'company', '');
              const startDate = safeGet(exp, 'startDate', '');
              const endDate = safeGet(exp, 'endDate', '');
              
              // Get duration value - use calculated value if startDate exists, otherwise use the provided duration
              let duration = safeGet(exp, 'duration', '');
              
              // Calculate duration if start date is provided and override the hardcoded value
              if (startDate) {
                duration = calculateDuration(startDate, endDate, language);
              }
              
              const location = safeGet(exp, 'location', '');
              const description = safeGet(exp, 'description', '');
              
              return (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3 className="item-title">{title}</h3>
                    {company && <p className="item-subtitle">{company}</p>}
                    
                    <div className="item-metadata">
                      {duration && (
                        <span className="item-duration">
                          <span aria-label="Duration" role="img" aria-hidden="true">🗓️</span> {duration}
                        </span>
                      )}
                      
                      {/* Hide location since it's always Lisbon, Portugal */}
                      {/* {location && (
                        <span className="item-location">
                          <span aria-label="Location" role="img" aria-hidden="true">📍</span> {location}
                        </span>
                      )} */}
                    </div>
                    
                    {description && (
                      <div className="item-description">
                        <p>{description}</p>
                      </div>
                    )}
                  </div>
                </div>
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
              const school = safeGet(edu, 'school', '');
              const degree = safeGet(edu, 'degree', '');
              const duration = safeGet(edu, 'duration', '');
              const grade = safeGet(edu, 'grade', '');
              const thesis = safeGet(edu, 'thesis', '');
              const description = safeGet(edu, 'description', '');
              
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
                    {description && (
                      <div className="item-description">
                        <p>{description}</p>
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
          <div className="certificates-grid">
            {profileData.certifications.map((cert, index) => {
              // Safely extract certification data
              const title = safeGet(cert, 'title', '');
              const issuer = safeGet(cert, 'issuer', '');
              const issueDate = safeGet(cert, 'issueDate', '');
              const expiryDate = safeGet(cert, 'expiryDate', '');
              const status = safeGet(cert, 'status', '');
              const credentialId = safeGet(cert, 'credentialId', '');
              const credentialURL = safeGet(cert, 'credentialURL', '');
              const description = safeGet(cert, 'description', '');
              
              return (
                <div key={index} className="certificate-item">
                  <h3 className="certificate-title">{title}</h3>
                  {issuer && <p className="certificate-issuer">{issuer}</p>}
                  
                  <div className="certificate-metadata">
                    {issueDate && (
                      <span className="certificate-issue-date">
                        <strong>{getUI('issued', 'Issued')}:</strong> {issueDate}
                      </span>
                    )}
                    
                    {expiryDate && (
                      <span className="certificate-expiry-date">
                        <strong>{getUI('expires', 'Expires')}:</strong> {expiryDate}
                      </span>
                    )}
                    
                    {status && (
                      <span className="certificate-status">
                        <strong>{getUI('status', 'Status')}:</strong> {status}
                      </span>
                    )}
                  </div>
                  
                  {credentialId && (
                    <p className="certificate-credential-id">
                      <strong>{getUI('credentialId', 'Credential ID')}:</strong> {credentialId}
                    </p>
                  )}
                  
                  {credentialURL && (
                    <a 
                      href={credentialURL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="certificate-verify-link"
                    >
                      {getUI('verifyCertificate', 'Verify Certificate')}
                    </a>
                  )}
                  
                  {description && (
                    <div className="certificate-description">
                      <p>{description}</p>
                    </div>
                  )}
                </div>
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
              const langName = safeGet(lang, 'language', '');
              const proficiency = safeGet(lang, 'proficiency', '');
              
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
