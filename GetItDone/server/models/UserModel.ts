import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter the name"],
    },
    email: {
      type: String,
      required: [true, "Enter the email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Enter the password"],
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
)

export default mongoose.model("User", userSchema)
