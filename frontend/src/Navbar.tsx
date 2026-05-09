import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav 
      className="navbar navbar-expand-lg py-3 px-4" 
      style={{ 
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E9ECEF',
        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
      }}
    >
      <div className="container-fluid p-0">
        {/* Brand Section */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            style={{ padding: '0.5rem', fontSize: '1.25rem' }}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* Logo and Dashboard Text */}
          <div className="d-flex align-items-center gap-2">
            <div 
              style={{ 
                width: '34px', 
                height: '34px', 
                backgroundColor: '#4361EE',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="white"/>
              </svg>
            </div>
            <span 
              style={{ 
                fontSize: '18px', 
                fontWeight: 600, 
                color: '#2D3748',
                letterSpacing: '0.3px'
              }}
            >
              Dashboard
            </span>
          </div>
        </div>

        {/* Collapsible Menu */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          {/* Navigation Links */}
          <ul className="navbar-nav ms-4 me-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item">
              <a 
                className="nav-link fw-medium px-2" 
                href="#" 
                style={{ 
                  fontSize: '14px',
                  color: '#4361EE',
                  fontWeight: 500,
                  borderBottom: '2px solid #4361EE',
                  paddingBottom: '24px',
                  marginBottom: '-24px'
                }}
              >
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link fw-medium px-2" 
                href="#" 
                style={{ 
                  fontSize: '14px',
                  color: '#6C757D',
                  fontWeight: 500,
                  paddingBottom: '24px'
                }}
              >
                Analytics
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link fw-medium px-2" 
                href="#" 
                style={{ 
                  fontSize: '14px',
                  color: '#6C757D',
                  fontWeight: 500,
                  paddingBottom: '24px'
                }}
              >
                Reports
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link fw-medium px-2" 
                href="#" 
                style={{ 
                  fontSize: '14px',
                  color: '#6C757D',
                  fontWeight: 500,
                  paddingBottom: '24px'
                }}
              >
                Settings
              </a>
            </li>
          </ul>

          {/* Right Section - Date Range & Export Button */}
          <div className="d-flex align-items-center gap-3">
            {/* Date Range Picker */}
            <div 
              className="d-flex align-items-center gap-2 px-3 py-2" 
              style={{ 
                backgroundColor: '#F8F9FA',
                borderRadius: '8px',
                border: '1px solid #E9ECEF'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8Z" fill="#6C757D"/>
              </svg>
              <span style={{ fontSize: '13px', color: '#495057', fontWeight: 500 }}>
                1 Sep 2024 - 30 Sep 2024
              </span>
            </div>

            {/* Export Button */}
            <button 
              className="d-flex align-items-center gap-2 px-3 py-2 border-0"
              style={{ 
                backgroundColor: '#F8F9FA',
                borderRadius: '8px',
                border: '1px solid #E9ECEF',
                fontSize: '13px',
                fontWeight: 500,
                color: '#495057',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E9ECEF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8F9FA';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill="#495057"/>
              </svg>
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;