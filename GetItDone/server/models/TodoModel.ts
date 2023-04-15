import mongoose from "mongoose"

const TodoModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Add a title to your Todo"],
    },
    description: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    labels: {
      type: Array,  
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "todos",
  }
)

export default mongoose.model("Todo", TodoModel)
