import mongoose from "mongoose"

export async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!)
    console.log(`MongoDB connected at ${connection.connection.host}`)
  } catch (error) {
    console.error(error)
    console.log("Couldn't connect to Database")
    process.exit(1)
  }
}
