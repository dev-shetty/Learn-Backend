import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "../components/Form/LoginForm"
import Header from "../components/UI Components/Header/Header"

function LoginPage() {
  const navigate = useNavigate()
  const user = localStorage.getItem("user")
  useEffect(() => {
    if (user) {
      navigate("/home")
    }
  }, [])
  return (
    <div id="login-page">
      <Header heading="Login" />
      <LoginForm />
    </div>
  )
}

export default LoginPage
