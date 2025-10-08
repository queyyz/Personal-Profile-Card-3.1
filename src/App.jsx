import React from 'react';
import ProfileCard from './ProfileCard';

function App() {
  // Sample profile data
  const sampleProfile = {
    name: "queyyz",
    studentId: "6754310070-8",
    major: "Software Engineering",
    year: 2,
    age: 19,
    gpa: 3.25,
    email: "tanapol_tr671@live.rmutl.ac.th",
    hobbies: [
      "music",
      "yuri manga",
      "yuri anime",
      "yuri novel",
      "yuri movie",
    ],
    skills: [
      "JavaScript",
      "React.js",
      "HTML/CSS",
      "Python",
      "Git",
      "Node.js"
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/queyyz" },
      { platform: "Instagram", url: "https://instagram.com/evernight_y" },
    ]
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(45deg, #fde2ed 0%, #f8b5d3 100%)',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          color: '#f78fb3', 
          fontSize: '32px',
          margin: '20px 0'
        }}>
          🎓 Personal Profile Card 🌸
        </h1>
        <p style={{ color: '#c55fa0', fontSize: '16px' }}>
          Lab 3.1 - Getting to know React.js and JSX
        </p>
        <p style={{ color: '#b13f86', fontSize: '14px', marginTop: '5px' }}>
          Challenge: Add theme toggle, social links, animations, badges, and dark mode
        </p>
      </div>
      
      <ProfileCard profile={sampleProfile} />
    </div>
  );
}

export default App;
