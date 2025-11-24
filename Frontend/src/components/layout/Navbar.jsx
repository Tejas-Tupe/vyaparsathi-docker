import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import './navbar.css'; 
import Logo from '../../../public/Favicon.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();  // access auth context
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDashboardClick = () => {
    navigate('/dashboard');
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setIsOpen(false);
  };

  const handleRegisterClick = () => {
    navigate('/register');
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-nav container">
        {/* Left: Logo */}
        <div className="navbar-brand">
          <a href="/" className="brand-link">
            <img 
              src={Logo} 
              alt="Vyaparsathi Logo" 
              className="brand-logo-img"
            />
            <span className="brand-name">Vyaparsathi</span>
          </a>
        </div>
        
        {/* Mobile Toggle */}
        <button 
          className={`hamburger ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu} 
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Menu */}
        <div className={`navbar-menu-container ${isOpen ? 'open' : ''}`} id="navbar-menu">
          <div className="navbar-links">
            <a href="/" className="nav-link current">Home</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/services" className="nav-link">Services</a>
            <a href="/pricing" className="nav-link">Pricing</a>
          </div>

          {/*Conditionally Render Auth Buttons */}
          <div className="navbar-actions">
            {user ? (
              <>
                <Button 
                  variant="primary" 
                  onClick={handleDashboardClick}
                  className="navbar-dashboard-btn"
                >
                  Dashboard
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleLogout}
                  className="navbar-logout-btn"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="secondary" 
                  onClick={handleLoginClick}
                  className="navbar-login-btn"
                >
                  Log In
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleRegisterClick}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
