import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import RegisterForm from "../components/Form/RegisterForm"
import Header from "../components/UI Components/Header/Header"

function RegisterPage() {
  const { data } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const user = localStorage.getItem("user")
  useEffect(() => {
    if (user) {
      navigate("/", {
        state: {
          user,
        },
      })
    }
  }, [data])
  return (
    <div>
      <Header heading="Register Here" />
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
