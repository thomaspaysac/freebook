import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useLocalStorage from 'use-local-storage';
import { IntlProvider } from 'react-intl';
import en_translation from './translations/en.json';
import fr_translation from './translations/fr.json';


// Styles
import './App.css'

// Supabase config
import { createClient } from "@supabase/supabase-js";
//import { SUPABASE_URL } from './.private';
//import { SUPABASE_KEY } from './.private';
export const supabase = createClient(import.meta.env.REACT_APP_SUPABASE_URL, import.meta.env.REACT_APP_SUPABASE_KEY);

// Pages import
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { HomePage } from './Pages/Home';
import { PasswordForgottenPage } from './Pages/PasswordForgotten';
import { PasswordResetPage } from './Pages/PasswordReset';
import { ProfilePage } from './Pages/Profile';
import { FriendsRequestPage } from './Pages/FriendsRequests';
import { TimeLinePage } from './Pages/TimeLine';
import { AllUsersPage } from './Pages/AllUsersPage';
import { SettingsPage } from './Pages/Settings';
import { PrivacyPolicyPage } from './Pages/PrivacyPolicy';
import { PageNotFound } from './Pages/PageNotFound';

// Context
export const authContext = createContext({});

// React App Router
function App() {
  const [userData, setUserData] = useState();
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [locale, setLocale] = useLocalStorage('language', 'en');
  const languages = {en: en_translation, fr: fr_translation};
  const messages = languages[locale];

  const switchTheme = (theme) => {
    setTheme(theme);
  }

  const handleLanguageChange = (selectedLocale) => {
    setLocale(selectedLocale);
  };
  
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
      <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <Header theme={theme} switchLanguage={handleLanguageChange} />
        <Routes>
          <Route exact path="*" element={<HomePage theme={theme} />} />
          <Route exact path="/login/recover" element={<PasswordForgottenPage theme={theme} />} />
          <Route exact path="/login/reset" element={<PasswordResetPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage theme={theme} locale={locale} />} />
        </Routes>
        <Footer theme={theme} switchTheme={switchTheme} switchLanguage={handleLanguageChange} />
      </BrowserRouter>
      </IntlProvider>
    )
  }

  return (
    <authContext.Provider value={userData}>
      <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <Header theme={theme} />
        <Routes>
          <Route exact path="*" element={<PageNotFound theme={theme} />} />
          <Route exact path="/" element={<TimeLinePage theme={theme} />} />
          <Route exact path="/login/recover" element={<PasswordForgottenPage theme={theme} />} />
          <Route exact path="/login/reset" element={<PasswordResetPage />} />
          <Route exact path="/user/settings" element={<SettingsPage theme={theme} switchTheme={switchTheme} switchLanguage={handleLanguageChange} />} />
          <Route exact path="/feed" element={<TimeLinePage theme={theme} />} />
          <Route path="/user/:id" element={<ProfilePage theme={theme} />} />
          <Route exact path="/users" element={<AllUsersPage theme={theme} />} />
          <Route path="/friends/requests" element={<FriendsRequestPage theme={theme} />} />
          <Route path="/privacy" element={<PrivacyPolicyPage theme={theme} locale={locale} />} />
        </Routes>
        <Footer theme={theme} switchTheme={switchTheme} switchLanguage={handleLanguageChange} />
      </BrowserRouter>
      </IntlProvider>
    </authContext.Provider>
  )
}

export default App
