import axios from "axios"

const API_URL = "/api/users/"

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  return response.data
}

const userService = {
  register,
}

export default userService
