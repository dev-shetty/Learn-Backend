import { Link } from "react-router-dom"
import PrimaryBtn from "../UI Components/Buttons/PrimaryBtn"

function LoginForm() {
  const onSubmit = () => {}
  const onChange = () => {}

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
              // value={email}
              // onChange={onChange}
            />
          </div>
          <div className="form-element">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              // value={password}
              // onChange={onChange}
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
