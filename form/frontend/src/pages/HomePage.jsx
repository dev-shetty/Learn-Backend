import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Home from "../components/Home/Home"
import Header from "../components/UI Components/Header/Header"

function HomePage() {
  const navigate = useNavigate()
  const user = localStorage.getItem("user")
  const { data } = useSelector((state) => state.user)
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [])
  return (
    <div id="home-page">
      {user ? <Header heading={`Hello ${data.name}`} /> : ""}
      <Home />
    </div>
  )
}

export default HomePage
