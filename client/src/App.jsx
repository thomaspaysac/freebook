import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useLocalStorage from 'use-local-storage';

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
import { PasswordForgottenPage } from './Pages/PasswordForgotten';
import { PasswordResetPage } from './Pages/PasswordReset';
import { ProfilePage } from './Pages/Profile';
import { FriendsRequestPage } from './Pages/FriendsRequests';
import { TimeLinePage } from './Pages/TimeLine';
import { AllUsersPage } from './Pages/AllUsersPage';
import { SettingsPage } from './Pages/Settings';
import { PrivacyPolicyPage } from './Pages/PrivacyPolicy';

// Context
export const authContext = createContext({});

// React App Router
function App() {
  const [userData, setUserData] = useState();
  const themes = ['light', 'dark', 'red'];
  const [theme, setTheme] = useLocalStorage('theme', themes[0]);

  const switchTheme = () => {
    const currTheme = themes.indexOf(theme);
    let newTheme;
    if (themes[currTheme + 1]) {
      newTheme = themes[currTheme + 1];
    } else {
      newTheme = themes[0];
    }
    setTheme(newTheme);
  }
  
  const fetchUserSession = async () => {
    const req = await fetch('http://localhost:3000/user/session');
    if (req.status === 200) {
      const res = await req.json();
      setUserData(res);
    } else {
      setUserData(undefined);
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchUserSession();
    }
  }, [])

  if (!userData) {
    return (
      <BrowserRouter>
        <Header switchTheme={switchTheme} theme={theme} />
        <Routes>
          <Route exact path="*" element={<HomePage theme={theme} />} />
          <Route exact path="/login/recover" element={<PasswordForgottenPage />} />
          <Route exact path="/login/reset" element={<PasswordResetPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <authContext.Provider value={userData}>
      <BrowserRouter>
        <Header switchTheme={switchTheme} theme={theme} />
        <Routes>
          <Route exact path="/" element={<TimeLinePage />} />
          <Route exact path="/login/recover" element={<PasswordForgottenPage />} />
          <Route exact path="/login/reset" element={<PasswordResetPage />} />
          <Route exact path="/user/settings" element={<SettingsPage />} />
          <Route exact path="/feed" element={<TimeLinePage />} />
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route exact path="/users" element={<AllUsersPage />} />
          <Route path="/friends/requests" element={<FriendsRequestPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  )
}

export default App
