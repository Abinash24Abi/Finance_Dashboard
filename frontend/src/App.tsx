// import { useEffect, useState } from 'react';

// import { useDispatch } from 'react-redux';

// import Sidebar from './components/Sidebar';

// import Nav from './components/Nav';

// import Dashboard from './pages/Dashboard';

// import LoginModal from './components/LoginModal';

// import SignupModal from './components/SignupModal';

// import { getUserRequest } from './redux/auth/authSlice';

// function App() {
//   const dispatch = useDispatch();

//   const [showLogin, setShowLogin] =
//     useState(false);

//   const [showSignup, setShowSignup] =
//     useState(false);

//   useEffect(() => {
//     dispatch(getUserRequest());
//   }, []);

//   return (
//     <div className="d-flex">
//       <Sidebar />

//       <div
//         className="flex-grow-1"
//         style={{
//           marginLeft: '75px',
//         }}
//       >
//         <Nav
//           openLogin={() =>
//             setShowLogin(true)
//           }
//           openSignup={() =>
//             setShowSignup(true)
//           }
//         />

//         <Dashboard />
//       </div>

//       <LoginModal
//         show={showLogin}
//         close={() =>
//           setShowLogin(false)
//         }
//       />

//       <SignupModal
//         show={showSignup}
//         close={() =>
//           setShowSignup(false)
//         }
//       />
//     </div>
//   );
// }

// export default App;


import Dashboard from './pages/Dashboard';

function App() {
  return <Dashboard />;
}

export default App;