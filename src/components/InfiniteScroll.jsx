// src/components/InfiniteScroll.jsx
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../styles/infinite-scroll.css';

function ProfileInfiniteScroll() {
  const [profileData, setProfileData] = useState(null);
  const [displayItems, setDisplayItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    console.log('Fetching profile data...');
    const url = `${window.location.origin}/profile-data.json`;
    console.log('Fetching from URL:', url);
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data loaded successfully');
        setProfileData(data);
        
        // Initialize with personal info and about section
        if (data.personal) {
          setDisplayItems([
            { type: 'header', data: data.personal },
            { type: 'about', data: data.about }
          ]);
        }
      })
      .catch(error => {
        console.error('Error loading profile data:', error);
      });
  }, []);

  const loadMore = () => {
    if (!profileData) return;
    
    const currentLength = displayItems.length;
    
    // Create sections array with all possible sections
    const sections = [
      ...(profileData.experience ? profileData.experience.map(exp => ({ type: 'experience', data: exp })) : []),
      ...(profileData.education ? profileData.education.map(edu => ({ type: 'education', data: edu })) : []),
      ...(profileData.certifications ? profileData.certifications.map(cert => ({ type: 'certification', data: cert })) : []),
      profileData.skills ? { type: 'skills', data: profileData.skills } : null,
      profileData.languages ? { type: 'languages', data: profileData.languages } : null
    ].filter(Boolean); // Remove null items
    
    // Add next batch of items
    const nextItems = sections.slice(currentLength - 2, currentLength - 2 + 3);
    
    if (nextItems.length === 0) {
      setHasMore(false);
      return;
    }
    
    setDisplayItems([...displayItems, ...nextItems]);
  };

  // Render different content based on type
  const renderItem = (item, index) => {
    switch (item.type) {
      case 'header':
        return (
          <div key={index} className="profile-header">
            <h1>{item.data.name}</h1>
            <h2 className="highlight">{item.data.title}</h2>
            <p>{item.data.location}</p>
            <p><a href={`https://${item.data.profileUrl}`} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          </div>
        );
      case 'about':
        return (
          <div key={index} className="profile-about">
            <h2>About</h2>
            <p>{item.data}</p>
          </div>
        );
      case 'experience':
        return (
          <div key={index} className="profile-experience">
            <h3>{item.data.title}</h3>
            <h4 className="highlight">{item.data.company}</h4>
            <p>{item.data.duration} | {item.data.location || ''}</p>
            <p>{item.data.description}</p>
            {item.data.skills && <p className="skills">Skills: {item.data.skills}</p>}
          </div>
        );
      case 'education':
        return (
          <div key={index} className="profile-education">
            <h3>{item.data.school}</h3>
            <h4 className="highlight">{item.data.degree}</h4>
            <p>{item.data.duration}</p>
            {item.data.grade && <p>Grade: {item.data.grade}</p>}
            {item.data.thesis && <p>Thesis: {item.data.thesis}</p>}
            {item.data.skills && <p className="skills">Skills: {item.data.skills}</p>}
          </div>
        );
      case 'certification':
        return (
          <div key={index} className="profile-certification">
            <h3>{item.data.title}</h3>
            <p>Issuer: {item.data.issuer}</p>
            {item.data.issued && <p>Issued: {item.data.issued}</p>}
            {item.data.expires && <p>Expires: {item.data.expires}</p>}
            {item.data.credentialID && <p>Credential ID: {item.data.credentialID}</p>}
          </div>
        );
      case 'skills':
        return (
          <div key={index} className="profile-skills">
            <h2>Skills</h2>
            <ul>
              {item.data.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        );
      case 'languages':
        return (
          <div key={index} className="profile-languages">
            <h2>Languages</h2>
            <ul>
              {item.data.map((lang, i) => (
                <li key={i}>{lang.language}: {lang.proficiency}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };
  
  if (!profileData) {
    return <div className="loading">Loading profile data...</div>;
  }

  return (
    <div className="infinite-scroll-container">
      <InfiniteScroll
        dataLength={displayItems.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading more items...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You've seen all the content!</b>
          </p>
        }
      >
        {displayItems.map((item, index) => renderItem(item, index))}
      </InfiniteScroll>
    </div>
  );
}

export default ProfileInfiniteScroll;