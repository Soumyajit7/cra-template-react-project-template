import { Routes, Route, Navigate } from 'react-router-dom';
import "./styles/App.css"
import HomePage from './pages/HomePage';
import NoPage from './pages/NoPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { auth } from './resources/firebase-config';
import { useEffect, useState } from 'react';
import Loading from './reusable_component/Loading';
import ForgotPasswordPage from './pages/ForgetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux_store/actions';


function App() {
  const [user, setUser] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoadingState(true);
      if (user) {
        dispatch(setUserData(user));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);



  return (
    <div className="App">
      {
        loadingState ?
          <Routes>
            <Route path="/" element={user?.emailVerified ? <Navigate to="/home" /> : <Navigate to="/login" />} />
            <Route path="/home" element={user ? user?.emailVerified ? <HomePage /> : <VerifyEmailPage /> : <Navigate to="/login" />} />
            <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginPage />} />
            <Route path="/register" element={user ? <Navigate to="/home" /> : <SignupPage />} />
            <Route path="/forgot" element={user?.emailVerified ? <Navigate to="/home" /> : <ForgotPasswordPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          : <Loading />
      }
    </div>
  );
}

export default App;