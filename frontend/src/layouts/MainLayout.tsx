import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../app/store';

import Sidebar from '../components/Sidebar';

import Nav from '../components/Nav';

import LoginModal from '../components/LoginModal';

import SignupModal from '../components/SignupModal';

import { getUserRequest } from '../redux/auth/authSlice';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({
  children,
}: Props) => {
  const dispatch =
    useDispatch<AppDispatch>();

  const [showLogin, setShowLogin] =
    useState(false);

  const [showSignup, setShowSignup] =
    useState(false);

  useEffect(() => {
    dispatch(getUserRequest());
  }, []);

  return (
    <div
      className="d-flex"
      style={{
        background: '#f5f6f8',
        minHeight: '100vh',
      }}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: '75px',
        }}
      >
        {/* NAVBAR */}
        <Nav
          openLogin={() =>
            setShowLogin(true)
          }
          openSignup={() =>
            setShowSignup(true)
          }
        />

        {/* PAGE */}
        <div className="p-4">
          {children}
        </div>
      </div>

      {/* LOGIN */}
      <LoginModal
        show={showLogin}
        close={() =>
          setShowLogin(false)
        }
      />

      {/* SIGNUP */}
      <SignupModal
        show={showSignup}
        close={() =>
          setShowSignup(false)
        }
      />
    </div>
  );
};

export default MainLayout;