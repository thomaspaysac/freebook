import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Styles
import './App.css'

// Pages import
import { HomePage } from './Pages/Home';
import { LoginPage } from './Pages/Login';
import { SignupPage } from './Pages/Signup';
import { ProfilePage } from './Pages/Profile';
import { ProtectedPage } from './Pages/Protected';

// Supabase config
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from './.private';
import { SUPABASE_KEY } from './.private';
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/protected" element={<ProtectedPage />} />
          <Route path="/user/:id" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  )
}

export default App
