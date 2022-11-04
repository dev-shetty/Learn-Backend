import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { register, reset } from "../../features/User/userSlice"
import PrimaryBtn from "../UI Components/Buttons/PrimaryBtn"
import "./Form.css"

function RegisterForm() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { data, message, isSuccess, isError, isLoading } = user

  const initialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    mobile: "",
    email: "",
    password: "",
    passwordConf: "",
  }

  const [formData, setFormData] = useState(initialState)
  const {
    firstName,
    middleName,
    lastName,
    gender,
    mobile,
    email,
    password,
    passwordConf,
  } = formData

  const onChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    // TODO: Update Error in the UI from backend
    dispatch(
      register({
        firstName,
        middleName,
        lastName,
        gender,
        mobile,
        email,
        password,
        passwordConf,
      })
    )
    setFormData(initialState)
  }

  useEffect(() => {
    if (isError) {
      console.error(message)
    }

    dispatch(reset())
  }, [data, isError, isSuccess, message, dispatch])

  if (isLoading) {
    return "Loading..."
  }

  return (
    <div>
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="form-element">
            <label htmlFor="firstName">First Name*</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="middleName">Middle Name</label>
            <input
              type="text"
              name="middleName"
              id="middleName"
              value={middleName}
              onChange={onChange}
            />
          </div>
          <div className="form-element">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={onChange}
            />
          </div>
          <div className="form-element">
            <label htmlFor="gender">Gender*</label>
            <div className="radio-list">
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  onChange={onChange}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={onChange}
                />
                <label htmlFor="female">Female</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="others"
                  value="others"
                  onChange={onChange}
                />
                <label htmlFor="others">Others</label>
              </div>
            </div>
          </div>
          <div className="form-element">
            <label htmlFor="mobile">Mobile Number*</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              value={mobile}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="passwordConf">Password Confirmation*</label>
            <input
              type="password"
              name="passwordConf"
              id="passwordConf"
              value={passwordConf}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-submit">
            <PrimaryBtn type="submit" onCLick={onSubmit} text="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
