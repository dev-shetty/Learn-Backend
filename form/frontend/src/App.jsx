import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import "./App.css"

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<h1>Home</h1>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
