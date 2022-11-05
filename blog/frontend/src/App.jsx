import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          {/* TDOD: Add a landing page in / */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
