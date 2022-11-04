import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login, reset } from "../../features/User/userSlice"
import PrimaryBtn from "../UI Components/Buttons/PrimaryBtn"

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)
  const { data, isLoading, isError, isSuccess, message } = user

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = loginData

  const onChange = (event) => {
    const { name, value } = event.target
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (isSuccess) {
      navigate("/home", {
        state: {
          data,
        },
      })
    }
    dispatch(reset())
  }, [isError, message, isSuccess, dispatch, navigate])

  return (
    <div className="login-container">
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="form-element">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-element">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-submit">
            <PrimaryBtn type="submit" text="Login" onCLick={onSubmit} />
          </div>
          <div className="form-element register-link">
            <div>
              New Here ?{" "}
              <Link to="/register" className="link">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
