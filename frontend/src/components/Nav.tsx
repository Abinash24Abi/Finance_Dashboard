import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import type { RootState } from '../app/store';
import { logoutRequest } from '../redux/auth/authSlice';

interface Props {
  openLogin: () => void;
  openSignup: () => void;
}

const Nav: React.FC<Props> = ({
  openLogin,
  openSignup,
}) => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  const [isOpen, setIsOpen] = useState(false);

  // Dynamic Date & Time
  const [currentTime, setCurrentTime] =
    useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate =
    currentTime.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const formattedTime =
    currentTime.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  return (
    <nav
      className="navbar navbar-expand-lg py-3 px-4"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E9ECEF',
        boxShadow:
          '0 1px 2px rgba(0,0,0,0.02)',
      }}
    >
      <div className="container-fluid p-0">
        {/* Left Section */}
        <div className="d-flex align-items-center gap-3">
          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Logo */}
          <div className="d-flex align-items-center gap-2">
            <div
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#4361EE',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
                  fill="white"
                />
              </svg>
            </div>

            <div className="d-flex flex-column">
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#2D3748',
                  lineHeight: 1,
                }}
              >
                Dashboard
              </span>

              <small
                style={{
                  color: '#6C757D',
                  fontSize: '12px',
                }}
              >
                Admin Panel
              </small>
            </div>
          </div>
        </div>

        {/* Collapse */}
        <div
          className={`collapse navbar-collapse ${
            isOpen ? 'show' : ''
          }`}
        >
          {/* Nav Links */}
          <ul className="navbar-nav ms-4 me-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link fw-medium px-2"
              >
                Overview
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#"
                className="nav-link fw-medium px-2"
                style={{
                  fontSize: '14px',
                  color: '#6C757D',
                }}
              >
                Analytics
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#"
                className="nav-link fw-medium px-2"
                style={{
                  fontSize: '14px',
                  color: '#6C757D',
                }}
              >
                Reports
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#"
                className="nav-link fw-medium px-2"
                style={{
                  fontSize: '14px',
                  color: '#6C757D',
                }}
              >
                Settings
              </a>
            </li>
          </ul>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3 flex-wrap">
            {/* Dynamic Date & Time */}
            <div
              className="d-flex align-items-center gap-2 px-3 py-2"
              style={{
                backgroundColor: '#F8F9FA',
                borderRadius: '10px',
                border: '1px solid #E9ECEF',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3 4.89 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.89 20.1 4 19 4ZM19 20H5V9H19V20ZM19 7H5V6H19V7Z"
                  fill="#6C757D"
                />
              </svg>

              <div className="d-flex flex-column">
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#343A40',
                    lineHeight: 1.2,
                  }}
                >
                  {formattedDate}
                </span>

                <small
                  style={{
                    fontSize: '11px',
                    color: '#6C757D',
                  }}
                >
                  {formattedTime}
                </small>
              </div>
            </div>

            {user ? (
              <>
                {/* User Info */}
                <div
                  className="d-flex align-items-center gap-2 px-3 py-2"
                  style={{
                    backgroundColor: '#F8F9FA',
                    borderRadius: '10px',
                    border: '1px solid #E9ECEF',
                  }}
                >
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: '#4361EE',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '14px',
                    }}
                  >
                    {user.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#495057',
                      textTransform: 'capitalize',
                    }}
                  >
                    {user.name}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={() =>
                    dispatch(logoutRequest())
                  }
                  className="border-0 px-4 py-2"
                  style={{
                    backgroundColor: '#DC3545',
                    color: '#fff',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <button
                  onClick={openLogin}
                  className="border-0 px-4 py-2"
                  style={{
                    backgroundColor: '#212529',
                    color: '#fff',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  Login
                </button>

                {/* Signup */}
                <button
                  onClick={openSignup}
                  className="border-0 px-4 py-2"
                  style={{
                    backgroundColor: '#198754',
                    color: '#fff',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;