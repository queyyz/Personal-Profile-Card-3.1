import React, { useEffect, useMemo, useState } from 'react';
import './ProfileCard.css';

function ProfileCard({ profile }) {
  // ==============================
  // Utility
  // ==============================
  const getInitials = (name = '') =>
    name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  // ==============================
  // Theme Toggle
  // ==============================
  const [isDark, setIsDark] = useState(() => localStorage.getItem('profile_theme') === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('profile_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const themeLabel = isDark ? 'Light' : 'Dark';
  const themeIcon = isDark ? '☀️' : '🌙';

  // ==============================
  // Interactive States
  // ==============================
  const [viewCount, setViewCount] = useState(0);
  const [favoriteHobbies, setFavoriteHobbies] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  // ==============================
  // Event Handlers
  // ==============================
  const handleCardClick = (e) => {
    const isInteractive = e.target.closest('button, a, input, textarea, select, label, form');
    if (!isInteractive) setViewCount((v) => v + 1);
  };

  const handleHobbyToggle = (hobby) => {
    setFavoriteHobbies((prev) =>
      prev.includes(hobby)
        ? prev.filter((h) => h !== hobby)
        : [...prev, hobby]
    );
  };

  const handleSkillClick = (skill) => {
    alert(`${profile?.name || 'Student'} is skilled in ${skill}!`);
  };

  // ----- Contact form -----
  const openContactForm = () => setShowContactForm(true);
  const closeContactForm = () => {
    setShowContactForm(false);
    setSent(false);
  };
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact((c) => ({ ...c, [name]: value }));
  };
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.message) return;
    setSent(true);
  };

  // ==============================
  // Computed Data
  // ==============================
  const gpaNum = Number(profile?.gpa);
  const gpaLabel = Number.isFinite(gpaNum) ? gpaNum.toFixed(2) : '-';

  const avatarClass = useMemo(
    () => (gpaNum >= 3.5 ? 'profile-avatar pulse' : 'profile-avatar'),
    [gpaNum]
  );

  const socials = profile?.socials || {};
  const socialItems = [
    { key: 'twitter', label: 'Twitter/X', icon: '🐦' },
    { key: 'github', label: 'GitHub', icon: '💻' },
    { key: 'instagram', label: 'Instagram', icon: '📸' },
    { key: 'facebook', label: 'Facebook', icon: '📘' },
  ].filter((s) => socials[s.key]);

  const hobbies = profile?.hobbies || [];
  const skills = profile?.skills || [];
  const baseBadges = profile?.badges || [];

  const computedBadges = [...baseBadges];
  if (gpaNum >= 3.5) computedBadges.push({ text: '🌟 Honors', type: 'gold' });
  if (skills.length >= 5) computedBadges.push({ text: '💪 Multi-skilled', type: 'silver' });

  // ==============================
  // Render
  // ==============================
  return (
    <div className="profile-card" onClick={handleCardClick}>
      {/* Theme Toggle */}
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setIsDark((v) => !v)}
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        <span className="icon">{themeIcon}</span> {themeLabel}
      </button>

      {/* Header */}
      <div className="profile-header">
        <div className={avatarClass}>{getInitials(profile?.name)}</div>
        <h1 className="profile-name">{profile?.name}</h1>
        <div className="student-id">{profile?.studentId}</div>
        <div className="view-count" title="Card views">👁️ {viewCount}</div>

        {socialItems.length > 0 && (
          <div className="social-links">
            {socialItems.map((s) => (
              <a
                key={s.key}
                href={socials[s.key]}
                target="_blank"
                rel="noreferrer"
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Basic Info */}
      <div className="profile-info">
        <div className="info-item"><div className="info-label">Major</div><div className="info-value">{profile?.major}</div></div>
        <div className="info-item"><div className="info-label">Year</div><div className="info-value">{profile?.year}</div></div>
        <div className="info-item"><div className="info-label">Age</div><div className="info-value">{profile?.age}</div></div>
        <div className="info-item"><div className="info-label">GPA</div><div className="info-value">{gpaLabel}{gpaNum >= 3.5 && ' 🌟'}</div></div>
      </div>

      {/* Hobbies */}
      <div className="profile-section">
        <h3>🎯 Hobbies</h3>
        <ul className="hobbies-list">
          {hobbies.map((hobby, index) => {
            const isFav = favoriteHobbies.includes(hobby);
            return (
              <li
                key={index}
                className={`hobby-item ${isFav ? 'favorite' : ''}`}
                onClick={() => handleHobbyToggle(hobby)}
                title={isFav ? 'Click to remove from favorites' : 'Click to mark as favorite'}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') && handleHobbyToggle(hobby)
                }
              >
                {isFav ? '⭐ ' : ''}{hobby}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Skills */}
      <div className="profile-section">
        <h3>💻 Skills</h3>
        <div className="skills">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-tag"
              onClick={() => handleSkillClick(skill)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && handleSkillClick(skill)
              }
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {computedBadges.length > 0 && (
        <div className="profile-section">
          <h3>🏆 Achievements</h3>
          <div className="badges">
            {computedBadges.map((b, i) => (
              <span key={i} className={`badge ${b.type || ''}`}>
                <span className="medal">★</span> {b.text}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact Button */}
      <button type="button" className="contact-button" onClick={openContactForm}>
        📧 Contact {profile?.name}
      </button>

      {/* Contact Modal */}
      {showContactForm && (
        <>
          <div className="modal-backdrop" onClick={closeContactForm} />
          <div className="contact-modal" role="dialog" aria-modal="true">
            <div className="contact-card">
              <button type="button" className="modal-close" onClick={closeContactForm}>✕</button>
              <h3 className="modal-title">Contact {profile?.name}</h3>

              {!sent ? (
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <label>
                    Your Name
                    <input name="name" type="text" value={contact.name} onChange={handleContactChange} required />
                  </label>
                  <label>
                    Your Email
                    <input name="email" type="email" value={contact.email} onChange={handleContactChange} required />
                  </label>
                  <label className="full">
                    Message
                    <textarea name="message" rows="5" value={contact.message} onChange={handleContactChange} required />
                  </label>
                  <div className="modal-actions full">
                    <button type="button" onClick={closeContactForm}>Cancel</button>
                    <button type="submit" className="primary">Send Message</button>
                  </div>
                </form>
              ) : (
                <div className="contact-sent">
                  ✅ Message sent successfully. Thank you!
                  <div className="modal-actions">
                    <button type="button" className="primary" onClick={closeContactForm}>Close</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileCard;
