import React, { useState, useEffect, } from 'react'
import authService from './appwrite/auth';
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import CircularText from './components/animatedComponents/CircularText';
import { Toaster } from 'react-hot-toast';

function App() {
  // making loading state
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          // if user is logged in
          dispatch(login(userData))
        }
        else {
          // if user is not logged in
          dispatch(logout())
        }
      })
      .catch((error) => {

      })
      .finally(() => setLoading(false));
  }, []);

  // Global Email Verification Check
  useEffect(() => {
    if (
      userData &&
      !userData.emailVerification &&
      location.pathname !== '/verify-email' &&
      location.pathname !== '/logout' // Allow logout
    ) {
      navigate('/verify-email');
    }
  }, [userData, location.pathname, navigate]);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-blue-50 w-full overflow-x-hidden m-0 p-0">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>


  ) : (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-300 ">
      <CircularText
        text="N E W E R . S O C I A L  . "
        spinDuration={15}
        onHover="speedUp"
      />
    </div>
  );
}

export default App
