# Vyaparsathi Frontend  
A modern, fast, and responsive **React + Vite** interface built to empower micro-business owners with a clean and simple digital experience.

---

## Vision

The goal of the frontend is to create an interface that is:

- **Simple enough** for rural & small-scale entrepreneurs  
- **Fast and reliable** even on low-bandwidth connections  
- **Clean UI/UX** with predictable navigation  
- **Accessible** across devices (mobile-first design)

This is the layer where users *feel* Vyaparsathi so usability, clarity, and speed were the top priorities.

---

## Tech Stack (Frontend)

- **React 19 + Vite**
- **React Router DOM** (Navigation & Protected Routes)
- **Context API** (Auth State + Global User Profile)
- **Axios** (API communication)
- **React Toastify** (UI notifications)
- **Framer Motion** (smooth animations)
- **Lucide React Icons**
- **VanilaCSS** (CSS Styling)


##  Project Structure

```bash
Frontend/
│
├── public/ # Static assets served directly
│
├── src/
│ ├── api/ # Axios instance + route definitions
│ ├── assets/ # Images, icons, logos, static files
│ ├── components/ # Reusable UI components (buttons, forms, cards)
│ ├── context/ # AuthContext, UserContext, provider setup
│ ├── hooks/ # Custom React hooks
│ ├── layouts/ # Layout components (DashboardLayout, AuthLayout)
│ ├── pages/ # Screens (Login, Signup, Dashboard, Orders, etc.)
│ ├── routes/ # Protected routes + Router setup
│ ├── styles/ # Global styles, Tailwind config overrides
│ │
│ ├── App.jsx # Root component
│ ├── index.css # Global CSS (Tailwind entry)
│ └── main.jsx # Vite + React entry point
│
├── .dockerignore
├── Dockerfile # Nginx + Vite production container setup
│
├── eslint.config.js # Project linting rules
├── index.html # Main HTML template
├── nginx.conf # Nginx configuration for production build
│
├── package.json
├── package-lock.json
│
├── vite.config.js # Vite configuration file
└── README.md # Project documentation

