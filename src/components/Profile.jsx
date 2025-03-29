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
 * @returns {JSX.Element} The Profile component
 */
function Profile({ profileData, currentLanguage = 'en' }) {
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
  
  // <<< START: Moved useEffect Hook for reCAPTCHA >>>
  useEffect(() => {
    const contactBtn = document.getElementById('profile-contact-btn');
    const contactEmail = document.getElementById('profile-contact-email');
    const recaptchaTerms = document.querySelector('.contact-section .recaptcha-terms');
    
    if (contactBtn && contactEmail && recaptchaTerms) {
      contactBtn.addEventListener('click', () => {
        // Show loading state
        contactBtn.textContent = language === 'en' ? 'Verifying...' : 'Verificando...';
        contactBtn.disabled = true;
        
        // Execute reCAPTCHA
        if (typeof window.grecaptcha !== 'undefined' && window.grecaptcha) {
          window.grecaptcha.ready(function() {
            // Use the same site key as defined in MainLayout
            // TODO: Consider moving site key to environment variables
            const recaptchaSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Default test key
            
            window.grecaptcha.execute(recaptchaSiteKey, {action: 'showEmail'})
              .then(function(token) {
                // On successful verification, show the email
                contactEmail.classList.remove('hidden');
                contactBtn.classList.add('hidden');
                recaptchaTerms.classList.remove('hidden');
                
                // Make email selectable/copyable
                const range = document.createRange();
                const selection = window.getSelection();
                if (selection) {
                  range.selectNodeContents(contactEmail);
                  selection.removeAllRanges();
                  selection.addRange(range);
                }
              })
              .catch(function(error) {
                console.error('reCAPTCHA error:', error);
                contactBtn.textContent = language === 'en' ? 'Get in Touch' : 'Entre em Contato';
                contactBtn.disabled = false;
                alert('Verification failed. Please try again.');
              });
          });
        } else {
          console.error('reCAPTCHA not loaded');
          contactBtn.textContent = language === 'en' ? 'Get in Touch' : 'Entre em Contato';
          contactBtn.disabled = false;
        }
      });
    }
  }, [language]); // Re-run if language changes
  // <<< END: Moved useEffect Hook for reCAPTCHA >>>

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
          {/* Split text into paragraphs for better readability */}
          {getText(profileData.about).split('\n\n').map((paragraph, index) => (
            <p key={index} className="profile-about">{paragraph}</p>
          ))}
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
                
                // Use the highlight flag from the data instead of hardcoding
                const isHighlighted = safeGet(skill, `${language}.highlight`, false) || 
                                     safeGet(skill, 'en.highlight', false);
                
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
              })}
            </div>
          ) : (
            <div className="skills-list" role="list">
              {profileData.skills.map((skill, index) => (
                <span key={index} className="skill-item" role="listitem">{skill}</span>
              ))}
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
            {profileData.certifications.map((certification, index) => {
              const certTitle = isMultilingual ? 
                safeGet(certification, `${language}.title`) || safeGet(certification, 'en.title', 'Certification') : 
                safeGet(certification, 'title', 'Certification');
                
              const certIssuer = isMultilingual ? 
                safeGet(certification, `${language}.issuer`) || safeGet(certification, 'en.issuer', '') : 
                safeGet(certification, 'issuer', '');
                
              const credentialID = isMultilingual ? 
                safeGet(certification, `${language}.credentialID`) || safeGet(certification, 'en.credentialID', '') : 
                safeGet(certification, 'credentialID', '');
                
              const credentialURL = isMultilingual ? 
                safeGet(certification, `${language}.credentialURL`) || safeGet(certification, 'en.credentialURL', '') : 
                safeGet(certification, 'credentialURL', '');
                
              const issued = isMultilingual ? 
                safeGet(certification, `${language}.issued`) || safeGet(certification, 'en.issued', '') : 
                safeGet(certification, 'issued', '');
                
              const expires = isMultilingual ? 
                safeGet(certification, `${language}.expires`) || safeGet(certification, 'en.expires', '') : 
                safeGet(certification, 'expires', '');
                
              return (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3 className="item-title">{certTitle}</h3>
                    {certIssuer && <p className="item-subtitle">{certIssuer}</p>}
                    
                    <div className="item-metadata">
                      {issued && (
                        <span className="item-detail">
                          <span className="item-label">{getUI('issued', 'Issued')}:</span> {issued}
                        </span>
                      )}
                      
                      {expires && (
                        <>
                          <span className="item-separator">•</span>
                          <span className="item-detail">
                            <span className="item-label">{getUI('expires', 'Expires')}:</span> {expires}
                          </span>
                        </>
                      )}
                    </div>
                    
                    {credentialID && (
                      <div className="item-metadata">
                        <span className="item-detail">
                          <span className="item-label">{getUI('credentialId', 'Credential ID')}:</span> {credentialID}
                        </span>
                      </div>
                    )}
                    
                    {credentialURL && (
                      <div className="credential-link">
                        <a 
                          href={credentialURL} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`Verify ${certTitle} credential`}
                        >
                          {getUI('verifyCertificate', 'Verify Certificate')}
                        </a>
                      </div>
                    )}
                  </div>
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
