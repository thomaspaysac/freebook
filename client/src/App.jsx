import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages import
import { LoginPage } from './Pages/Login';
import { ProtectedPage } from './Pages/Protected';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/protected" element={<ProtectedPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
