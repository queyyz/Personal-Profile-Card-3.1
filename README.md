🤴 Interactive Personal Profile Card – React Lab

This project is a React.js hands-on lab designed to practice building interactive web components.
It emphasizes components, props, state, events, and conditional rendering while creating an engaging and polished UI/UX.

👀 Project Structure
personal-profile-lab/
│
├── src/
│   ├── App.jsx
│   ├── ProfileCard.jsx 
│   └── ProfileCard.css 
└── package.json

💥 Completed Lab Challenges
✅ Challenge 1: Display Basic Profile Info & Social Links

Show key profile details (Name, Major, Year, GPA, etc.)

Accept profile data via props from App.jsx

Include clickable social media links/icons (Twitter, GitHub, Instagram, Facebook)

✅ Challenge 2: Theme Switcher & Achievements

Add Light/Dark mode toggle
→ Uses useState and saves preference to localStorage

Display Achievement Badges dynamically:
→ GPA ≥ 3.5 shows “Honor Roll”, skills ≥ 5 shows “Multi-skilled”

Smooth gradient backgrounds and subtle animations for visual appeal

✅ Challenge 3: Interactive Enhancements

Click counter increments when the card is clicked

Hobbies can be marked as “⭐ Favorites” on click

Contact button triggers a Modal Contact Form

Form submission shows a confirmation message (mock submission for demo)

🌟 Extra Features

Modal form includes a blurred backdrop and fade-in effect

Hover effects with smooth transitions for buttons and badges

Fully responsive layout for desktop and mobile devices

Dark mode controlled via :root.dark for easy theming

⚡ Getting Started
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in your browser
http://localhost:5173

💡 Notes / Tips

The card highlights top skills and hobbies interactively

Achievements are dynamic based on profile data

Theme and view count persist across sessions
