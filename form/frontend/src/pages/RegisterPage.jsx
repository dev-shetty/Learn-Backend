import Form from "../components/Form/Form"
import Header from "../components/UI Components/Header/Header"

function RegisterPage() {
  const user = "User"
  return (
    <div>
      <Header heading={`Hello ${user}`} subHeading="Something" />
      <Form />
    </div>
  )
}

export default RegisterPage
