import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Styles
import './App.css'

// Supabase config
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from './.private';
import { SUPABASE_KEY } from './.private';
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Pages import
import { Header } from './Components/Header/Header';
import { HomePage } from './Pages/Home';
import { LoginPage } from './Pages/Login';
import { SignupPage } from './Pages/Signup';
import { PasswordForgottenPage } from './Pages/PasswordForgotten';
import { PasswordResetPage } from './Pages/PasswordReset';
import { ProfilePage } from './Pages/Profile';
import { ProtectedPage } from './Pages/Protected';
import { FriendsRequestPage } from './Pages/FriendsRequests';
import { PostCreatePage } from './Pages/PostCreate';
import { TimeLinePage } from './Pages/TimeLine';
import { AllUsersPage } from './Pages/AllUsersPage';

// Context
export const authContext = createContext({});

// React App Router
function App() {
  const [userData, setUserData] = useState();
  
  const fetchUserData = async () => {
    const req = await fetch('http://localhost:3000/user/session');
    if (req.status === 200) {
      const res = await req.json();
      setUserData(res);
    } else {
      setUserData(undefined);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <authContext.Provider value={userData}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/login/recover" element={<PasswordForgottenPage />} />
          <Route exact path="/login/reset" element={<PasswordResetPage />} />
          <Route exact path="/protected" element={<ProtectedPage />} />
          <Route exact path="/feed" element={<TimeLinePage />} />
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route exact path="/users" element={<AllUsersPage />} />
          <Route path="/friends/requests" element={<FriendsRequestPage />} />
          <Route path ="/post/new" element={<PostCreatePage />} />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  )
}

export default App
