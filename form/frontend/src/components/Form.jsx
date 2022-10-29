import { useState } from "react"

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    mobile: "",
    email: "",
    password: "",
  })
  const { firstName, middleName, lastName, gender, mobile, email, password } =
    formData

  const onChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
  }
  return (
    <div>
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="form-element">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={onChange}
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
              required
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
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              name="gender"
              id="gender"
              value={gender}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="mobile">Mobile Number</label>
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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
